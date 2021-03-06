import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

const initialState = {
  data: 43,
  type: "none"
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + 1, type: action.type};
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - 1 };
    default:
      return state;
  }
};

export default testReducer;
