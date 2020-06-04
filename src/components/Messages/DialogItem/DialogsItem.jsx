import React from "react";
import Style from "./../Messages.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/messages/" + props.id;

       return <div className={Style.Item}>
            <NavLink to={path} activeClassName={Style.active}>{props.name}</NavLink>
        </div>

};

export default DialogItem;