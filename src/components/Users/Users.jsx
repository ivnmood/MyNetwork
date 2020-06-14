import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from "./users.module.css";

const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
                   <div className={styles.users}>
                       {
                           props.users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                                                      unfollowUser={props.unfollowUser} followUser={props.followUser}/>
                           )
                       }
                   </div>

    </div>
}

export default Users;