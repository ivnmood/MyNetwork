import React from "react";
import Style from "./Post.module.css"
import userPhoto from "../../../../assets/images/user.png";
import styles from "../../../Users/users.module.css";
import {NavLink} from "react-router-dom";


const Post = (props) => {
    return (
        <div className={Style.post}>
            <div>
                <NavLink to={'/profile/' + props.user.id}>
                    <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} alt=""
                         className={styles.userPhoto}/>
                </NavLink>
            </div>
            <span className={Style.message}> {props.message} </span> <br/>
            <button className={Style.button}>Like</button>
            <span className={Style.likes}>{props.likes}</span>
        </div>
    )
}

export default Post;