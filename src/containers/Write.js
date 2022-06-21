/* eslint-disable no-alert, no-console */
import JWT from 'jsonwebtoken';
import React from 'react';
import Writer from '../components/Writer/Writer';
 


const Write = () => {
    const onWrite = async(message,password) => {
    if(message.length <= 0 || password.length <= 0){
        alert('please fill all the fields');
    }
    else {

        try {
            const hash = await JWT.sign(message,password);
            localStorage.setItem('encrypted',hash);
            const ndef = new window.NDEFReader();
            // const ndef = new window.NDEFReader();
            // // This line will avoid showing the native NFC UI reader
            await ndef.scan();
            await ndef.write({records: [{ recordType: "text", data: hash }]});
            alert(`Value Saved!`);
        } catch (error) {
            console.log(error);
        }
    } 
    }
    
    return (
      <Writer writeFn={onWrite}/>
    );
};

export default Write;