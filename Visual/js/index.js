import {slide0} from './slides/slide0.js';
import {slide1} from './slides/slide1.js';
import {slide2} from './slides/slide2.js';
import {slide3} from './slides/slide3.js';
import {slide4} from './slides/slide4.js';
import {slide5} from './slides/slide5.js';
import {slide6} from './slides/slide6.js';
import {animationMoveOnStep} from './animation/moveOnStep.js';
import {animationChangeText} from './animation/changeText.js';
import {animationWait} from './animation/wait.js';

const cardTitle = document.querySelector('.card__title');
const cardDescription = document.querySelector('.card__description');

const cardCubesWrapper = document.querySelector('.card__cubes-wrapper');
const cardCubesArray = cardCubesWrapper.querySelector('.card__cubes-array');

const cardCode = document.querySelector('.card__code');
const cardCodePicture = cardCode.querySelector('.card__code-picture');
const cardBtnCopy = cardCode.querySelector('.card__btn-copy');
const cardCodeText = cardCode.querySelector('.card__code-text');
const clipboardModal = cardCode.querySelector('.clipboard__modal');

const boxes = document.querySelectorAll('.box');

const cardNext = document.querySelector('.btn__next');
const cardPrev = document.querySelector('.btn__prev');
const cardRetry = document.querySelector('.btn__retry');

const eventAnimationStart = new Event('animationStart');
const eventAnimationStop = new Event('animationStop');

const state = {
  step: 0,
  maxStep: 0,
  widthCubes: 40,
  animation: false,
};

/**
 * Рендер коробок на вход и на выход
 * @param box
 */
const renderBox = (box) => {
  const selector = `.box--${box.name}`;
  const boxHTMLElement = document.querySelector(selector);
  boxHTMLElement.classList.remove('hidden');
  const boxTitle = boxHTMLElement.querySelector('.box__title');
  boxTitle.textContent = box.value;
};

/**
 * Создаём для каждого элемента массива квадрат в интерфейсе
 * @param array - массив, который будет отображаться
 */
const renderCubes = (array) => {
  const cubes = cardCubesWrapper.querySelectorAll('.cube');
  cubes.forEach((cube) => cube.remove());
  cardCubesArray.textContent = '';
  for (let i = 0; i < array.length; i += 1) {
    const cube = document.createElement('div');
    // привяжем цвет к значению
    const colorIndex = array[i] % 10;
    cube.classList.add('cube', `cube--color${colorIndex}`);
    cube.textContent = array[i];
    cardCubesArray.insertAdjacentElement('beforeend', cube);
  }
};

/**
 * Подготовим массив анимаций для менеджера анимаций
 * @param animations - информация из api о слайде
 * @returns {Array} - массив последовательностей анимаций
 */
const createAnimations = (animations) => {
  const animationArray = [];
  animations.forEach((animation) => {
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
        cube.style.left = `${state.widthCubes * animation.index}px`;
        cardCubesWrapper.append(cube);
        object = cube;
        break;
      default:
        break;
    }
    const start = animation.index * state.widthCubes;
    const end = start + animation.step * state.widthCubes;

    switch (animation.name) {
      case 'moveOnStep':
        const move = () => animationMoveOnStep(object, start, end);
        animationArray.push(move);
        break;
      case 'changeText':
        const changeTitle = () => animationChangeText(object, animation.text);
        animationArray.push(changeTitle);
        break;
      case 'wait':
        const wait = () => animationWait(animation.duration);
        animationArray.push(wait);
        break;
      default:
        break;
    }
  });
  return animationArray;
};

/**
 * рендер анимации с помощью requestAnimationFrame
 * @param animations
 * @returns {Promise<any>}
 */
const managerAnimation = (animations) => new Promise((resolve) => {
  const runAnimations = () => {
    const current = animations[0];
    const finished = current();
    document.dispatchEvent(eventAnimationStart);

    if (finished) {
      animations.shift();
      if (animations.length === 0) {
        document.dispatchEvent(eventAnimationStop);
        resolve();
        return;
      }
    }
    requestAnimationFrame(() => {
      runAnimations(animations);
    });
  };
  runAnimations();
});

/**
 * Функция рендера слайдов
 * @param slide - данные из api о слайде
 */
const render = (slide) => {
  // Очищаем входные-выходные данные
  boxes.forEach((box) => box.classList.add('hidden'));

  // Оформляем заголовок
  cardTitle.textContent = slide.title;

  // Описание шага
  cardDescription.textContent = '';
  for (let i = 0; i < slide.description.length; i += 1) {
    const partText = document.createElement('p');
    partText.textContent = slide.description[i];
    cardDescription.insertAdjacentElement('beforeend', partText);
  }

  // Отображение входных данных
  if (slide.boxes) {
    slide.boxes
      .filter((box) => box.name === 'in')
      .map((box) => renderBox(box));
  }

  // Рисуем массив в квадратиках
  renderCubes(slide.array);

  // Оформляем стрелочки - итераторы
  const arrowWrapperTop = document.querySelector('.card__arrow-wrapper--top');
  const arrowWrapperBottom = document.querySelector('.card__arrow-wrapper--bottom');

  if (slide.arrow[0] === 'disable') {
    arrowWrapperTop.classList.add('card__arrow--disable');
  } else {
    arrowWrapperTop.classList.remove('card__arrow--disable');
    const topText = arrowWrapperTop.querySelector('.card__arrow-text--top');
    topText.textContent = slide.arrow[0].title;
    arrowWrapperTop.style.left = `${state.widthCubes * slide.arrow[0].value}px`;
  }

  if (slide.arrow[1] === 'disable') {
    arrowWrapperBottom.classList.add('card__arrow--disable');
  } else {
    arrowWrapperBottom.classList.remove('card__arrow--disable');
    const bottomText = arrowWrapperBottom.querySelector('.card__arrow-text--bottom');
    bottomText.textContent = slide.arrow[1].title;
    arrowWrapperBottom.style.left = `${state.widthCubes * slide.arrow[1].value}px`;
  }

  // анимация
  if (slide.animation) {
    const animations = createAnimations(slide.animation);
    managerAnimation(animations)
      .then(() => {
        // отображаем выходные данные после окончания анимации
        if (slide.boxes) {
          slide.boxes
            .filter((box) => box.name === 'out')
            .map((box) => renderBox(box));
        }
      });
    // если нет анимации, то проверяем нужно ли отображать выходные данные
  } else if (slide.boxes) {
    slide.boxes
      .filter((box) => box.name === 'out')
      .map((box) => renderBox(box));
  }

  // Оформяем картинки с кодом
  const img = cardCodePicture.querySelector('.card__code-img');
  if (slide.img.length > 0) {
    cardCode.classList.remove('hidden');
    img.src = `./img/${slide.img[0]}.png`;
    img.setAttribute('srcset', `./img/${slide.img[1]}.png 2x, ./img/${slide.img[2]}.png 4x`);
  } else {
    cardCode.classList.add('hidden');
  }
  // Оформляем строку в буфере
  cardCodeText.textContent = slide.code;
};

/**
 * Обработчик клика на кнопку "Копировать"
 */
const handlerClipboard = () => {
  navigator.clipboard.writeText(cardCodeText.textContent)
    .then(() => {
      clipboardModal.classList.add('clipboard__modal--active');
      setTimeout(() => {
        clipboardModal.classList.remove('clipboard__modal--active');
      }, 3000);
    })
    .catch((err) => {
      console.error('Произошла ошибка при копировании в буфер обмена', err);
    });
};

/**
 * Обработчик на кнопку "Следующий слайд"
 * @param slides - массив слайдов
 * @param event
 */
const handlerStepNext = (slides, event) => {
  event.preventDefault();
  state.step += 1;

  if (state.step >= slides.length - 1) {
    cardNext.classList.add('btn--disable');
  }
  if (cardRetry.classList.contains('btn--disable')) {
    cardRetry.classList.remove('btn--disable');
  }
  if (cardPrev.classList.contains('btn--disable')) {
    cardPrev.classList.remove('btn--disable');
  }
  render(slides[state.step]);
};

/**
 * Обработчик клика на кнопку "Повторить"
 * @param slides - массив слайдов
 * @param event
 */
const handlerRetry = (slides, event) => {
  event.preventDefault();
  state.step = 0;
  cardRetry.classList.add('btn--disable');
  cardPrev.classList.add('btn--disable');
  cardNext.classList.remove('btn--disable');
  render(slides[state.step]);
};

/**
 * Обработчик клика на кнопку "Назад"
 * @param slides - массив слайдов
 * @param event
 */
const handlerStepPrev = (slides, event) => {
  event.preventDefault();
  state.step -= 1;
  if (state.step <= 0) {
    cardPrev.classList.add('btn--disable');
    cardRetry.classList.add('btn--disable');
  }
  if (cardNext.classList.contains('btn--disable')) {
    cardNext.classList.remove('btn--disable');
  }
  render(slides[state.step]);
};

const handlerBlockNavigationCards = () => {
  // появилась анимация
  cardNext.classList.add('btn--disable');
  cardRetry.classList.add('btn--disable');
  cardPrev.classList.add('btn--disable');
};

const handleEnableNavigationCards = () => {
  // закончилась анимация
  if (state.step !== state.maxStep) {
    cardNext.classList.remove('btn--disable');
  }
  cardRetry.classList.remove('btn--disable');
  if (state.step > 0) {
    cardPrev.classList.remove('btn--disable');
  }
};

const init = () => {
  const slides = [slide0, slide1, slide2, slide3, slide4, slide5, slide6];
  state.maxStep = slides.length - 1;
  // если ширина меньше 375px,тогда ширина квадрата 20
  if (window.matchMedia('(max-width: 375px)').matches) {
    state.widthCubes = 30;
  }
  render(slides[state.step]);

  cardBtnCopy.addEventListener('click', handlerClipboard);
  cardNext.addEventListener('click', handlerStepNext.bind(null, slides));
  cardPrev.addEventListener('click', handlerStepPrev.bind(null, slides));
  cardRetry.addEventListener('click', handlerRetry.bind(null, slides));

  document.addEventListener('animationStart', handlerBlockNavigationCards);
  document.addEventListener('animationStop', handleEnableNavigationCards);
};

init();
