import React from "react";
import Style from "./Friend.module.css"

const Friend = (props) => {



    return (
       <div className={Style.friend}>
           <img src="https://vignette.wikia.nocookie.net/avatar/images/1/1b/%D0%9A1%D1%8501_%D0%9A%D0%BE%D1%80%D1%80%D0%B0_%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82.jpg/revision/latest?cb=20160308145916&path-prefix=ru" alt=""/>

           {props.name}

       </div>
    )
}

export default Friend;