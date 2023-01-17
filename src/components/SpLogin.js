// Form Validation Library : https://www.npmjs.com/package/react-form-input-validation
// https://www.npmjs.com/package/validatorjs
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { Lang, useFormInputValidation } from "react-form-input-validation";
import "./Form.css";

function SpLogin(props) {
  const { spLoggedIn, setSpLoggedIn, setClient, setSpId, setSpSalonId } = props

  // console.log('spLoginProps', props)
  const jwt = localStorage.getItem('token');


  const [fields, errors, form] = useFormInputValidation(
    {
      // customer_name: "",
      email_address: "",
      password: "",
      password_confirmation: "",
      firstName: "",
      lastName: "",
      gender: "",
      mobile: "",
      dob: "",

    },
    {
      email_address: "required|email",
      password: "required",
      password_confirmation: "required|same:password",
      firstName: "required",
      lastName: "required",
      dob: "required|date",
      mobile: "required|numeric|digits:10",
      gender: "required",
    }
  );

  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    if (isValid) {
      // console.log("MAKE AN API CALL", fields, errors);
    }
  };



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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState(0)
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')

  const signupData = {
    "email": fields.email_address,
    "password": fields.password,
    "first_name": fields.firstName,
    "last_name": fields.lastName,
    "gender": fields.gender,
    "mobile": fields.mobile,
    "date_of_birth": fields.dob,
    "usertype": 1

  }

  const handleSubmitSpSignup = async (event) => {
    event.preventDefault();
    const isValid = await form.validate(event);
    if (isValid) {
      // console.log("MAKE AN API CALL", fields, errors);
    }
    if (password === passwordConfirmation) {
      const emailData = {
        "subject": 'Service Provider Registration Success!',
        "name": firstName,
        "email": email,
        "message":
          "Dear " +
          firstName +
          ",\n\n" +
          "Thank you for registering with GroomWell Services. Now you can login and fill the details of your Salon and Services\n"
          + "For any queries please call Customer Care." +
          "\n\n" +
          "Team GroomWell"
      }

      // console.log('Sp signing up', signupData)
      const signUpUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/signup` : `http://localhost:3001/signup`
      // fetch("https://groomserver.herokuapp.com/signup", {
      fetch(signUpUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: fields.email_address,
            password: fields.password,
            first_name: fields.firstName,
            last_name: fields.lastName,
            gender: parseInt(fields.gender),
            mobile: fields.mobile,
            date_of_birth: fields.dob,
            usertype: 1
          },
        }),
      })
        .then((res) => {
          if (res.ok) {
            // console.log('res ok', res)
            // console.log(res.headers.get("Authorization"));
            localStorage.setItem("token", res.headers.get("Authorization"));
            setSpLoggedIn(true);
            onCloseSpSignupModal()
            setClient(false)
            return res.json();
          } else {
            // console.log('res err', res)
            onCloseSpSignupModal()
            throw new Error(res);
          }
        })
        .then((data) => {
          // console.log('d', data)

          let cur_user_salon_id = data.data.salon_ids[0]
          let cur_user_type = data.data.usertype
          setSpSalonId(cur_user_salon_id)
          let cur_user_id = data.data.id

          // console.log('id,type,salon', cur_user_id, cur_user_type, cur_user_salon_id)
          // console.log('spId', cur_user_id)
          setSpId(cur_user_id)
          // console.log('sp md', signupData);
          const jwt = localStorage.getItem('token')
          const contactsUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/contacts` : `http://localhost:3001/contacts`


          try {
            const res = axios.post(contactsUrl, emailData, { headers: { Authorization: `Bearer ${jwt}` } });
            // console.log('res', res);
          }
          catch (error) {
            // console.log('oh, no', error);
          }
        })
        .catch((err) => console.error(err));
    }
    else {
      alert('Passwords should match')
    }
  }

  const handleSubmitSpLogin = async (event) => {
    event.preventDefault();
    // console.log('Sp logging')

    const loginUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/login` : `http://localhost:3001/login`
    fetch(loginUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: fields.email_address,
          password: fields.password,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          // console.log('token', res.headers.get("Authorization"))
          // console.log('res', res)
          localStorage.setItem("token", res.headers.get("Authorization"));
          setSpLoggedIn(true);
          setClient(false)
          onCloseSpLoginModal()
          return res.json();
        } else {
          // console.log('sp in err', res)
          onCloseSpLoginModal()
          return res.text().then((text) => Promise.reject(text));
        }
      })
      .then((data) => {
        // console.log('d d', data.data)
        let cur_user_salon_id = data.data.salon_ids[0]
        let cur_user_id = data.data.id
        let cur_user_type = data.data.usertype
        setSpId(cur_user_id)
        setSpSalonId(cur_user_salon_id)
        // console.log('id,type,salon', cur_user_id, cur_user_type, cur_user_salon_id)
        if (cur_user_type === 'client') {
          alert('It seems you are registered as Client. To offer your services, please register as Service Provider or Call Customer Care')
          setSpLoggedIn(false)
          setClient(true)
        }
      })
      .then((json) => console.dir(json))
      .catch((err) => alert(err));
  }

  const logoutUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/logout` : `http://localhost:3001/logout`

  const handleSpLogout = () => {
    fetch(logoutUrl, {
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
          <form
            className="myForm"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitSpLogin}
          >
            <p>
              <label>
                Email
                <input
                  type="email"
                  name="email_address"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.email_address}
                />
              </label>
              <label className="error">
                {errors.email_address ? errors.email_address : ""}
              </label>
            </p>
            <p>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.password}
                />
              </label>
              <label className="error">
                {errors.password ? errors.password : ""}
              </label>
            </p>

            <p>
              <button type="submit">Login</button>
            </p>
          </form>
        </Modal>

        <Modal open={openSpSignup} onClose={onCloseSpSignupModal} centre>
          <h2> Salon Owner Signup</h2>
          <form
            className="myForm"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitSpSignup}
          >
            <p>
              <label>
                Email
                <input
                  type="email"
                  name="email_address"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.email_address}
                />
              </label>
              <label className="error">
                {errors.email_address ? errors.email_address : ""}
              </label>
            </p>
            <p>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.password}
                />
              </label>
              <label className="error">
                {errors.password ? errors.password : ""}
              </label>
            </p>

            <p>
              <label>
                Confirm Password
                <input
                  type="password"
                  name="password_confirmation"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.password_confirmation}
                />
              </label>
              <label className="error">
                {errors.password_confirmation ? errors.password_confirmation : ""}
              </label>
            </p>

            <p>
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.firstName}
                />
              </label>
              <label className="error">
                {errors.firstName ? errors.firstName : ""}
              </label>
            </p>

            <p>
              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.lastName}
                />
              </label>
              <label className="error">
                {errors.lastName ? errors.lastName : ""}
              </label>
            </p>

            <p>
              <label>
                Gender
                <select
                  id="gender"
                  name="gender"
                  value={fields.gender}
                  onChange={form.handleChangeEvent}
                  onBlur={form.handleBlurEvent}
                >
                  <option value="">Select </option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                  <option value="2">Other</option>
                </select>
              </label>
              <label className="error">
                {errors.gender ? errors.gender : ""}
              </label>
            </p>

            <p>
              <label>
                Date of Birth
                <input
                  type="date"
                  name="dob"
                  onChange={form.handleChangeEvent}
                  onBlur={form.handleBlurEvent}
                  value={fields.dob}
                />
              </label>
              <label className="error">
                {errors.dob ? errors.dob : ""}
              </label>
            </p>

            <p>
              <label>
                Mobile
                <input
                  type="tel"
                  name="mobile"
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.mobile}
                />
              </label>
              <label className="error">
                {errors.mobile ? errors.mobile : ""}
              </label>
            </p>

            <p>
              <button type="submit">Signup</button>
            </p>
          </form>
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