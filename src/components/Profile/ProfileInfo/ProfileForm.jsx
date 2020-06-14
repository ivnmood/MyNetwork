import Style from "./ProfileInfo.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControl/FormsControl";
import s from "../../Login/Login.module.css";

const ProfileForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {error && <div className={s.error}>
                    {error}
                </div>}
            </div>
            <div>
                <b>Full Name: </b>
                <Field name={"fullName"}
                       placeholder={"Full Name"}
                       component={Input}
                       validate={[]}
                />
            </div>
            <div>
                <b>aboutMe: </b>
                <Field name={"aboutMe"}
                       placeholder={"About Me"}
                       component={TextArea}
                       validate={[]}
                /></div>
            <div>
                <b>look for work: </b>
                <Field name={"lookingForAJob"}
                       type={"checkbox"}
                       component={Input}
                /></div>
            <div>
                <b>Skills: </b>
                <Field name={"lookingForAJobDescription"}
                       placeholder={"skills"}
                       component={TextArea}
                       validate={[]}
                /></div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={Style.contact}>
                    <b>{key}:  <Field name={"contacts." + key}
                                      placeholder={key}
                                      component={Input}/>
                    </b>
                </div>
            })}
            </div>
            <div>
                <button >Save</button>
            </div>
        </form>
    )

}


const ProfileReduxForm = reduxForm({
    form: 'editProfile',
})(ProfileForm)

export default ProfileReduxForm