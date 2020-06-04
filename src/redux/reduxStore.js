import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ProfileReducer from "./ProfilePageReducer";
import MessagesReducer from "./MessagesPagesReducer";
import SidebarReducer from "./SidebarReducer";
import UsersReducers from "./UsersPageReducer";
import AuthReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as fromReducer} from 'redux-form'
import AppReducer from "./AppReducer";

let reducers = combineReducers({
    profilePage: ProfileReducer,
    messagesPage: MessagesReducer,
    sidebar: SidebarReducer,
    usersPage: UsersReducers,
    auth: AuthReducer,
    form: fromReducer,
    app: AppReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;