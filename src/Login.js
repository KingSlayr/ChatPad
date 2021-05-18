import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionType } from './reducer'
import { useStateValue } from './StatePovider'

export default function Login() {
    const [{},dispatch] =  useStateValue()
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res=>{
                dispatch({
                    type:actionType.SET_USER,
                    user:res.user
                })
            })
            .catch(err=>alert(err.message))
    }
    return (
        <div className='app'>
            <div className='banner'></div>
            <div className='app_body'>
                <div className='login'>
                    <div className='login_container'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png'/>
                        <div className='login_text'>
                            <h1>
                                Sign in to Whatsapp
                            </h1>
                        </div>
                        <Button type='submit' onClick={signIn}>
                            Sign In with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
