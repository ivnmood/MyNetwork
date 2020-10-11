import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type initialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
};

let initialState: initialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const AuthReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
};

type setAuthUserDataPayloadType = { id: number | null, email: string | null, login: string | null, isAuth: boolean }
type setAuthUserDataType = { type: typeof SET_USER_DATA, payload: setAuthUserDataPayloadType }
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
})


type getCaptchaSuccessType = { type: typeof GET_CAPTCHA_URL_SUCCESS, captchaUrl: string }
export const getCaptchaSuccess = (captchaUrl: string): getCaptchaSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
})

export const getAuthUser = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        const response = await authAPI.loginUser(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUser())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const getCaptchaUrl = () =>
    async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaSuccess(captchaUrl))
    }

export const logout = () => {
    return async (dispatch: any) => {
        const response = await authAPI.logoutUser()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default AuthReducer;
