import React from "react";
import Style from "./Post.module.css"

const Post = (props) => {
    return (
        <div className={Style.post}>
            <img src="https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg" alt=""/>
            <span className={Style.message}> {props.message} </span> <br/>
            <button className={Style.button}>Like</button>
            <span className={Style.likes}>{props.likes}</span>
        </div>
    )
}

export default Post;
