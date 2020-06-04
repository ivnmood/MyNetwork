import React from "react";

import Friend from "./Friend/Friend";

const Friends = (props) => {
    let FriendsElement = props.friendsData.map(f => <Friend name={f.name}/>);

    return (
       <div>
           {FriendsElement}
       </div>
    )
}

export default Friends;