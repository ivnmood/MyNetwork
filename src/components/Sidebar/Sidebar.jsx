import React from "react";
import Style from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";
import Friend from "../Friends/Friend/Friend";


const Sidebar = (props) => {

    let FriendsElement = props.friendsData.map(f => <Friend name={f.name}/>);

    return (
        <nav className={Style.nav}>
            <div className={Style.link}>
                <NavLink to="/profile" activeClassName={Style.active}>Profile</NavLink>
            </div>
            <div className={Style.link}>
                <NavLink to="/messages" activeClassName={Style.active}>Messages</NavLink>
            </div>
            <div className={Style.link}>
                <NavLink to="/users" activeClassName={Style.active}>Users</NavLink>
            </div>
            <div className={Style.link}>
                <NavLink to="/news" activeClassName={Style.active}>News</NavLink>
            </div>
            <div className={Style.link}>
                <NavLink to="/music" activeClassName={Style.active}>Music</NavLink>
            </div>
            <div className={Style.link}>
                <NavLink to="/settings" activeClassName={Style.active}>Settings</NavLink>
            </div>
            <div className={`${Style.link} + ${Style.friends}`}>
                <NavLink to="/friends" activeClassName={Style.active}>Friends</NavLink>
                {FriendsElement}
            </div>
        </nav>
    )
};

export default Sidebar;