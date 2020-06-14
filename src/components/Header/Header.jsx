import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import { Button } from 'antd';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {props.isAuth
                ? <div> <strong className={s.loginBlockInfo}>{props.login}</strong> - <Button type="link" onClick={props.logout}>Log Out</Button></div>
                : <NavLink to={'/login'}> <Button type="link" >Login</Button></NavLink>
            }
            </div>
        </header>
    )
}

export default Header;