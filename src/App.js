import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StatePovider';

function App() {
  const [{user},dispatch] =  useStateValue()
  return user?(
    <Router>
      <div className="app">
        <div className='banner'></div>
        <div className='app_body'>
        <Sidebar/>
            <Switch>            
              <Route path='/rooms/:roomId'>
                <Chat/>
              </Route>
            </Switch>
        </div>
      </div>
    </Router>
  ):(
    <Login/>
  )
}

export default App;
