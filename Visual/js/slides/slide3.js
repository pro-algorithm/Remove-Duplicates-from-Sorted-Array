'use strict';

import {animationGeneration} from '../animation/generate.js';

const nums = [1, 1, 2];

export const slide3 = {
  array: [...nums],
  title: 'Шаг 3',
  description: ['На каждом шаге цикла сравниваем последнее недублирующее значение (доступно по индексу j) и текущее значение (доступно по индексу i).',
    'Если значения не равны, то сдвигаем значение последнего недублирующего (j).',
    'В ячейку, куда указывает индекс j записываем текущее значение (доступно по итератору i)'],
  code: `
      if (nums.length <= 1) return nums.length;
      let j = 0;
      for (let i = 1; i < nums.length; i++) {
        if (nums[j] !== nums[i]) {
          j++;
          nums[j] = nums[i];
        }
      }
      `,
  img: ['step3-1x', 'step3-2x', 'step3-4x'],
  arrow: [{title: 'i = 1', value: 1}, {title: 'j = 0', value: 0}],
  boxes: [{name: 'in', value: `nums = [${nums}]`}],
  animation: animationGeneration([...nums]),
};