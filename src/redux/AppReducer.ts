import {getAuthUser} from "./AuthReducer";

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

type initializedSuccessType = { type: typeof INITIALIZED_SUCCESS }

export const initializedSuccess = (): initializedSuccessType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(getAuthUser())
    await promise
    dispatch(initializedSuccess())


}


export default AppReducer;
