import React, { useCallback, useContext, useEffect, useState } from 'react';
import Scanner from '../components/Scanner/Scanner';
import { ActionsContext } from '../contexts/context';
import JWT from 'jsonwebtoken';

const Scan = () => {
    const [message, setMessage] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const { actions, setActions} = useContext(ActionsContext);
    const [password,setPassword] = useState('')
    const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                
                console.log("Scan started successfully.");
                ndef.onreadingerror = () => {
                    console.log("Cannot read data from the NFC tag. Try another one?");
                };
                
                ndef.onreading = event => {
                    console.log("NDEF message read.");
                    onReading(event);
                    setActions({
                        scan: 'scanned',
                        write: null
                    });
                };

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
            };
        }
    },[setActions]);

    const onReading = ({message, serialNumber}) => {
        setSerialNumber(serialNumber);
        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setMessage(textDecoder.decode(record.data));
                    localStorage.setItem("message",textDecoder.decode(record.data))
                    break;
                case "url":
                    // TODO: Read URL record with record data.
                    break;
                default:
                    // TODO: Handle other records with record data.
                }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);

    
  const Decrypt = async(message) => {
    if(password.length <= 0){
      alert('Please fill all the fields')
    } else {
    
      try{
        const Verify = await JWT.verify(message,password);
        await console.log(Verify)
        await setMessage(Verify)
      } catch(err){
        alert('Wrong Password')
      }
     }
    }
  
    return(
        <>
            {actions.scan === 'scanned' ?  
            <div>
                <p>Serial Number: {serialNumber}</p>
                <p>Message: {message}</p>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => Decrypt(message)} >Decrypt</button>
            </div>
            : <Scanner status={actions.scan}></Scanner> }
        </>
    );
};

export default Scan;