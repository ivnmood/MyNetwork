import React from "react";
import {connect} from "react-redux";
import Sidebar from "./Sidebar";



const mapStateToProps = (state) => {
    return {
        friendsData: state.sidebar.friendsData
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;