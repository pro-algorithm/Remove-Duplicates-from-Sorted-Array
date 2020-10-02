'use strict';

export const animationGeneration = (nums) => {
  //Если нет вариантов для движения стрелочек или квадратов, то нет анимации null
  if (nums.length < 2) return null;
  //Создаём массив анимаций
  const arrayAnimation = [];
  let j = 0;
  for (let i = 1; i < nums.length; i++) {
    //каждый шаг ждём
    arrayAnimation.push({name: 'wait'});
    if (nums[j] !== nums[i]) {
      //перемещаем стрелочку снизу на 1
      arrayAnimation.push({name: 'moveOnStep', object: 'arrow-bottom', step: 1, index: j});
      arrayAnimation.push({name: 'changeText', object: 'arrow-bottom-text', text: `j = ${j + 1}`});
      j++;
      //меняем квадраты
      if (i !== j) {
        arrayAnimation.push({name: 'moveOnStep', object: 'cube', step: j - i, index: i});
        nums[j] = nums[i];
      }
    }
    //итерация закончена - сдвигаем стрелочку i
    if (i + 1 < nums.length) {
      arrayAnimation.push({name: 'moveOnStep', object: 'arrow-top', step: 1, index: i});
      arrayAnimation.push({name: 'changeText', object: 'arrow-top-text', text: `i = ${i + 1}`});
    }
  }
  return arrayAnimation;
};