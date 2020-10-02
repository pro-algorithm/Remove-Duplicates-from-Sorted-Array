'use strict';

const nums = [1, 1, 2];

export const slide2 = {
  array: [...nums],
  title: 'Шаг 2',
  description: ['Нужно обойти весь массив, я выбрала цикл for.',
    'Итератором будет переменная i (стрелочка сверху). Обратите внимание, что первый элемент нам не нужно расматривать.',
    'Для сохранения позиции, где в массиве нет дублирующих элементов, используем переменную j(стрелочка снизу). Начальное значение переменной j = 0'],
  code: `
      if (nums.length <= 1) return nums.length;
      let j = 0;
      for (let i = 1; i < nums.length; i++) {}`,
  img: ['step2-1x', 'step2-2x', 'step2-4x'],
  arrow: [{title: 'i = 1', value: 1}, {title: 'j = 0', value: 0}],
  boxes: [{name: 'in', value: `nums = [${nums}]`}],
  animation: null
};