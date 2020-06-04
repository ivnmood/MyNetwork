import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/AuthReducer";


const HeaderContainer = (props) => {
    return <Header {...props}/>
}

const mapStateToProps = (state) => ({

    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
})

export default connect(mapStateToProps, { logout})(HeaderContainer);