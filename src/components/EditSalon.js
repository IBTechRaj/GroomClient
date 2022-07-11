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

export default function EditSalon(props) {

  console.log('edit props', props)
  const [salonData, setSalonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salonId, setSalonId] = useState(0)
  console.log('SalonDat', salonData)

  const salonurl = `https://groomserver.herokuapp.com/salons/${props.salonId}`;
  const userSalonUrl = `https://groomserver.herokuapp.com/salons/${props.salonId}`;

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSalonData({ ...salonData, [name]: value });
  }

  const updateSalonDetails = (event) => {
    event.preventDefault();
    console.log('sd', salonData)
    axios.put(salonurl, salonData)
      .then(res => {
        console.log('upd', res.data)
        alert('Salon Details updated successfully')
      });

  }

  const [showServices, setShowServices] = useState(true)

  const closeChild = () => {
    setShowServices(false)
  };
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
            <SpaOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Your Salon Details
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  // disabled
                  fullWidth
                  id="name"
                  label="Name of the Salon"
                  name="name"
                  value={salonData.name ?? ""}
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
                  value={salonData.email ?? ""}
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
                  value={salonData.address1 ?? ""}
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
                  value={salonData.address2 ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  name="pincode"
                  value={salonData.pincode ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  value={salonData.city ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="landline"
                  name="landline"
                  value={salonData.landline ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  value={salonData.mobile ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gstin"
                  name="gstin"
                  value={salonData.gstin ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pan"
                  name="pan"
                  value={salonData.pan ?? ""}
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
                  value={salonData.chairs ?? ""}
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
          </Box>
        </Box>

      </Container>
    </ThemeProvider >
  )
}
