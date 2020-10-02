'use strict';

const nums = [1];
export const slide1 = {
  array: [...nums],
  title: 'Шаг 1',
  description: ['Рассмотрим ситуацию, если массив nums пуст? Если массив состоит из одного элемента?'],
  code: `
      if (nums.length <= 1) return nums.length;
      `,
  img: ['step1-1x', 'step1-2x', 'step1-4x'],
  arrow: ['disable', 'disable'],
  boxes: [{name: 'in', value: `nums = [${nums}]`}],
  animation: null,
};