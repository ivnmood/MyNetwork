import style from "./Paginator.module.css";
import React from "react";
import 'antd/dist/antd.css';
import {Pagination} from 'antd';

type Props = {
    currentPage: number
    totalItemsCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
}

const Paginator: React.FC<Props> = ({currentPage, totalItemsCount, onPageChanged, pageSize}) => {

    return (
        <div className={style.pagination}>
            <Pagination simple defaultCurrent={currentPage} total={totalItemsCount} onChange={onPageChanged}
                        current={currentPage} defaultPageSize={pageSize}/>
        </div>
    )
}
export default Paginator
