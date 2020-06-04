import React from "react";
import Style from "./Messages.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogsItem";
import {Field, reduxForm, reset} from "redux-form";
import {TextArea} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/vlidators/validators";


const Messages = (props) => {


    let DialogsElements = props.DialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)
    let MessagesElements = props.MessagesData.map(m => <Message message={m.message}/>)


    const AddNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }


    return (
        <div>
            <div className={Style.dialogs}>
                <div className={Style.dialogsItems}>

                    {DialogsElements}

                </div>
                <div className={Style.messages}>
                    <div>{MessagesElements}</div>

                    <AddMessageReduxForm onSubmit={AddNewMessage}/>
                </div>
            </div>
        </div>
    )
};


const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <Field component={TextArea}
                   name={"newMessageBody"}
                   placeholder={"Enter your message"}
                   validate={[required, maxLength100]}
            />
                <button>Send</button>
        </form>
)
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('AddMessageForm'));

const AddMessageReduxForm = reduxForm({
    form: 'AddMessageForm',
    onSubmitSuccess: afterSubmit,
})(AddMessageForm)

export default Messages;