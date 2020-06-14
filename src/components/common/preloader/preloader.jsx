import React from "react";
import {
    LoadingOutlined,
} from '@ant-design/icons';
import s from "./preloader.module.css"

const Preloader = () => {
    return (
        <div className={s.loader}>
            <LoadingOutlined/>
        </div>
        )

}


export default Preloader;