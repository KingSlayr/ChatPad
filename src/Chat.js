import { Avatar, decomposeColor, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import './Chat.css'
import db from './firebase'
import { useStateValue } from './StatePovider'
import firebase from 'firebase'

export default function Chat() {
    const [{user},dispatch] =  useStateValue()
    const [input, setInput] = useState('')
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const divRef = useRef();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
        divRef.current.scrollIntoView();
    }, [roomId])

    const sendMessage = (event) => {
        event.preventDefault()
        const message = input
        if(message){
            db.collection('rooms').doc(roomId).collection('messages').add({
                message:message,
                name:user?.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                email:user?.email
            })
        }
        setInput('')
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${roomId}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>{messages[messages.length-1]?
                        (new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()):
                        ''
                    }</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
                {messages.map((message)=>(
                    <p className={`chat_message ${(user.email===message.email)&&"chat_reciever"}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'>
                            {                                
                                new Date(message.timestamp?.toDate()).toUTCString()
                            }
                        </span>
                    </p>
                ))}
                <div ref={divRef}></div>
            </div>
            <div className='chat_footer'>
                <IconButton><InsertEmoticon/></IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message'/>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <IconButton><Mic/></IconButton>
            </div>
        </div>
    )
}
