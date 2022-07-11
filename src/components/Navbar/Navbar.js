import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const Navbar = ({ loggedIn, setLoggedIn, userId, setUserId, userName, setUserName, userEmail, setUserEmail, userMobile, setUserMobile }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const onOpenLoginModal = () => {
    setOpenLogin(true);

  }
  const onCloseLoginModal = () => setOpenLogin(false);
  const onOpenSignupModal = () => {
    setOpenSignup(true)

  }
  const onCloseSignupModal = () => setOpenSignup(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState(0)
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')


  const signupData = {
    "email": email,
    "password": password,
    "first_name": firstname,
    "last_name": lastname,
    "gender": gender,
    "mobile": mobile,
    "date_of_birth": dob,
    "usertype": 0
  }

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      const emailData = {
        "subject": 'Client Registration Success!',
        "name": firstname,
        "email": email,
        "message":
          "Dear " + firstname
          + ",\n\n"
          + "Thank you for registering with GroomWell Services. Now you can login and choose from a large number of salons or services\n"
          + "For any queries please call Customer Care."
          + "\n\n"
          + "Team GroomWell"
      }
      console.log('signing up', signupData)
      fetch("http://localhost:3001/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            first_name: firstname,
            last_name: lastname,
            gender: gender,
            mobile: mobile,
            date_of_birth: dob,
            usertype: 0
          },
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log('signedUp', res)
            console.log(res.headers.get("Authorization"));
            localStorage.setItem("token", res.headers.get("Authorization"));
            setLoggedIn(true);
            onCloseSignupModal()

            return res.json();
          } else {
            console.log('Error signup')
            onCloseSignupModal()
            throw new Error(res);
          }
        })
        .then((data) => {
          setUserId(data.data.id)
          console.log('userId', userId)
          setUserName(data.data.first_name)
          setUserEmail(data.data.email)
          setUserMobile(data.data.mobile)
        })
        .then((json) => console.dir(json))
        .then(() => {
          // console.log('md', signupData);
          const jwt = localStorage.getItem('token')
          const url = 'http://localhost:3001/contacts'

          try {
            const res = axios.post(url, emailData, { headers: { Authorization: `Bearer ${jwt}` } });
            console.log('res', res);
          }
          catch (error) {
            console.log('oh, no', error);
          }

        })
        .catch((err) => console.error(err));
    }
    else {
      console.log('Passwords should match')
    }
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log('logging')

    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.headers.get("Authorization"));
          localStorage.setItem("token", res.headers.get("Authorization"));
          setLoggedIn(true);
          onCloseLoginModal()
          return res.json();
        } else {
          return res.text().then((text) => Promise.reject(text));
        }
      })
      .then((data) => {
        setUserId(data.data.id)
        setUserName(data.data.first_name)
        setUserEmail(data.data.email)
        setUserMobile(data.data.mobile)
        console.log('logn', data.data)
        // let cur_user_id= data.data.id
        let cur_user_type = data.data.usertype
        let cur_user_name = data.data.first_name
        console.log(' type, name', cur_user_type, cur_user_name)
        if (cur_user_type === 'sprovider') {
          alert('It seems you are registered as Service Provider. To avail booking services, please register as Client or Call Customer Care')
          setLoggedIn(false)
        }

      })
      .then((json) => console.dir(json))
      .catch((err) => console.error(err));
  }

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log('lo', res)
        if (res.ok) {
          setLoggedIn(false)
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((json) => {
        console.dir(json);
      })
      .catch((err) => console.error(err));
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(!button);
    } else {
      setButton(!button);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return (
      window.removeEventListener('resize', showButton)
    )
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img src="assets/SeekPng.com_group-silhouette-png_508662.png" alt="NoImg" style={{ width: 50, height: 50 }} />
              <p style={{ fontSize: 30, fontWeight: 900, color: '#9d55e6' }}>GroomWell</p>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>


              <li className='nav-item'>
                <Link to='/' className='nav-links' style={{ color: 'black' }} onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/services'
                  className='nav-links'
                  style={{ color: 'black' }}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              {(loggedIn) ? (
                <li>
                  <button className='nav-links' style={{ backgroundColor: '#fff', border: 'none', color: 'black' }} onClick={handleLogout}>Logout</button>
                </li>
              )
                : (
                  <li>
                    <button className='nav-links' style={{ backgroundColor: '#fff', border: 'none', color: 'black' }} onClick={onOpenLoginModal}>Login</button>
                  </li>
                )
              }
              <li>
                <button className='nav-links' style={{ backgroundColor: '#fff', border: 'none', color: 'black' }} onClick={onOpenSignupModal}>Signup</button>
              </li>
            </ul>

          </div>
        </nav>
      </IconContext.Provider>
      <Modal open={openLogin} onClose={onCloseLoginModal} centre>
        <h2>Login</h2>
        <form onSubmit={handleSubmitLogin}>
          <label className="justify-left w-100 px-5">
            <input
              className="form-control"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
            <br />
            <input
              className="form-control"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
          </label>
          <br /><br />
          <label className="justify-left w-100 px-5">
            {' '}
            <input className="w-100 btn btn-custom" type="submit" />
          </label>

        </form>
      </Modal>
      <Modal open={openSignup} onClose={onCloseSignupModal} centre>
        <h2>Signup</h2>
        <form onSubmit={handleSubmitSignup}>
          <label className="justify-left w-100 px-5">

            Email
            <input
              className="form-control"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
            Password
            <input
              className="form-control"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
            Confirm Password
            <input
              className="form-control"
              placeholder="password confirmation"
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={event => {
                setPasswordConfirmation(event.target.value)
              }}
            />
            First Name
            <input
              className="form-control"
              placeholder="First Name"
              type="string"
              name="firstname"
              value={firstname}
              onChange={event => {
                setFirstname(event.target.value)
              }}
            />
            Last Name
            <input
              className="form-control"
              placeholder="Last Name"
              type="string"
              name="lastName"
              value={lastname}
              onChange={event => {
                setLastname(event.target.value)
              }}
            />
            Gender
            <label>
              Your Gender:
              <select value={gender} onChange={event => {
                setGender(parseInt(event.target.value))
              }}
              >
                <option value="0" >She</option>
                <option value="1" >He</option>
                <option value="2" >Others</option>
              </select>
            </label>

            Date of Birth
            <input
              className="form-control"
              placeholder="Date of Birth"
              type="date"
              name="dob"
              value={dob}
              onChange={event => {
                setDob(event.target.value)
              }}
            />
            Mobile
            <input
              className="form-control"
              placeholder="Mobile"
              type="string"
              name="mopbile"
              value={mobile}
              onChange={event => {
                setMobile(event.target.value)
              }}
            />
          </label>

          <label className="justify-left w-100 px-5">
            {' '}
            <input className="w-100 btn btn-custom" type="submit" />
          </label>
        </form >
      </Modal >

    </>
  );
}

export default Navbar;



