import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus} from "../../redux/ProfilePageReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


const ProfileContainer = ({autorizedId, history, match, getProfile, getStatus, status, profile, updateStatus,}) => {

useEffect(() => {
    let userId = match.params.userId;
    if (!userId) {
        userId = autorizedId;
        if (!userId) {
            history.push("/login")
        }
    }
    getProfile(userId);
    getStatus(userId);
}, [match.params.userId])



    return (
        <Profile profile={profile} status={status} updateStatus={updateStatus}/>
    )
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedId: state.auth.id
})


export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)