import React from "react";
import Style from "./MyPosts.module.css"
import Post from "./Post/Post";
import {Field, reduxForm, reset} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/vlidators/validators";
import {TextArea} from "../../common/FormsControl/FormsControl";


const MyPosts = (props) => {
    let postElement = props.postData.map(m => <Post message={m.message} likes={m.likesCount}/>);

    let AddNewPost = (values) => {
        props.addPost(values.newPostElement);
    };

    return (
        <div className={Style.content}>
            <div>

                <AddPostReduxForm onSubmit={AddNewPost}/>

            </div>
            <div>
                {postElement}
            </div>

        </div>

    )
}

const maxLength10 = maxLengthCreator(10)


const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <Field name={"newPostElement"}
                   placeholder={"Enter your text"}
                   component={TextArea}
                   validate={[required, maxLength10]}
            />

            <button className={Style.button}>Add Post</button>
        </form>

    )
}


const afterSubmit = (result, dispatch) =>
    dispatch(reset('AddPostForm'));

const AddPostReduxForm = reduxForm({
    form: 'AddPostForm',
    onSubmitSuccess: afterSubmit,
})(AddPostForm)

export default MyPosts;