import { createReducer } from "../../app/common/util/reducerUtil"
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstants"
import { asyncActionFinish } from "./asyncActions"

const initialState = {
    loading: false,
    elementName: null
}

const asynActionStarted = (state, payload) => {
    return {
        ...state,
        loading: true,
        elementName: payload
    }
}

const asynActionFinished = (state) => {
    return {
        ...state,
        loading: false
    }
}

const asynActionError = (state) => {
    return {
        ...state,
        loading: false
    }
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asynActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinish,
    [ASYNC_ACTION_ERROR]: asynActionError
})