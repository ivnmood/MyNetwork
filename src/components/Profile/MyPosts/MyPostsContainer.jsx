import React from "react";
import {addPostActionCreator} from "../../../redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";





const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
    }
}

const mapStateToDispatch = (dispatch) => {
    return {

        addPost: (newPostElement) => {
           dispatch(addPostActionCreator(newPostElement));
        }

    }
}

const MyPostsContainer = connect(mapStateToProps, mapStateToDispatch)(MyPosts)

export default MyPostsContainer;