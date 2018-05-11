import types from '../constants/calculator';

const initialState = {
  stack: [],
  result: '',
  randomMode: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_STACK:
      return {
        ...state,
        stack: action.payload,
      };
    case types.UPDATE_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case types.CLEAR_CALCULATOR:
      return {
        ...initialState,
        stack: [],
      };
    case types.TOGGLE_RANDOM_MODE:
      return {
        ...state,
        randomMode: !state.randomMode,
      };
    default:
      return state;
  }
}
