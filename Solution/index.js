/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length < 2) return nums.length;
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[j] !== nums[i]) {
      j++;
      nums[j] = nums[i];
    }
  }
  return j + 1;
};