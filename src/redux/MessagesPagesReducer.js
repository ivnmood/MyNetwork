const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {
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

    ]
};

const MessagesReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let newMessage = {
                message: action.newMessageBody
            };
            return {
                ...state,
                MessagesData: [...state.MessagesData, newMessage],
            }
        default:
            return state;

    }

};

export const sendMessageActionCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })


export default MessagesReducer;