import {getAuthUser} from "./AuthReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false
};

const AppReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};


type ActionsType = initializedSuccessType

type initializedSuccessType = { type: typeof INITIALIZED_SUCCESS }

export const initializedSuccess = (): initializedSuccessType => ({type: INITIALIZED_SUCCESS})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUser())
    await promise
    dispatch(initializedSuccess())


}


export default AppReducer;
