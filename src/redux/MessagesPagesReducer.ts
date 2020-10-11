const SEND_MESSAGE = 'SEND-MESSAGE'

type dialogType = {
    name: string
    id: string
}
type messageType = {
    message: string
    id: string
}

let initialState = {
    DialogsData: [
        {name: "Dima", id: "2"},
        {name: "Vasya", id: "3"},
        {name: "Gordon", id: "4"},
        {name: "Vladimir", id: "5"}
    ] as Array<dialogType>,
    MessagesData: [
        {message: "Hello", id: "1"},
        {message: "Hello, it's my first message", id: "2"},
        {message: "Lokolokolkol", id: "3"},

    ] as Array<messageType>
}

export type initialStateType = typeof initialState

const MessagesReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {

        case SEND_MESSAGE:
            let newMessage = action.newMessageBody
            return {
                ...state,
                MessagesData: [...state.MessagesData, {message: newMessage, id: '4'}]
            }
        default:
            return state
    }
}

type sendMessageActionCreatorType = {type: typeof SEND_MESSAGE, newMessageBody: string}
export const sendMessageActionCreator = (newMessageBody: string): sendMessageActionCreatorType => ({ type: SEND_MESSAGE, newMessageBody })

export default MessagesReducer
