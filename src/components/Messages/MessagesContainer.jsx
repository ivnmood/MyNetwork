import React from "react";
import {sendMessageActionCreator} from "../../redux/MessagesPagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        DialogsData: state.messagesPage.DialogsData,
        MessagesData: state.messagesPage.MessagesData,
        newMessageBody: state.messagesPage.newMessageBody,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageActionCreator(newMessageBody));
        }
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(Messages)