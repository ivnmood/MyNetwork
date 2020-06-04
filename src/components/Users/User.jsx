import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, unfollowUser, followUser}) => {
    return <div>
            <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""
                             className={styles.userPhoto}/>
                             </NavLink>
                    </div>
                    <div>
                        {
                            user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollowUser(user.id)
                                          }}>
                                    Unfollow</button>

                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              followUser(user.id)
                                          }}>
                                    Follow</button>
                        }
                    </div>
                </span>

                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                             <div>{"user.location.country"}</div>
                             <div>{"user.location.city"}</div>
                         </span>

    </div>
}

export default User;