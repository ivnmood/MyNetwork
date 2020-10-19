import React from "react";
import {WrappedFieldProps} from "redux-form";



export const TextArea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
