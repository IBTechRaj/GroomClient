import React from 'react';
import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Carousel from './components/Carousel/MyCarousel'
import Landing from './components/Landing'
import Sprovider from './components/Sprovider'
import SpLogin from './components/SpLogin'
import Home from './components/Home'
import ForgotPassword from './components/Navbar/ForgotPassword';
import PasswordReset from './components/Navbar/PasswordReset';


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
      <Switch>
        <Route path='/' exact component={Home} />
        {/* <SpLogin spLoggedIn={spLoggedIn} setSpLoggedIn={setSpLoggedIn} client={client} setClient={setClient} spId={spId} setSpId={setSpId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />
        {client ?
          < Landing userId={userId} userName={userName} userEmail={userEmail} userMobile={userMobile} /> :
          <Sprovider spId={spId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />
        } */}
        <Route path='/ForgotPassword' exact component={ForgotPassword} />
        <Route path='/PasswordReset' exact component={PasswordReset} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
