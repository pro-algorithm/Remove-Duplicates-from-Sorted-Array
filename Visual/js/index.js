'use strict';

import {slide1} from './slides/slide1.js';
import {slide2} from './slides/slide2.js';
import {slide3} from './slides/slide3.js';
import {slide4} from './slides/slide4.js';
import {slide5} from './slides/slide5.js';
import {animationMoveOnStep} from './animation/moveOnStep.js';
import {animationChangeText} from './animation/changeText.js';

const cardTitle = document.querySelector('.card__title');
const cardDescription = document.querySelector('.card__description');

const cardCubesWrapper = document.querySelector('.card__cubes-wrapper');
const cardCubesArray = cardCubesWrapper.querySelector('.card__cubes-array');

const cardCodePicture = document.querySelector('.card__code-picture');
const cardBtnCopy = document.querySelector('.card__btn-copy');
const cardCodeText = document.querySelector('.card__code-text');
const clipboardModal = document.querySelector('.clipboard__modal');

const cardNext = document.querySelector('.btn__next');
const cardPrev = document.querySelector('.btn__prev');
const cardRetry = document.querySelector('.btn__retry');

let step = 0;

const widthCubes = 40;


/**
 * Создаём для каждого элемента массива квадрат в интерфейсе
 * @param array - массив, который будет отображаться
 */
const renderCubes = (array) => {
  const cubes = cardCubesWrapper.querySelectorAll('.cube');
  cubes.forEach(cube => cube.remove());
  cardCubesArray.textContent = '';
  for (let i = 0; i < array.length; i++) {
    const cube = document.createElement('div');
    //привяжем цвет к значению
    const colorIndex = array[i] % 10;
    cube.classList.add('cube', `cube--color${colorIndex}`);
    cube.textContent = array[i];
    cardCubesArray.insertAdjacentElement('beforeend', cube);
  }
};


/**
 * Обработчик клика на кнопку "Копировать"
 */
const handleClipboard = () => {
  navigator.clipboard.writeText(cardCodeText.textContent)
    .then(() => {
      clipboardModal.classList.add('clipboard__modal--active');
      setTimeout(() => {
        clipboardModal.classList.remove('clipboard__modal--active')
      }, 3000);
    })
    .catch(err => {
      console.error('Произошла ошибка при копировании в буфер обмена', err);
    })
};

/**
 * Обработчик на кнопку "Следующий слайд"
 * @param slides - массив слайдов
 * @param event
 */
const handleStepNext = (slides, event) => {
  event.preventDefault();
  step++;
  if (step === slides.length) {
    cardNext.classList.add('btn--disable');
  }
  if (cardRetry.classList.contains('btn--disable')) {
    cardRetry.classList.remove('btn--disable');
  }
  if (cardPrev.classList.contains('btn--disable')) {
    cardPrev.classList.remove('btn--disable');
  }
  render(slides[step]);
};

/**
 * Обработчик клика на кнопку "Повторить"
 * @param slides - массив слайдов
 * @param event
 */
const handleRetry = (slides, event) => {
  event.preventDefault();
  step = 1;
  cardRetry.classList.add('btn--disable');
  cardPrev.classList.add('btn--disable');
  cardNext.classList.remove('btn--disable');
  render(slides[step]);
};

/**
 * Обработчик клика на кнопку "Назад"
 * @param slides - массив слайдов
 * @param event
 */
const handleStepPrev = (slides, event) => {
  event.preventDefault();
  step--;
  if (step === 1) {
    cardPrev.classList.add('btn--disable');
    cardRetry.classList.add('btn--disable');
  }
  if (cardNext.classList.contains('btn--disable')) {
    cardNext.classList.remove('btn--disable');
  }
  render(slides[step]);
};

/**
 * Функция рендера слайдов
 * @param slide - данные из api о слайде
 */
const render = (slide) => {
  //Оформляем заголовок
  cardTitle.textContent = slide.title;

  //Описание шага
  cardDescription.textContent = '';
  for (let i = 0; i < slide.description.length; i++) {
    const partText = document.createElement('p');
    partText.textContent = slide.description[i];
    cardDescription.insertAdjacentElement('beforeend', partText);
  }

  //Рисуем массив в квадратиках
  renderCubes(slide.array);

  //Оформляем стрелочки - итераторы
  const arrowWrapperTop = document.querySelector('.card__arrow-wrapper--top');
  const arrowWrapperBottom = document.querySelector('.card__arrow-wrapper--bottom');

  if (slide.arrow[0] === 'disable') {
    arrowWrapperTop.classList.add('card__arrow--disable');
  } else {
    arrowWrapperTop.classList.remove('card__arrow--disable');
    const topText = arrowWrapperTop.querySelector('.card__arrow-text--top');
    topText.textContent = slide.arrow[0].title;
    arrowWrapperTop.style.left = `${widthCubes * slide.arrow[0].value}px`;
  }

  if (slide.arrow[1] === 'disable') {
    arrowWrapperBottom.classList.add('card__arrow--disable');
  } else {
    arrowWrapperBottom.classList.remove('card__arrow--disable');
    const bottomText = arrowWrapperBottom.querySelector('.card__arrow-text--bottom');
    bottomText.textContent = slide.arrow[1].title;
    arrowWrapperBottom.style.left = `${widthCubes * slide.arrow[1].value}px`;
  }

  //анимация
  if (slide.animation) {
    const animations = createAnimations(slide.animation);
    managerAnimation(animations);

  }

  //Оформяем картинки с кодом
  const img = cardCodePicture.querySelector('.card__code-img');
  img.src = `./img/${slide.img[0]}.png`;
  img.setAttribute('srcset', `./img/${slide.img[1]}.png 2x, ./img/${slide.img[2]}.png 4x`);

  //Оформляем строку в буфере
  cardCodeText.textContent = slide.code;

};

/**
 * Подготовим массив анимаций для менеджера анимаций
 * @param animations - информация из api о слайде
 * @returns {Array} - массив последовательностей анимаций
 */
const createAnimations = (animations) => {
  const animationArray = [];
  animations.forEach(animation => {
    let object;
    switch (animation.object) {
      case 'arrow-top':
        object = cardCubesWrapper.querySelector('.card__arrow-wrapper--top');
        break;
      case 'arrow-top-text':
        object = cardCubesWrapper.querySelector('.card__arrow-text--top');
        break;
      case 'arrow-bottom':
        object = cardCubesWrapper.querySelector('.card__arrow-wrapper--bottom');
        break;
      case 'arrow-bottom-text':
        object = cardCubesWrapper.querySelector('.card__arrow-text--bottom');
        break;
      case 'cube':
        const cubes = cardCubesArray.querySelectorAll('.cube');
        const cube = cubes[animation.index].cloneNode(true);
        cube.classList.add('cube-clone');
        cube.style.position = 'absolute';
        cube.style.left = `${widthCubes * animation.index}px`;
        cardCubesWrapper.append(cube);
        object = cube;
    }
    const start = animation.index*widthCubes;
    const end = start + animation.step * widthCubes;

    switch (animation.name) {
      case 'moveOnStep':
        const move = () => {
          return animationMoveOnStep(object, start, end);
        };
        animationArray.push(move);
        break;
      case 'changeText':
        const changeTitle = () => {
          return animationChangeText(object, animation.text);
        };
        animationArray.push(changeTitle);
        break;
    }
  });
  return animationArray;
};


const managerAnimation = (animations) => {
  const current = animations[0];
  const finished = current();

  if (finished) {
    animations.shift();
    if (animations.length === 0) {
      return;
    }
  }
  requestAnimationFrame(() => {
    managerAnimation(animations);
  });
};


const init = () => {
  const slides = [slide1, slide2, slide3, slide4, slide5];
  render(slides[step]);

  cardBtnCopy.addEventListener('click', handleClipboard);
  cardNext.addEventListener('click', handleStepNext.bind(null, slides));
  cardPrev.addEventListener('click', handleStepPrev.bind(null, slides));
  cardRetry.addEventListener('click', handleRetry.bind(null, slides));

};

init();
