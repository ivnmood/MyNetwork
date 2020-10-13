import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from "./users.module.css";
import {userType} from "../../types/types";

type Props = {
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    users: Array<userType>
    followingInProgress: Array<number>
    unfollowUser: (id: number) => void
    followUser: (id: number) => void
}


const Users: React.FC<Props> = ({
                                    currentPage,
                                    totalUsersCount,
                                    pageSize,
                                    onPageChanged,
                                    users,
                                    followingInProgress,
                                    unfollowUser,
                                    followUser
                                }) => {

    return <div>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        <div className={styles.users}>
            {
                users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                                     unfollowUser={unfollowUser} followUser={followUser}/>
                )
            }
        </div>

    </div>
}

export default Users;
