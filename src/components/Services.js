import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Services(props) {
  console.log('ssser', props)
  const [serviceName, setServiceName] = useState("")
  const [serviceDuration, setServiceDuration] = useState("")
  const [servicePrice, setServicePrice] = useState("0")

  const serviceDelUrl = 'http://localhost:3001/services/'
  const serviceGetUrl = `http://localhost:3001/services/${props.salonId}`
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jwt = localStorage.getItem('token');

  const getServices = () => {
    axios.get(serviceGetUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(response => {
        console.log('res.dat', response.data)
        setServiceData(response.data)
      })
  }
  useEffect(() => {

    getServices()
  }, [])
  const service = {
    stype: serviceName,
    sduration: serviceDuration,
    sprice: servicePrice,
    salon_id: props.salonId,
  }

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    console.log('servicesData', service)
    const url = 'http://localhost:3001/services';
    axios.post(url, service, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(response => {
        if (response.status === 201) {
          console.log('Service Added')
          setServiceName('')
          setServiceDuration('')
          setServicePrice(0)
          getServices()
        }
      })

  };

  // const [showServices, setShowServices]=useState(true)

  // const closeChild = () => {
  //     setShowServices(false)
  // };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        serviceDelUrl + id
      );
      // setServiceData(response.data);
      console.log('del', response)
      getServices()
      setError(null);
    } catch (err) {
      console.log('e', err.message)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const theme = createTheme();

  return (
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
            <MiscellaneousServicesOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add/Delete Your Services Details
          </Typography>
          <Typography component="div" variant="subtitle1">
            These are the services you are offering at present
          </Typography>
          <hr></hr>
          <Typography component="div" variant="subtitle1">
            <ul>
              {serviceData &&
                serviceData.map(({ id, stype, sduration, sprice, salon_id }) => (
                  <li key={id}>
                    <h5> {id}{stype},  duration: {sduration} minutes,{'   '} price: {sprice} <Button onClick={() => handleDelete(id)}>Delete</Button></h5>
                  </li>

                ))}
            </ul>
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleServiceSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                id="service_name"
                label="Service Name"
                value={serviceName}
                onChange={event => {
                  setServiceName(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                id="duration"
                label="Service Duration"
                value={serviceDuration}
                onChange={event => {
                  setServiceDuration(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                value={servicePrice}
                onChange={event => {
                  setServicePrice(event.target.value)
                }}
              />
            </Grid>


          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
          <Typography component="div" variant="subtitle1">
            When you finish, click on Exit
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={props.onClose}
          >
            Exit
          </Button>
        </Box>

      </Container>
    </ThemeProvider >
  )
}