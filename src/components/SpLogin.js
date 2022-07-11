// import React from 'react';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

function SpLogin(props) {
  const { spLoggedIn, setSpLoggedIn, client, setClient, spId, setSpId, spSalonId, setSpSalonId } = props
  const jwt = localStorage.getItem('token');
  const [click, setClick] = useState(false);
  const [openSpLogin, setOpenSpLogin] = useState(false);
  const [openSpSignup, setOpenSpSignup] = useState(false);

  const onOpenSpLoginModal = () => {
    setOpenSpLogin(true);
  }
  const onCloseSpLoginModal = () => setOpenSpLogin(false);
  const onOpenSpSignupModal = () => {
    setOpenSpSignup(true)
  }
  const onCloseSpSignupModal = () => setOpenSpSignup(false);

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
    "usertype": 1
  }

  const handleSubmitSpSignup = async (event) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      const emailData = {
        "subject": 'Service Provider Registration Success!',
        "name": firstname,
        "email": email,
        "message":
          "Dear " +
          firstname +
          ",\n\n" +
          "Thank you for registering with GroomWell Services. Now you can login and fill the details of your Salon and Services\n"
          + "For any queries please call Customer Care." +
          "\n\n" +
          "Team GroomWell"
      }

      console.log('Sp signing up', signupData)
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
            usertype: 1
          },
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log('res ok', res)
            console.log(res.headers.get("Authorization"));
            localStorage.setItem("token", res.headers.get("Authorization"));
            setSpLoggedIn(true);
            onCloseSpSignupModal()
            setClient(false)
            return res.json();
          } else {
            console.log('res err', res)
            onCloseSpSignupModal()
            throw new Error(res);
          }
        })
        .then((data) => {
          console.log('d', data)
          let cur_user_id = data.data.id
          console.log('spId', cur_user_id)
          setSpId(cur_user_id)
          console.log('sp md', signupData);
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

  const handleSubmitSpLogin = async (event) => {
    event.preventDefault();
    console.log('Sp logging')

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
          console.log('token', res.headers.get("Authorization"))
          console.log('res', res)
          localStorage.setItem("token", res.headers.get("Authorization"));
          setSpLoggedIn(true);
          setClient(false)
          onCloseSpLoginModal()
          return res.json();
        } else {
          console.log('sp in err', res)
          return res.text().then((text) => Promise.reject(text));
        }
      })
      .then((data) => {
        console.log('d d', data.data)
        let cur_user_salon_id = data.data.salon_ids[0]
        let cur_user_id = data.data.id
        let cur_user_type = data.data.usertype
        setSpId(cur_user_id)
        setSpSalonId(cur_user_salon_id)
        console.log('id,type,salon', cur_user_id, cur_user_type, cur_user_salon_id)
        if (cur_user_type === 'client') {
          alert('It seems you are registered as Client. To offer your services, please register as Service Provider or Call Customer Care')
          setSpLoggedIn(false)
        }
      })
      .then((json) => console.dir(json))
      .catch((err) => console.error(err));
  }

  const handleSpLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setSpLoggedIn(false)
          setClient(true)
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

  return (
    <>
      <div>
        <Modal open={openSpLogin} onClose={onCloseSpLoginModal} centre>
          <h2>Salon Owner Login</h2>
          <form onSubmit={handleSubmitSpLogin}>
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
        <Modal open={openSpSignup} onClose={onCloseSpSignupModal} centre>
          <h2> Salon Owner Signup</h2>
          <form onSubmit={handleSubmitSpSignup}>
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
        <Container className="container " >
          <Row className="row align-middle ">
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <p style={{ fontSize: 12, fontWeight: 800, marginRight: 10, marginTop: 20 }}> if you are a Service Provider, please login here or register your salon</p>
              {(spLoggedIn) ? (
                <li>
                  <button className='nav-links' style={{ color: 'red', border: 'none' }} onClick={handleSpLogout}>Logout</button>
                </li>
              )
                : (
                  <li>
                    <button className='nav-links' style={{ color: 'red', border: 'none' }} onClick={onOpenSpLoginModal}>Login</button>
                  </li>
                )
              }
              <li>
                <button className='nav-links' style={{ color: 'red', border: 'none' }} onClick={onOpenSpSignupModal}>Signup</button>
              </li>
            </ul>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default SpLogin