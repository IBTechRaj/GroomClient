import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'

import { useHistory } from "react-router-dom";

const PasswordReset = () => {

    const baseURL = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/` : `http://localhost:3001/`

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
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

    const handleSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            token: token,
            email: email,
            password: password
        }
        if (password !== passwordConfirmation) {
            alert("Passwords don't match");

        } else {
            fetch(`${baseURL}/reset_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('pr', data)
                    if (data.status === 'ok') {
                        alert('Password Reset Successful!')
                    } else {
                        alert('There is some error. Pl contact customer care')

                    }
                    history.push('/')
                })
                .catch(console.log)
        }

    }
    return (
        <>
            <h1 className='text-center py-3'>Reset Password:</h1>
            {/* <Center> */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* <label for="token" >Token:</label> */}
                    <input
                        className="form-control py-2"
                        required id="token"
                        onChange={event => {
                            setToken(event.target.value)
                        }}
                        name="token"
                        placeholder="Token"
                        type="token"
                        value={token} />
                    <p>The code that was emailed to you. This is case-sensitive.</p>
                    {/* <label for="email">Email:</label> */}
                    <input
                        className="form-control py-2" required id="email" onChange={event => {
                            setEmail(event.target.value)
                        }} name="email" placeholder="Email" type="email" value={email} />
                    {/* <label for="password">New password:</label> */}
                    <input
                        className="form-control py-2" required id="password" onChange={event => {
                            setPassword(event.target.value)
                        }}
                        name="password" placeholder="New Password" type="password" value={password} />
                    {/* <p>Set your new password here.</p> */}
                    {/* <label for="password_confirmation">Confirm new password:</label> */}
                    <input
                        className="form-control py-2" required id="password_confirmation" onChange={event => {
                            setPasswordConfirmation(event.target.value)
                        }} name="password_confirmation" placeholder="New Password confirmation" type="password" value={passwordConfirmation} />
                    <input className="text-center btn btn-primary" type="submit" />
                    {/* <button type="secondary">Reset Password</button> */}
                </form>
            </div>
            {/* </Center> */}
        </>
    )
}

export default PasswordReset