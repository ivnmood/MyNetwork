import React from "react";
import Style from "./ProfileInfo.module.css"
import Preloader from "../../common/preloader/preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatus from "../ProfileStatus";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={Style.content}>
            <div><img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA3_Po1WAynqwcS6GtqJ9Ay-XeEfjXkqBp7qcUh-4Y_4U-w64D"
                alt=""/></div>
            <div className={Style.AvatarAndDescription}>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} alt=""/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <br/>
                <br/>
                <div>Name: {props.profile.fullName}</div>
                <div>aboutMe: {props.profile.aboutMe}</div>
                <div>{props.profile.contacts.facebook}</div>
                <div>{props.profile.contacts.website}</div>
                <div>{props.profile.contacts.vk}</div>
                <div>{props.profile.contacts.twitter}</div>
                <div>{props.profile.contacts.instagram}</div>
                <div>{props.profile.contacts.youtube}</div>
                <div>{props.profile.contacts.github}</div>
                <div>{props.profile.lookingForAJob}</div>
                <div>{props.profile.lookingForAJobDescription}</div>



            </div>
        </div>
    )
}

export default ProfileInfo;