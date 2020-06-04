import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/vlidators/validators";
import {login} from "../../redux/AuthReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"


const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={"email"}
                       placeholder={"email"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field name={"password"}
                       placeholder={"password"}
                       component={Input}
                       validate={[required]}
                       type={"password"}
                />
            </div>
            <div>
                <Field name={"rememberMe"}
                       type={"checkbox"}
                       component={Input}
                /> <span>remember me</span>
            </div>
            <div>
                {error && <div className={s.error}>
                    {error}
                </div>}
            </div>
            <div>
                <button>login</button>
            </div>


        </form>
    )
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('login'));

const LoginReduxForm = reduxForm({
    form: 'login',
    onSubmitSuccess: afterSubmit,
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login})(Login);