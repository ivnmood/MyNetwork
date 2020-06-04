import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://pngimg.com/uploads/google/google_PNG19644.png" alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth
                ? <div>{props.login}, {props.email} - <button onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>
            }
            </div>
        </header>
    )
}

export default Header;