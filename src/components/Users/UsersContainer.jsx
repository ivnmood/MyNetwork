import React, {useEffect} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    followUser, requestUsers,

    setCurrentPage,
    unfollowUser
} from "../../redux/UsersPageReducer";
import Preloader from "../common/preloader/preloader";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/UsersSelectors";


const UsersContainer = (props) => {

    useEffect(() => {
        const {currentPage, pageSize} = props
        props.getUsers(currentPage, pageSize);
    }, [props.currentPage])


   const onPageChanged = (pageNumber) => {

        props.setCurrentPage(pageNumber);

        props.getUsers(pageNumber, props.pageSize);

    }

        return <>
            {props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={onPageChanged}
                   users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   toggleFollowingProgress={props.toggleFollowingProgress}
                   followingInProgress={props.followingInProgress}
                   followUser={props.followUser}
                   unfollowUser={props.unfollowUser}


            />
        </>
}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)

    }
}


export default compose(
    connect(mapStateToProps, {setCurrentPage, getUsers: requestUsers, followUser, unfollowUser}),
    AuthRedirect
)(UsersContainer)