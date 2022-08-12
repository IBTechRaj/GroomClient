import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


import clsx from "clsx";
import styles from "./LoginForm.module.css";
import { useLoginFormValidator } from "./hooks/useLoginFormValidator";
// import LoginForm from './LoginForm';

const Navbar = ({ loggedIn, setLoggedIn, userId, setUserId, userName, setUserName, userEmail, setUserEmail, userMobile, setUserMobile }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);
  // const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  // const [errors, setErrors] = useState({
  //   email: {
  //     dirty: false,
  //     error: false,
  //     message: "",
  //   },
  //   password: {
  //     dirty: false,
  //     error: false,
  //     message: "",
  //   },
  //   confirmPassword: {
  //     dirty: false,
  //     error: false,
  //     message: "",
  //   },
  // });

  // const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
  //   let isValid = true;

  //   // Create a deep copy of the errors
  //   let nextErrors = JSON.parse(JSON.stringify(errors))

  //   // Force validate all the fields
  //   if (forceTouchErrors) {
  //     nextErrors = touchErrors(errors);
  //   }

  //   const { email, password, confirmPassword } = form;

  //   if (nextErrors.email.dirty && (field ? field === "email" : true)) {
  //     const emailMessage = emailValidator(email, form);
  //     nextErrors.email.error = !!emailMessage;
  //     nextErrors.email.message = emailMessage;
  //     if (!!emailMessage) isValid = false;
  //   }

  //   if (nextErrors.password.dirty && (field ? field === "password" : true)) {
  //     const passwordMessage = passwordValidator(password, form);
  //     nextErrors.password.error = !!passwordMessage;
  //     nextErrors.password.message = passwordMessage;
  //     if (!!passwordMessage) isValid = false;
  //   }

  //   if (
  //     nextErrors.confirmPassword.dirty &&
  //     (field ? field === "confirmPassword" : true)
  //   ) {
  //     const confirmPasswordMessage = confirmPasswordValidator(
  //       confirmPassword,
  //       form
  //     );
  //     nextErrors.confirmPassword.error = !!confirmPasswordMessage;
  //     nextErrors.confirmPassword.message = confirmPasswordMessage;
  //     if (!!confirmPasswordMessage) isValid = false;
  //   }

  //   setErrors(nextErrors);

  //   return {
  //     isValid,
  //     errors: nextErrors,
  //   };
  // };

  // const onBlurField = e => {
  //   const field = e.target.name;
  //   const fieldError = errors[field];
  //   if (fieldError.dirty) return;

  //   const updatedErrors = {
  //     ...errors,
  //     [field]: {
  //       ...errors[field],
  //       dirty: true,
  //     },
  //   };

  //   validateForm({ form, field, errors: updatedErrors });
  // };
  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  // const onSubmitForm = e => {
  //   e.preventDefault();
  //   const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
  //   if (!isValid) return;
  //   alert(JSON.stringify(form, null, 2));
  // };


  const onOpenLoginModal = () => {
    setOpenLogin(true);

  }
  const onCloseLoginModal = () => setOpenLogin(false);
  const onOpenSignupModal = () => {
    setOpenSignup(true)

  }
  const onCloseSignupModal = () => setOpenSignup(false);
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [passwordConfirmation, setPasswordConfirmation] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [gender, setGender] = useState(0)
  // const [mobile, setMobile] = useState('')
  // const [dob, setDob] = useState('')


  const signupData = {
    "email": form.email,
    "password": form.password,
    "first_name": form.firstName,
    "last_name": form.lastName,
    "gender": parseInt(form.gender),
    "mobile": form.mobile,
    "date_of_birth": form.dob,
    "usertype": 0
  }

  const handleSubmitSignup = async (event) => {
    event.preventDefault();


    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    console.log('isvalid', isValid)
    if (!isValid) return;
    // alert(JSON.stringify(form, null, 2));

    if (form.password === form.confirmPassword) {
      const emailData = {
        "subject": 'Client Registration Success!',
        "name": form.firstName,
        "email": form.email,
        "message":
          "Dear " + form.firstName
          + ",\n\n"
          + "Thank you for registering with GroomWell Services. Now you can login and choose from a large number of salons or services\n"
          + "For any queries please call Customer Care."
          + "\n\n"
          + "Team GroomWell"
      }
      console.log('signing up', signupData)
      const signUpUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/signup` : `http://localhost:3001/signup`
      fetch(signUpUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
            gender: parseInt(form.gender),
            mobile: form.mobile,
            date_of_birth: form.dob,
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
            alert('Problem signing up')
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
          const contactsUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/contacts`
            : `http://localhost:3001/contacts`

          try {
            const res = axios.post(contactsUrl, emailData, { headers: { Authorization: `Bearer ${jwt}` } });
            console.log('res', res);
          }
          catch (error) {
            console.log('oh, no', error);
          }

        })
        .catch((err) => console.log(err));
    }
    else {
      console.log('Passwords should match')
    }
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();


    // const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    // console.log('isvalid', isValid)
    // if (!isValid) return;
    // alert(JSON.stringify(form, null, 2));


    console.log('logging', (process.env.REACT_APP_SERVER))
    const loginUrl = (process.env.REACT_APP_SERVER ? `https://groomserver.herokuapp.com/login` : `http://localhost:3001/login`)
    console.log('url', loginUrl)
    fetch(loginUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: form.email,
          password: form.password,
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
      .catch((err) => alert(err));
  }

  const handleLogout = () => {
    const logoutUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/logout`
      : `http://localhost:3001/logout`
    fetch(logoutUrl, {
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
                {/* <Link
                  to='/services'
                  className='nav-links'
                  style={{ color: 'black' }}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link> */}
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
        <form className={styles.form} onSubmit={handleSubmitLogin}>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.email.dirty && errors.email.error && styles.formFieldError
              )}
              type="text"
              aria-label="Email field"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
              <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.password.dirty &&
                errors.password.error &&
                styles.formFieldError
              )}
              type="password"
              aria-label="Password field"
              name="password"
              placeholder="Password (Min 6 chars)"
              value={form.password}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.password.dirty && errors.password.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className={styles.formActions}>
            <button className={styles.formSubmitBtn} type="submit">
              Login
            </button>
          </div>
        </form>
        {/* ); */}
        {/* <LoginForm /> */}
        {/* <label className="justify-left w-100 px-5">
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
          </label> */}

        {/* </form> */}
      </Modal>
      <Modal open={openSignup} onClose={onCloseSignupModal} centre>
        <h2>Signup</h2>
        <form className={styles.form} onSubmit={handleSubmitSignup}>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.email.dirty && errors.email.error && styles.formFieldError
              )}
              type="text"
              aria-label="Email field"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
              <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.password.dirty &&
                errors.password.error &&
                styles.formFieldError
              )}
              type="password"
              aria-label="Password field"
              name="password"
              placeholder="Password (Min 6 chars)"
              value={form.password}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.password.dirty && errors.password.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.confirmPassword.dirty &&
                errors.confirmPassword.error &&
                styles.formFieldError
              )}
              type="password"
              aria-label="Confirm password field"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={form.confirmPassword}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            {/* <label className={styles.formLabel}>Confirm Password</label> */}
            <input
              className={clsx(
                styles.formField,
                errors.firstName.dirty &&
                errors.firstName.error &&
                styles.formFieldError
              )}
              type="text"
              aria-label="First Name field"
              name="firstName"
              placeholder='First Name'
              value={form.firstName}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.firstName.dirty && errors.firstName.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.firstName.message}
              </p>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            {/* <label className={styles.formLabel}>Confirm Password</label> */}
            <input
              className={clsx(
                styles.formField,
                errors.lastName.dirty &&
                errors.lastName.error &&
                styles.formFieldError
              )}
              type="text"
              aria-label="Last name field"
              name="lastName"
              placeholder='Last Name'
              value={form.lastName}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.lastName.dirty && errors.lastName.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.lastName.message}
              </p>
            ) : null}
          </div>


          {/* <label className="justify-left w-100 px-5">

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
            /> */}
          {/* First Name
            <input
              className="form-control"
              placeholder="First Name"
              type="string"
            name="firstName"
            value={firstName}
              onChange={event => {
                setFirstName(event.target.value)
              }}
            />
            Last Name
            <input
              className="form-control"
              placeholder="Last Name"
              type="string"
              name="lastName"
            value={lastName}
              onChange={event => {
                setLastName(event.target.value)
              }}
            /> */}
          Gender
          <label>
            {/* Your Gender: */}
            <select
              className={clsx(
                styles.formField,
                errors.gender.dirty &&
                errors.gender.error &&
                styles.formFieldError
              )}
              // value={gender} onChange={event => {
              //   setGender(parseInt(event.target.value))
              // }}
              type="number"
              aria-label="gender field"
              name="gender"
              placeholder='Gender'
              value={form.gender}
              onChange={onUpdateField}
              onBlur={onBlurField}
            >
              <option value="" >Select</option>
              <option value="0" >She</option>
              <option value="1" >He</option>
              <option value="2" >Others</option>
            </select>
            {errors.gender.dirty && errors.gender.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.gender.message}
              </p>
            ) : null}
          </label>
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.dob.dirty &&
                errors.dob.error &&
                styles.formFieldError
              )}
              type="date"
              aria-label="Dob field"
              name="dob"
              placeholder='Dob'
              value={form.dob}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.dob.dirty && errors.dob.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.dob.message}
              </p>
            ) : null}
          </div>
          {/* Date of Birth
            <input
              className="form-control"
              placeholder="Date of Birth"
              type="date"
              name="dob"
              value={dob}
              onChange={event => {
                setDob(event.target.value)
              }}
          /> */}
          <div className={styles.formGroup}>
            <input
              className={clsx(
                styles.formField,
                errors.mobile.dirty &&
                errors.mobile.error &&
                styles.formFieldError
              )}
              type="number"
              aria-label="Mobile field"
              name="mobile"
              placeholder='Mobile'
              value={form.mobile}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.mobile.dirty && errors.mobile.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.mobile.message}
              </p>
            ) : null}
          </div>
          {/* Mobile
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
          </label> */}

          {/* <label className="justify-left w-100 px-5">
            {' '}
            <input className="w-100 btn btn-custom" type="submit" />
          </label> */}
          <div className={styles.formActions}>
            <button className={styles.formSubmitBtn} type="submit">
              Sign Up
            </button>
          </div>
        </form >
      </Modal >

    </>
  );
}

export default Navbar;



