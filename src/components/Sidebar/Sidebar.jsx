import React from "react";
import Style from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";
import {
    LineOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Menu} from "antd";




const Sidebar = () => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<LineOutlined />}>
                <NavLink to="/profile" activeClassName={Style.active}>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<LineOutlined />}>
                <NavLink to="/messages" activeClassName={Style.active}>Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<LineOutlined />}>
                <NavLink to="/users" activeClassName={Style.active}>Users</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<LineOutlined />}>
                <NavLink to="/news" activeClassName={Style.active}>News</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<LineOutlined />}>
                <NavLink to="/music" activeClassName={Style.active}>Music</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<LineOutlined />}>
                <NavLink to="/settings" activeClassName={Style.active}>Settings</NavLink>
            </Menu.Item>
        </Menu>
    )
};

export default Sidebar;
