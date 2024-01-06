import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { HashLink as Link } from 'react-router-hash-link';
// import PasswordReset from './PasswordReset'

const PrivacyPolicy = () => {

    const [forgotEmail, setForgotEmail] = useState('')
    const emdata = {
        email: forgotEmail
    }
    let history = useHistory()
    function Center({ children }) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                }}
            >
                {children}
            </div>
        );
    }

    // const handleSubmitForgotPassword = async (event) => {
    //     event.preventDefault();
    //     const forgotUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/forgot_password` : `http://localhost:3001/forgot_password`



    //     try {
    //         fetch(forgotUrl, {
    //             method: "post",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(emdata)
    //         })
    //             .then((res) => {
    //                 if (res.status == 200) {
    //                     alert('Password reset link sent to your email');
    //                     history.push('/')

    //                     return res.json();
    //                 } else {
    //                     alert('We could not find this email in our system');
    //                     history.push('/')
    //                     throw new Error(res);
    //                 }

    //             })
    //             .then((data) => {
    //             })
    //             .then((json) => console.dir(json))
    //     }
    //     catch (error) {
    //     }
    // }

    return (
        <>

            <h1 className='text-center'>PrivacyPolicy for Motorwash app</h1>
            {/* <Center> */}
            <Row>
                <div>  <p>   This Application collects some Personal Data from its Users.</p></div>
            </Row>

            <Row>
                <div>
                    <p>Owner and Data Controller</p>
                    <p> Rajasekhar Katakamsetty</p >
                    <p>Goutham Nagar</p >
                    <p> Malkajgiri</p>
                    <p> Secunderabad 500047</p >
                    <p>India</p >
                </div>
            </Row>
            <Row>
                <div>  <p>  Owner contact email: krs30018 @gmail.com</p></div>
            </Row>
            <div>       <p> </p ></div >
            <Row>
                <div>  <p>   Types of Data collected</p>
                    <p>Name, Email, Mobile Number, Address where the vehicle can be serviced</p></div>
            </Row>

            <Row>
                <div>  <p>   Mode and place of processing the Data</p></div>
            </Row>
            <Row>
                <div>  <p>     Methods of processing</p></div>
            </Row> <Row>
                <div>  <p>     The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
                    The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.
                </p></div>
            </Row> <Row>
                <div>  <p>      Place</p></div>
            </Row> <Row>
                <div>  <p>    The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.

                </p></div>
            </Row> <Row>
                <div>  <p>     Retention time</p></div>
            </Row> <Row>
                <div>  <p>       Unless specified otherwise in this document, Personal Data shall be processed and stored for as long as required by the purpose they have been collected for and may be retained for longer due to applicable legal obligation or based on the Users’ consent.
                </p></div>
            </Row>








            {/* </Center> */}



        </>
    )
}

export default PrivacyPolicy