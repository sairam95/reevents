import { createReducer } from "../../app/common/util/reducerUtil"
import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants"

const initalState = {
    authenticated: false,
    currentUser: null
}

const loginUser = (state, payload) => {
    return {
        authenticated: true,
        currentUser: payload.creds.email
    }
}

const signOutuser = (state, payload) => {
    return {
        authenticated: false,
        currentUser: null
    }
}

export default createReducer(initalState, {
    [LOGIN_USER]: loginUser,
    [SIGN_OUT_USER]: signOutuser
})