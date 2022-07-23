import React from 'react';
import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Carousel from './components/Carousel/MyCarousel'
import Landing from './components/Landing'
import Sprovider from './components/Sprovider'
import SpLogin from './components/SpLogin'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [spLoggedIn, setSpLoggedIn] = useState(false)
  const [client, setClient] = useState(true)
  const [spId, setSpId] = useState(0)
  const [spSalonId, setSpSalonId] = useState(0)
  const [userId, setUserId] = useState(0)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobile, setUserMobile] = useState('')

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
        userId={userId} setUserId={setUserId}
        userName={userName} setUserName={setUserName}
        userEmail={userEmail} setUserEmail={setUserEmail}
        userMobile={userMobile} setUserMobile={setUserMobile}
      />
      <Carousel />
      <SpLogin spLoggedIn={spLoggedIn} setSpLoggedIn={setSpLoggedIn} client={client} setClient={setClient} spId={spId} setSpId={setSpId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />
      <Switch>
        {console.log('s p l', spId, spSalonId, spLoggedIn)}
        {console.log('ui un ue um', userId, userName,userEmail,userMobile)}
        {client ?
          < Landing userId={userId} userName={userName} userEmail={userEmail} userMobile={userMobile} /> :
          <Sprovider spId={spId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />
        }
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
