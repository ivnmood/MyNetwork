import ProfileReducer from "./ProfilePageReducer";
import MessagesReducer from "./MessagesPagesReducer";
import SidebarReducer from "./SidebarReducer";



let store = {
    _state: {
        profilePage: {
            postData: [
                {message: "It's my first post", likesCount: "456"},
                {message: "Olelelelelel1", likesCount: "50"},
            ],
        },
        messagesPage: {
            DialogsData: [
                {name: "Dima", id: "2"},
                {name: "Vasya", id: "3"},
                {name: "Gordon", id: "4"},
                {name: "Vladimir", id: "5"}
            ],
            MessagesData: [
                {message: "Hello"},
                {message: "Hello, it's my first message"},
                {message: "Lokolokolkol"},

            ],
            newMessageBody: ' '
        },
        sidebar: {
            friendsData: [
                {name: "Dima"},
                {name: "Vasya"},
                {name: "Gordon"},
                {name: "Vladimir"}
            ]


        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("State was changed")
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.messagesPage = MessagesReducer(this._state.messagesPage, action);
        this._state.sidebar = SidebarReducer(this._state.sidebar, action);

            this._callSubscriber(this._state);
        }
    };





window.store = store;

export default store;