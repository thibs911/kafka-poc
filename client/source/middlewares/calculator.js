import cst from '../constants/calculator';
import { updateResult } from '../actions/calculator';

const operate = (aString, bString, operator) => {
  try {
    const a = Number(aString);
    const b = Number(bString);
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return null;
    }
  } catch (e) {
    return null;
  }
};

const calculus = (result, stack) => {
  if (stack.length < 1) return result;
  const operator = stack.shift();
  const number2 = stack.shift();
  const res = operate(result, number2, operator);
  return calculus(res, stack);
};

export default store => next => action => { // eslint-disable-line
  if (action.type === cst.UPDATE_STACK) {
    const stack = action.payload.slice();
    let stackTmp = stack.slice();
    if (['+', '-', '*', '/', '='].includes(stackTmp.pop())) {
      stackTmp = action.payload.slice();
      if (stackTmp.pop() === '=') {
        const result = calculus(stackTmp.shift(), stackTmp);
        next(updateResult(result));
      }
      stackTmp = stack.slice();
      const lastItem = stackTmp.pop();
      if (stack.includes('=') && lastItem !== '=') {
        const result = store.getState().calculator.result;
        if (!isNaN(result)) {
          action.payload = [result, lastItem]; // eslint-disable-line
        }
      }
    } else {
      stackTmp = stack.slice();
      const number2 = stackTmp.pop();
      const number1 = stackTmp.pop();
      if (
        action.payload.length > 1 &&
        !isNaN(number1) &&
        (!isNaN(number2) || number2 === '.')
      ) {
        const merge = number1.concat(number2);
        stackTmp.push(merge);
      action.payload = stackTmp; // eslint-disable-line
      }
    }
  }
  next(action);
};
