import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from './firebase'
import './SidebarChat.css'

export default function SidebarChat({addNewChat,name,id}) {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>doc.data()))
        ))
    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")

        if(roomName){
            db.collection('rooms').add({
                name:roomName
            })
        }
    }

    return !addNewChat ? (
        <Link style={{all:'unset'}} to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar className='sidebarChatIcon' src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`}/>
                <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p>{messages[messages.length-1]?
                        (
                            messages[messages.length-1]?.message
                        ):''                        
                    }</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className='sidebarChat'>
            <h2 >Add New Chat</h2>
        </div>
    )
}
