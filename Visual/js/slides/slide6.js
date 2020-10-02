'use strict';

import {animationGeneration} from '../animation/generate.js';

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

export const slide6 = {
  array: [...nums],
  title: 'Шаг 6',
  description: ['Убедимся, на третем примере'],
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
  boxes: [{name: 'in', value: `nums = [${nums}]`}, {name: 'out', value: `5`}],
  animation: animationGeneration([...nums]),
};