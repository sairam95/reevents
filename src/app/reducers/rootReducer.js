import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/events/eventReducer";

const rootReducer = combineReducers({
  test: testReducer,
  form: FormReducer,
  events: eventReducer,
});

export default rootReducer;
