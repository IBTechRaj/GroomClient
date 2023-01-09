import React, { useState } from 'react';
import Carousel from './Carousel/MyCarousel'
import Landing from './Landing'
import Sprovider from '../components/Sprovider'
import SpLogin from './SpLogin'


function Home() {

    const [spLoggedIn, setSpLoggedIn] = useState(false)
    const [client, setClient] = useState(true)
    const [spId, setSpId] = useState(0)
    const [spSalonId, setSpSalonId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobile, setUserMobile] = useState('')
    return (
        <>
            <Carousel />
            <SpLogin spLoggedIn={spLoggedIn} setSpLoggedIn={setSpLoggedIn} client={client} setClient={setClient} spId={spId} setSpId={setSpId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />

            {client ?
                < Landing userId={userId} userName={userName} userEmail={userEmail} userMobile={userMobile} /> :
                <Sprovider spId={spId} spSalonId={spSalonId} setSpSalonId={setSpSalonId} />
            }
        </>
    );
}

export default Home;
