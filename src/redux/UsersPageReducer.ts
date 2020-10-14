import {followAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {userType} from "../types/types";
import {AppStateType} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<userType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of user id
};

type initialStateType = typeof initialState

const UsersReducers = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_USERS_TOTAL_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsType =
    followType
    | unfollowType
    | setUsersType
    | setCurrentPageType
    | setUsersTotalCountType
    | toggleIsFetchingType
    | toggleFollowingProgressType

type followType = { type: typeof FOLLOW, userId: number }
export const follow = (userId: number): followType => ({type: FOLLOW, userId})

type unfollowType = { type: typeof UNFOLLOW, userId: number }
export const unfollow = (userId: number): unfollowType => ({type: UNFOLLOW, userId})

type setUsersType = { type: typeof SET_USERS, users: Array<userType> }
export const setUsers = (users: Array<userType>): setUsersType => ({type: SET_USERS, users})

type setCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})

type setUsersTotalCountType = { type: typeof SET_USERS_TOTAL_COUNT, totalUsersCount: number }
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalUsersCount
})

type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})

type toggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}


const _followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: any, actionCreator: (userId: number) => followType | unfollowType) => {
    dispatch(toggleFollowingProgress(true, id));
    let response = await apiMethod(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgress(false, id));
}

export const unfollowUser = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, followAPI.unfollowUser.bind(followAPI), unfollow)
    }
}

export const followUser = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, followAPI.followUser.bind(followAPI), follow)
    }
}

export default UsersReducers
