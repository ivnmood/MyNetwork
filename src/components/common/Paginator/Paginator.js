import style from "./Paginator.module.css";
import React, {useState} from "react";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';


const Paginator = ({currentPage, totalItemsCount, onPageChanged, pageSize }) => {

    // let pagesCount = Math.ceil(totalItemsCount / pageSize);
    // let pages = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i);
    // }
    //
    // let portionCount = Math.ceil(pagesCount / portionSize)
    // let [portionNumber, setPortionNumber] = useState(1)
    // let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // let rightPortionPageNumber = portionNumber * portionSize



    return (
        <div className={style.pagination}>
            <Pagination simple defaultCurrent={currentPage} total={totalItemsCount} onChange={onPageChanged} current={currentPage} defaultPageSize={pageSize}/>
        </div>


    )
    // <div className={styles.paginator}>
    //     {portionNumber > 1 &&
    //     <button onClick={() => {
    //         setPortionNumber(portionNumber - 1)
    //     }}>PREV</button>}
    //     {pages
    //         .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
    //         .map(p => {
    //             return <span className={currentPage === p && styles.selectPage} key={p} onClick={(e) => {
    //                 onPageChanged(p);
    //             }}>{p}</span>
    //         })}
    //     {portionCount > portionNumber &&
    //     <button onClick={() => {
    //         setPortionNumber(portionNumber + 1)
    //     }}>Next</button>}
    //
    // </div>
}
export default Paginator;