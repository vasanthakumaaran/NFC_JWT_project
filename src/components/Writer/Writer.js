/* eslint-disable no-alert, no-console */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './Writer.css';
import Save from '../SVGs/save';
import Write from '../../containers/Write';

const Writer = ({writeFn}) => {
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hashValue,setHashValue] = useState('');
    // useEffect(() => {
    //     if(localStorage.getItem('encrypted')){
    //        setHashValue(localStorage.getItem('encrypted'));
    //     }
    //    },[message,password,hashValue,localStorage.getItem('encrypted')]);
     
    const onSave = (e) => {
        e.preventDefault();
        writeFn(message,password);
        setMessage('');
        setPassword('')
    };
    
    return (
      <>
        <form onSubmit={onSave}>
            <div className="writer-container">
                <input type="text" placeholder="Enter Message..." value={message} onChange={(e)=>setMessage(e.target.value)}></input>
                <input type="text" placeholder="Enter Password..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="btn" type="submit">
                    <Save/>
                {hashValue.length > 0 && <div>{hashValue}</div>}
                    Save
                </button>
            </div>
        </form>
      </>
    );
};

export default Writer;