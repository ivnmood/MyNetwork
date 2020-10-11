import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postType, profileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';




let initialState = {
    postData: [
        {id: "1", message: "It's my first post", likesCount: 456},
        {id: "2", message: "Olelelelelel1", likesCount: 50},
    ] as Array<postType>,
    profile: null as profileType | null,
    status: "",

};

export type initialStateType = typeof initialState

const ProfileReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: "3",
                message: action.newPostElement,
                likesCount: 0,
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        }
        default:
            return state;
    }

};

type addPostType = { type: typeof ADD_POST, newPostElement: string }
type setUserProfileType = { type: typeof SET_USER_PROFILE, profile: profileType }
type setStatusType = { type: typeof SET_STATUS, status: string }
type savePhotoSuccessType = { type: typeof SAVE_PHOTO_SUCCESS, photos: photosType }

export const addPost = (newPostElement: string): addPostType => ({type: ADD_POST, newPostElement});
export const setUserProfile = (profile: profileType): setUserProfileType => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getProfile = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default ProfileReducer;
