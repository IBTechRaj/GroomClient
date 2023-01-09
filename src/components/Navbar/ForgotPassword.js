import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { HashLink as Link } from 'react-router-hash-link';
// import PasswordReset from './PasswordReset'

const ForgotPassword = () => {

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

    const handleSubmitForgotPassword = async (event) => {
        event.preventDefault();
        const forgotUrl = (process.env.REACT_APP_SERVER) ? `https://motorwash-backend-lfxt.onrender.com/forgot_password` : `http://localhost:3001/forgot_password`

        console.log('forgot 1', forgotUrl)

        try {
            fetch(forgotUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emdata)
            })
                .then((res) => {
                    if (res.status == 200) {
                        console.log("forgot email posted", res)
                        alert('Password reset link sent to your email');
                        history.push('/')

                        return res.json();
                    } else {
                        alert('We could not find this email in our system');
                        history.push('/')
                        throw new Error(res);
                    }

                })
                .then((data) => {
                    console.log('d', data)
                })
                .then((json) => console.dir(json))
        }
        catch (error) {
            console.log('Err: ', error);
        }
    }

    return (
        <>

            <h1 className='text-center'>Forgot Password</h1>
            <Center>
                <form onSubmit={handleSubmitForgotPassword} className='d-flex align-content-center'>
                    <br /><br />
                    <label className='px-5'>
                        <input
                            className="form-control"
                            placeholder="Email"
                            type="text"
                            name="forgotEmail"
                            value={forgotEmail}
                            onChange={event => {
                                setForgotEmail(event.target.value)
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        {' '}
                        <input className="text-center btn btn-primary" type="submit" />
                    </label>
                </form>
            </Center>

            <p className='px-5'>We shall send Reset Password Link to this email if it is valid.

                After you receive the reset link, click here to < Link
                    to='/PasswordReset'
                    color='black'
                >
                    Reset Password</Link > .</p>

        </>
    )
}

export default ForgotPassword