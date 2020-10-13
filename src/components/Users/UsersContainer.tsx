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
import {userType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";


type MapDispatchProps = {
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    unfollowUser: (id: number) => void
    followUser: (id:number) => void
}

type MapStateProps = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<userType>
    followingInProgress: Array<number>
}


type Props = MapDispatchProps & MapStateProps

const UsersContainer: React.FC<Props> = (props) => {

    useEffect(() => {
        const {currentPage, pageSize} = props
        props.getUsers(currentPage, pageSize);
    }, [props.currentPage])


    const onPageChanged = (pageNumber: number): void => {
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
            // toggleFollowingProgress={props.toggleFollowingProgress}
               followingInProgress={props.followingInProgress}
               followUser={props.followUser}
               unfollowUser={props.unfollowUser}
        />
    </>
}


const mapStateToProps = (state: AppStateType): MapStateProps => {
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
    //  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, {
        setCurrentPage,
        getUsers: requestUsers,
        followUser,
        unfollowUser
    }),
    AuthRedirect
)(UsersContainer)
