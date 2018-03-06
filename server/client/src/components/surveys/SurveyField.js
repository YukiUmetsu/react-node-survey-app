/**
 * Created by yukiX on 2018/03/04.
 */
import React from 'react';

export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};