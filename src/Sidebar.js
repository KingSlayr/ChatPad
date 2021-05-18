import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from './firebase'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import { useStateValue } from './StatePovider'

export default function Sidebar() {

    const [{user},dispatch] =  useStateValue()

    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            )))
        ))

        return ()=>{
            unsubscribe();
        }
    }, [])
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined/>
                    <input placeholder='Search or start new chat' type='text'/>
                </div>
                 
            </div>
            <div className='sidebar_chat'>
                <SidebarChat addNewChat/>
                {
                    rooms.map(room=><SidebarChat key={room.id} id={room.id} name = {room.data.name}/>)
                }
            </div>
        </div>
    )
}
