import React, {useState} from "react";
import Style from "./ProfileInfo.module.css"
import Preloader from "../../common/preloader/preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import ProfileForm from "./ProfileForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotosSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div className={Style.ProfileInfo}>
            <div>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} alt=""/>
                <br/>
                <div className={Style.ImageButton}>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotosSelected}/>}
                </div>


            </div>

            <div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}
                                        isOwner={props.isOwner}/>
                {editMode
                    ? <ProfileForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }}
                                   profile={props.profile}
                                   isOwner={props.isOwner}/>}
            </div>

        </div>

    )
}


const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div className={Style.AvatarAndDescription}>


        <div><b>Name: </b> {profile.fullName}</div>
        <div><b>aboutMe: </b> {profile.aboutMe}</div>
        <div><b>look for work: </b>{profile.lookingForAJob ? "yes" : "no"}</div>
        <div><b>Skills: </b>{profile.lookingForAJobDescription}</div>
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={Style.contact}><b>{contactTitle}: </b> {contactValue}</div>
}

export default ProfileInfo;