import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import {reducer as ToastrReducer} from 'react-redux-toastr';
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/events/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asynReducer from "../../features/async/asynReducer";
import { firebaseReducer } from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer,
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asynReducer,
  toastr: ToastrReducer
});

export default rootReducer;
