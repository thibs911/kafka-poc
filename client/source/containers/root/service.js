'use-strict';

const rn = require('random-number');

const optionsTotalNumber = {
  min: 2,
  max: 5,
  integer: true,
};

const optionsNumber = {
  min: 1,
  max: 1000,
  integer: true,
};

const optionsOperator = {
  min: 0,
  max: 3,
  integer: true,
};

const operators = ['+', '-', '*', '/'];

export const randomize = () => {
  const totalNumber = rn(optionsTotalNumber);
  const stack = [];
  for (let i = 0; i < totalNumber; i++) { // eslint-disable-line
    stack.push(rn(optionsNumber));
    if (i < totalNumber - 1) stack.push(operators[rn(optionsOperator)]);
  }
  stack.push('=');
  return stack;
};

export default randomize;
