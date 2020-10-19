import {authAPI, ResultCode, securityAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;

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

type ActionsType = setAuthUserDataType | getCaptchaSuccessType | FormAction

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


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUser = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCode.Success) {
        const {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const loginData = await authAPI.loginUser(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCode.Success) {
            await dispatch(getAuthUser())
        } else {
            if (loginData.resultCode === ResultCode.CaptchaIsRequired) {
                await dispatch(getCaptchaUrl())
            }
            const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaSuccess(captchaUrl))
    }

export const logout = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logoutUser()
        if (response.data.resultCode === ResultCode.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default AuthReducer;
