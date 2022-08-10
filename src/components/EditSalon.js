import * as React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Lang, useFormInputValidation } from "react-form-input-validation";
import "./Form.css";

export default function EditSalon(props) {
  const { spSalonId, onClose } = props
  console.log('edit props', props)
  const [salonData, setSalonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salonId, setSalonId] = useState(0)

  const [image, setImage] = useState('')
  console.log('SalonDat', salonData)
  // const [formData, updateFormData] = useState(salonData)
  const salonUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/salons/${spSalonId}` : `http://localhost:3001/salons/${spSalonId}`

  const userSalonUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/salons/${spSalonId}` : `http://localhost:3001/salons/${spSalonId}`
  // const salonurl = `https://groomserver.herokuapp.com/salons/${props.salonId}`;
  // const userSalonUrl = `https://groomserver.herokuapp.com/salons/${props.salonId}`;

  useEffect(() => {
    const getUserSalon = async () => {
      try {
        const response = await axios.get(
          userSalonUrl
        );
        setSalonData(response.data);
        console.log('respd', response.data)
        setSalonId(response.data.id)
        console.log('salon id', salonId)
        setError(null);
      } catch (err) {
        console.log('e', err.message)
        setError(err.message);
        setSalonData(null);
      } finally {
        setLoading(false);
      }
    }

    getUserSalon()
  }, [])


  const [fields, errors, form] = useFormInputValidation(
    {
      // customer_name: "",
      // email: "",
      // password: "",
      // password_confirmation: "",
      // firstName: "",
      // lastName: "",
      // gender: "",
      // mobile: "",
      // dob: "",

      email: salonData.email,
      name: salonData.name,
      address1: salonData.address1,
      address2: salonData.address2,
      pincode: salonData.pincode,
      city: salonData.city,
      landline: salonData.landline,
      mobile: salonData.mobile,
      gstin: salonData.gstin,
      pan: salonData.pan,
      chairs: salonData.chairs,
      opens: salonData.opens,
      closes: salonData.closes,
      weekday: salonData.weekday,
      // image: ""


    },
    {
      // password: "required",
      // password_confirmation: "required|same:password",
      // firstName: "required",
      // lastName: "required",
      // dob: "required|date",
      // mobile: "required|numeric|digits:10",
      // gender: "required",
      email: "required|email",
      name: "required",
      address1: "required",
      address2: "required",
      pincode: "required|digits:6",
      city: "required",
      landline: "",
      mobile: "required|digits:10",
      gstin: "required|alpha_num:15",
      pan: "required|alpha_num:10",
      chairs: "required",
      opens: "required",
      closes: "required",
      weekday: "required",
      // image: "required"
    }
  );



  const onImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSalonData({ ...salonData, [name]: value });
  }

  const updateSalonDetails = async (event) => {
    event.preventDefault();

    const isValid = await form.validate(event);
    if (isValid) {
      console.log("MAKE AN API CALL", fields, errors);
    }
    console.log('isvalid', isValid)

    const formData = new FormData();
    formData.append('name', fields.name ? fields.name : salonData.name)
    formData.append('email', fields.email ? fields.email : salonData.email)
    formData.append('address1', fields.address1 ? fields.address1 : salonData.address1)
    formData.append('address2', fields.address2 ? fields.address2 : salonData.address2)
    formData.append('pincode', fields.pincode ? fields.pincode : salonData.pincode)
    formData.append('city', fields.city ? fields.city : salonData.city)
    formData.append('landline', fields.landline ? fields.landline : salonData.landline)
    formData.append('mobile', fields.mobile ? fields.mobile : salonData.mobile)
    formData.append('gstin', fields.gstin ? fields.gstin : salonData.gstin)
    formData.append('pan', fields.pan ? fields.pan : salonData.pan)
    formData.append('chairs', fields.chairs ? fields.chairs : salonData.chairs)
    // formData.append('user_id', spId)
    formData.append('weekday', fields.weekday ? fields.weekday : salonData.weekday)
    formData.append('opens', fields.opens ? fields.opens : salonData.opens)
    formData.append('closes', fields.closes ? fields.closes : salonData.closes)
    if (image)
      formData.append('image', image)
    console.log('salonDaqta', formData)
    const jwt = localStorage.getItem('token');

    axios.put(salonUrl, formData)
      .then(res => {
        console.log('upd', res.data)
        alert('Salon Details updated successfully')
        onclose()
      });

  }

  const [showServices, setShowServices] = useState(true)

  const closeChild = () => {
    setShowServices(false)
  };
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <SpaOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Your Salon Details
            </Typography>

          </Box>

        </Container>
      </ThemeProvider >
      <form
        className="myForm container"
        noValidate
        autoComplete="on"
        onSubmit={updateSalonDetails}
      >

        <p>
          <label>
            Name of the Salon
            <input
              type="text"
              name="name"

              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.name ? fields.name : salonData.name}
            />
          </label>
          <label className="error">
            {errors.name ? errors.name : ""}
          </label>
        </p>

        <p>
          <label>
            Email
            <input
              type="email"
              name="email"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.email ? fields.email : salonData.email}
            />
          </label>
          <label className="error">
            {errors.email ? errors.email : ""}
          </label>
        </p>

        <p>
          <label>
            Address 1
            <input
              type="text"
              name="address1"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.address1 ? fields.address1 : salonData.address1}
            />
          </label>
          <label className="error">
            {errors.address1 ? errors.address1 : ""}
          </label>
        </p>

        <p>
          <label>
            Address 2
            <input
              type="text"
              name="address2"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.address2 ? fields.address2 : salonData.address2}
            />
          </label>
          <label className="error">
            {errors.address2 ? errors.address2 : ""}
          </label>
        </p>

        <p>
          <label>
            Pincode
            <input
              type="number"
              name="pincode"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.pincode ? fields.pincode : salonData.pincode}
            />
          </label>
          <label className="error">
            {errors.pincode ? errors.pincode : ""}
          </label>
        </p>

        <p>
          <label>
            City
            <input
              type="text"
              name="city"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.city ? fields.city : salonData.city}
            />
          </label>
          <label className="error">
            {errors.city ? errors.city : ""}
          </label>
        </p>


        <p>
          <label>
            Land Line (with STD )
            <input
              type="number"
              name="landline"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.landline ? fields.landline : salonData.landline}
            />
          </label>
          <label className="error">
            {/* {errors.landline ? errors.landline : ""} */}
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
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.mobile ? fields.mobile : salonData.mobile}
            />
          </label>
          <label className="error">
            {errors.mobile ? errors.mobile : ""}
          </label>
        </p>
        <p>
          <label>
            GST (15 dig)
            <input
              type="text"
              name="gstin"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.gstin ? fields.gstin : salonData.gstin}
            />
          </label>
          <label className="error">
            {errors.gstin ? errors.gstin : ""}
          </label>
        </p>

        <p>
          <label>
            PAN (10 dig)
            <input
              type="text"
              name="pan"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.pan ? fields.pan : salonData.pan}
            />
          </label>
          <label className="error">
            {errors.pan ? errors.pan : ""}
          </label>
        </p>

        <p>
          <label>
            Chairs
            <input
              type="number"
              name="chairs"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.chairs ? fields.chairs : salonData.chairs}
            />
          </label>
          <label className="error">
            {errors.chairs ? errors.chairs : ""}
          </label>
        </p>
        <p>
          <label>
            Opens
            <input
              type="time"
              name="opens"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.opens ? fields.opens : salonData.opens}
            />
          </label>
          <label className="error">
            {errors.opens ? errors.opens : ""}
          </label>
        </p>

        <p>
          <label>
            Closes
            <input
              type="time"
              name="closes"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              // onBlur={form.handleBlurEvent}
              // onChange={handleInputChange}
              value={fields.closes ? fields.closes : salonData.closes}
            />
          </label>
          <label className="error">
            {errors.closes ? errors.closes : ""}
          </label>
        </p>

        <p>
          <label>
            Weekly Holiday
            <select
              id="weekday"
              name="weekday"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              value={fields.weekday ? fields.weekday : salonData.weekday}
            // onChange={handleInputChange}
            // onBlur={form.handleBlurEvent}
            >
              <option value="">Select</option>
              <option value={1}>Sunday</option>
              <option value={2}>Monday</option>
              <option value={3}>Tuesday</option>
              <option value={4}>Wednesday</option>
              <option value={5}>Thursday</option>
              <option value={6}>Friday</option>
              <option value={7}>Saturday</option>
            </select>
          </label>
          <label className="error">
            {errors.weekday ? errors.weekday : ""}
          </label>
        </p>
        <p>
          <label>
            Image Upload
            <input type="file"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
            />
          </label>
          {/* <label className="error">
            {errors.closes ? errors.closes : ""}
          </label> */}
        </p>
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={updateSalonDetails}
        >
          Update Salon
        </Button> */}
        <p>
          <button type="submit"
            // disabled={salonsBtn}
            onClick={updateSalonDetails}
          >
            Update Salon  </button>
        </p>

        <p>
          <button
            type="submit"
            onClick={onClose}
          >
            Exit
          </button>
        </p>
      </form>
    </>
  )
}

{/* <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  // disabled
                  fullWidth
                  id="name"
                  label="Name of the Salon"
                  name="name"
                  value={salonData.name}
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // disabled
                  fullWidth
                  id="email"
                  label="Email of the Salon"
                  name="email"
                  value={salonData.email}
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address1"
                  label="Salon Address1"
                  name="address1"
                  value={salonData.address1}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address2"
                  name="address2"
                  label="Salon Address2"
                  value={salonData.address2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  name="pincode"
                  value={salonData.pincode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  value={salonData.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="landline"
                  name="landline"
                  value={salonData.landline}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  value={salonData.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gstin"
                  name="gstin"
                  value={salonData.gstin}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pan"
                  name="pan"
                  value={salonData.pan}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="chairs"
                  name="chairs"
                  value={salonData.chairs}
                  onChange={handleInputChange}
                />
              </Grid>

            </Grid>
            <Button
              // disabled={salonsBtn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={updateSalonDetails}
            >
              Update Salon
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={props.onClose}

            >
              Exit
            </Button>
          </Box> */}