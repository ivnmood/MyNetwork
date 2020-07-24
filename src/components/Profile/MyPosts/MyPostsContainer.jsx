import React from "react";
import {addPostActionCreator} from "../../../redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/UsersSelectors";
import {requestUsers} from "../../../redux/UsersPageReducer";





const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        users: getUsers(state)
    }
}

const mapStateToDispatch = (dispatch) => {
    return {

        addPost: (newPostElement) => {
           dispatch(addPostActionCreator(newPostElement));
        },
        getUsers: requestUsers

    }
}

const MyPostsContainer = connect(mapStateToProps, mapStateToDispatch)(MyPosts)

export default MyPostsContainer;