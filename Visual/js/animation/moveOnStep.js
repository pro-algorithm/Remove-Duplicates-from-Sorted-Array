'use strict';

export const animationMoveOnStep = (object, start, end) => {

  const currentPositionLeft = parseInt(object.style.left);

  const direction = end - start >= 0 ? 'right' : 'left';
  if (currentPositionLeft !== end) {
    if (direction === 'right') {
      object.style.left = `${currentPositionLeft + 1}px`;
    }
    if (direction === 'left') {
      object.style.left = `${currentPositionLeft - 1}px`;
    }
    return false
  }
  return true;
};