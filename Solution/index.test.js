const removeDuplicates = require('./index.js');

const nums1 = [1, 1, 2];
test('nums = [1,1,2] output length: 2', () => {
  expect(removeDuplicates(nums1)).toBe(2);
});

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

test('nums = [0,0,1,1,1,2,2,3,3,4] output length: 5', () => {
  expect(removeDuplicates(nums2)).toBe(5);
});

