'use strict';

import {animationGeneration} from '../animation/generate.js';

const nums = [1, 1, 2, 3, 4, 4, 4];

export const slide5 = {
  array: [...nums],
  title: 'Шаг 5',
  description: ['Ты молодец! Посмотрим анимацию со вторым примером, как работает алгоритм'],
  code: `
      if (nums.length <= 1) return nums.length;
      let j = 0;
      for (let i = 1; i < nums.length; i++) {
        if (nums[j] !== nums[i]) {
          j++;
          nums[j] = nums[i];
        }
      }
      return j + 1;
      `,
  img: ['step4-1x', 'step4-2x', 'step4-4x'],
  arrow: [{title: 'i = 1', value: 1}, {title: 'j = 0', value: 0}],
  boxes: [{name: 'in', value: `nums = [${nums}]`}, {name:'out', value:`4`}],
  animation: animationGeneration([...nums]),
};