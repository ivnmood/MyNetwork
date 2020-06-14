import React, {useEffect, useState} from "react";


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
            setStatus(props.status)
        },
        [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <StatusWithoutEditMode activateEditMode={activateEditMode} status={props.status}/>
            }
            {editMode && props.isOwner &&
            <StatusWithEditMode deactivateEditMode={deactivateEditMode} status={status}
                                onStatusChange={onStatusChange}/>
            }
            {editMode && !props.isOwner &&
            <StatusWithoutEditMode activateEditMode={activateEditMode} status={props.status}/>
            }

        </div>
    )
}


let StatusWithoutEditMode = ({activateEditMode, ...props}) => {
    return (
        <div>
            <b>Status: </b> <span onClick={activateEditMode}>{props.status || "-----"}</span>
        </div>
    )
}
let StatusWithEditMode = ({deactivateEditMode, onStatusChange, status}) => {
    return (
        <div>
            <b>Status: </b> <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange}
                                   value={status}/>
        </div>
    )
}


export default ProfileStatusWithHooks;