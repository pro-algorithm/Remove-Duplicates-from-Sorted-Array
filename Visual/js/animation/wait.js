'use strict';

let i = 0;
export const animationWait = (duration = 40) => {
  if (i < duration) {
    i++;
    return false;
  }
  i = 0;
  return true;
};