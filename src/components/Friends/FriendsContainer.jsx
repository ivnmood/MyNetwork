import React from "react";
import {connect} from "react-redux";
import Friends from "./Friends";


const mapStateToProps = (state) => {
    return {
        friendsData: state.sidebar.friendsData
    }
}

const mapDispatchToProps = () => {
    return {

    }
}


const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)


export default FriendsContainer;