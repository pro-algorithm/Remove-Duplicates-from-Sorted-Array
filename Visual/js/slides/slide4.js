'use strict';

const numsStep = [1, 2, 2];
const nums = [1, 1, 2];

export const slide4 = {
  array: [...numsStep],
  title: 'Шаг 4',
  description: ['Осталось вернуть значение указателя j, не забыв прибавить 1.'],
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
  arrow: [{title: 'i = 2', value: 2}, {title: 'j = 1', value: 1}],
  boxes: [{name: 'in', value: `nums = [${nums}]`}, {name: 'out', value: `2`}],
  animation: null,
};