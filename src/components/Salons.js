import * as React from 'react';
import { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Lang, useFormInputValidation } from "react-form-input-validation";
import "./Form.css";

const theme = createTheme();

export default function Salons(props) {
  const { spId, spSalonId, setSpSalonId, onClose } = props
  // console.log('sln props', props)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [landline, setLandline] = useState("")
  const [mobile, setMobile] = useState("")
  const [gstin, setGstin] = useState("")
  const [pan, setPan] = useState("")
  const [chairs, setChairs] = useState("1")
  // const [salonId, setSalonId] = useState(0)
  const [salonsBtn, setSalonsBtn] = useState(false)
  const [holiday, setHoliday] = useState(1)
  const [opens, setOpens] = useState(0)
  const [closes, setCloses] = useState(0)
  const [image, setImage] = useState('')


  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    if (isValid) {
      // console.log("MAKE AN API CALL", fields, errors);
    }
    // console.log('isvalid', isValid)
  };


  const onImageChange = (event) => {
    setImage(event.target.files[0])
  }

  // const salon={
  //   name: name,
  //   address1: address1,
  //   address2: address2,
  //   pincode: pincode,
  //   city: city,
  //   landline: landline,
  //   mobile: mobile,
  //   gstin: gstin,
  //   pan: pan,
  //   chairs: chairs,
  //   weekday: holiday,
  //   opens: opens,
  //   closes: closes,
  //   user_id: props.spId,
  //   image: image,
  // }


  const [fields, errors, form] = useFormInputValidation(
    {
      // customer_name: "",
      email: "",
      // password: "",
      // password_confirmation: "",
      // firstName: "",
      // lastName: "",
      // gender: "",
      // dob: "",
      name: "",
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      landline: "",
      mobile: "",
      gst: "",
      pan: "",
      chairs: "",
      opens: "",
      closes: "",
      holiday: "",
      image: ""


    },
    {
      email: "required|email",
      // password: "required",
      // password_confirmation: "required|same:password",
      // firstName: "required",
      // lastName: "required",
      // dob: "required|date",
      // gender: "required",
      name: "required",
      address1: "required",
      address2: "required",
      pincode: "required|digits:6",
      city: "required",
      landline: "",
      mobile: "required|numeric|digits:10",
      gst: "required|alpha_num:15",
      pan: "required|alpha_num:10",
      chairs: "required",
      opens: "required",
      closes: "required",
      holiday: "required",
      image: "required"
    }
  );

  // const onSubmit = async (event) => {
  //   const isValid = await form.validate(event);
  //   if (isValid) {
  //     console.log("MAKE AN API CALL", fields, errors);
  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = await form.validate(event);
    if (isValid) {
      // console.log("MAKE AN API CALL", fields, errors);
    }
    // console.log('isvalid', isValid, errors)

    const formData = new FormData();
    formData.append('name', fields.name)
    formData.append('email', fields.email)
    formData.append('address1', fields.address1)
    formData.append('address2', fields.address2)
    formData.append('pincode', fields.pincode)
    formData.append('city', fields.city)
    formData.append('landline', fields.landline)
    formData.append('mobile', fields.mobile)
    formData.append('gstin', fields.gstin)
    formData.append('pan', fields.pan)
    formData.append('chairs', fields.chairs)
    formData.append('user_id', spId)
    formData.append('weekday', fields.holiday)
    formData.append('opens', fields.opens)
    formData.append('closes', fields.closes)
    formData.append('image', image)
    // console.log('salonDaqta', formData)
    const jwt = localStorage.getItem('token');

    const salonsUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/salons` : `http://localhost:3001/salons`

    fetch(salonsUrl, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Accept": "application/json"
      },
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log('res', res)
        setSpSalonId(res.id)
        // console.log('salon id', spSalonId)
        alert("Your Salon details uploaded successfully!")
        setSalonsBtn(!salonsBtn)

      })
      .catch((err) => alert(err));
  }

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
              Add Your Salon Details
            </Typography>
            {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>



              </Grid>
            </Box> */}
          </Box>
        </Container>
      </ThemeProvider>


      {/* <h2> Salon Owner Signup</h2> */}
      <form
        className="myForm container"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

        <p>
          <label>
            Name of the Salon
            <input
              type="text"
              name="name"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              value={fields.name}
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
              value={fields.email}
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
              value={fields.address1}
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
              value={fields.address2}
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
              value={fields.pincode}
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
              value={fields.city}
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
              value={fields.landline}
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
              value={fields.mobile}
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
              name="gst"
              onBlur={form.handleBlurEvent}
              onChange={form.handleChangeEvent}
              value={fields.gst}
            />
          </label>
          <label className="error">
            {errors.gst ? errors.gst : ""}
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
              value={fields.pan}
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
              value={fields.chairs}
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
              value={fields.opens}
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
              value={fields.closes}
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
              id="holiday"
              name="holiday"
              value={fields.holiday}
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
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
            {errors.holiday ? errors.holiday : ""}
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

        <p>
          <button type="submit"
            disabled={salonsBtn}
          >
            Submit Salon Details</button>
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

      {/* <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClose}
          >
            Exit
          </Button>
        </Box>
      </Container> */}
    </>
  );



}

{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name of the Salon"
                  value={name}
                  onChange={event => {
                    setName(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Salon Email"
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address1"
                  label="Salon Address1"
                  value={address1}
                  onChange={event => {
                    setAddress1(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address2"
                  label="Salon Address2"
                  value={address2}
                  onChange={event => {
                    setAddress2(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  label="Pin Code"
                  value={pincode}
                  onChange={event => {
                    setPincode(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={city}
                  onChange={event => {
                    setCity(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="landline"
                  label="Landline"
                  value={landline}
                  onChange={event => {
                    setLandline(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  value={mobile}
                  onChange={event => {
                    setMobile(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gstin"
                  label="GST Number"
                  value={gstin}
                  onChange={event => {
                    setGstin(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pan"
                  label="PAN Number"
                  value={pan}
                  onChange={event => {
                    setPan(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="chairs"
                  label="No.of Chairs"
                  value={chairs}
                  onChange={event => {
                    setChairs(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12} sm={6}>
                <TextField
                  type="time"
                  name="opens"
                  required
                  fullWidth
                  id="opens"
                  label="opens"
                  value={opens}
                  onChange={event => {
                    setOpens(event.target.value)
                  }}
                />
              </Grid> */}
{/* <Grid item xs={12} sm={6}>
                <TextField
                  type="time"
                  required
                  fullWidth
                  id="closes"
                  label="Closes"
                  name="closes"
                  value={closes}
                  onChange={event => {
                    setCloses(event.target.value)
                  }}
                />
              </Grid> */}
{/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Holiday</InputLabel>
                <Select
                  labelId="holiday"
                  id="holiday"
                  label="Weekly Holiday"
                  value={holiday}
                  onChange={event => {
                    setHoliday(event.target.value)
                  }}
                >
                  <MenuItem value={1}>Sunday</MenuItem>
                  <MenuItem value={2}>Monday</MenuItem>
                  <MenuItem value={3}>Tuesday</MenuItem>
                  <MenuItem value={4}>Wednesday</MenuItem>
                  <MenuItem value={5}>Thursday</MenuItem>
                  <MenuItem value={6}>Friday</MenuItem>
                  <MenuItem value={7}>Saturday</MenuItem>
                </Select>
              </FormControl> */}

{/* Upload Image
            <input type="file"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
            /> */}
{/* <Button
              disabled={salonsBtn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Salon Details
            </Button> */}


{/* <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClose}
          >
            Exit
          </Button> */}
