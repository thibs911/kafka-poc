import cst from '../constants/calculator';

export const updateStack = payload => ({ type: cst.UPDATE_STACK, payload });
export const clearCalculator = () => ({ type: cst.CLEAR_CALCULATOR });
export const updateResult = payload => ({ type: cst.UPDATE_RESULT, payload });
export const toggleRandomMode = () => ({ type: cst.TOGGLE_RANDOM_MODE });
