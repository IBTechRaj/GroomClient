import * as React from 'react';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


import DatePicker from "react-datepicker";
import { Row, Col } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import TimeSlots from "./TimeSlots";
import axios from 'axios';

// export default function BookService() {


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: 200,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Elevation(props) {

  console.log('ele props', props)
  const [service, setService] = useState('Choose Service')
  const [showTime, setShowTime] = useState(false)
  const [apptDate, setApptDate] = useState()
  const [apptTime, setApptTime] = useState('0:00')
  let handleServiceChange = (e) => {
    setService(e.target.value)
  }

  const setDateShowTime = () => {
    setShowTime(true)
    setApptDate(startDate)
  }

  const createAppointment = (e) => {
    e.preventDefault()
    const emailClientData = {
      "subject": 'Appointment Booking Success!',
      "name": props.clientName,
      "email": props.clientEmail,
      "message":
        "Dear " + props.clientName
        + ",\n\n"
        + "Thank you for booking your service with GroomWell Services partner. The following are the details of your appointment\n"
        + "\nAppointment Date :" + startDate
        + "\nAppointment Time : " + apptTime
        + "\nService Name: " + service
        + "\nSalon Name: " + props.salonName
        + "\nSalon Phone : " + props.salonLandline
        + "\nSalon Mobile : " + props.salonMobile
        + "\n\n"
        + "Kindly reach the salon at least 15 minutes before appoint time. For any queries please call Customer Care."
        + "\n\n"
        + "Team GroomWell"
    }
    const emailSpData = {
      "subject": 'You have new business!',
      "name": props.salonName,
      "email": props.salonEmail,
      "message":
        "Dear " + props.salonName
        + ",\n\n"
        + "We are glad to inform you that one client has booked his service through us at your salon. The following are the details of your appointment\n"
        + "\nAppointment Date :" + startDate
        + "\nAppointment Time : " + apptTime
        + "\nCustomer Name : " + props.clientName
        + "\nCustomer Mobile : " + props.clientMobile
        + "\nService booked : " + service
        + "\n\n"
        + "Kindly call the customer preferably a day before and confirm the appointment. For any queries please call Customer Care."
        + "\n\n"
        + "Team GroomWell"
    }
    const appointment = {
      apptdate: startDate,
      appttime: apptTime,
      service: service,
      salon_id: props.salonId,
      user_id: props.userId
    }
    console.log('appt data', appointment)
    const jwt = localStorage.getItem('token');
    const apptUrl = (process.env.REACT_APP_SERVER ? `https://groomserver.herokuapp.com/appointments` : `http://localhost:3001/appointments`)
    // const apptUrl = 'https://groomserver.herokuapp.com/appointments';

    axios.post(apptUrl, appointment, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(response => {
        if (response.status === 201) {
          alert('Your appointment successfully booked')
          console.log('Appointment Added')
        }
      })
      .then(() => {
        const jwt = localStorage.getItem('token')
        const contactsUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/contacts` : `http://localhost:3001/contacts`
        // const contactsUrl = 'https://groomserver.herokuapp.com/contacts'

        try {
          const res = axios.post(contactsUrl, emailClientData, { headers: { Authorization: `Bearer ${jwt}` } });
          console.log('res', res);
        }
        catch (error) {
          console.log('cl eml err', error);
        }

      })
      .then(() => {
        const jwt = localStorage.getItem('token')
        const contactsUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/contacts` : `http://localhost:3001/contacts`
        // const contactsUrl = 'https://groomserver.herokuapp.com/contacts'

        try {
          const res = axios.post(contactsUrl, emailSpData, { headers: { Authorization: `Bearer ${jwt}` } });
          console.log('res', res);
          props.setBookingVisible(false)
        }
        catch (error) {
          console.log('sp eml err', error);
        }

      })
  }

  const [startDate, setStartDate] = useState(new Date());
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} >
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 2,
            }}
          >
            <Item elevation={8}>
              <Card
                sx={{ minWidth: 275 }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }}
                  >
                    Booking Details
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Salon Name : {props.salonName}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Service :
                    <select onChange={handleServiceChange}>
                      <option value="choose">
                      </option>
                      {props.services.map((service) => <option key={service.id} value={service.stype}>{service.stype}</option>)}
                    </select>
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Client : {props.clientName}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Booking Date :
                    {/* <div> */}
                    <Row >
                      <Col xs={6} style={{ marginLeft: 200, position: 'absolute' }}>

                        {showTime ? <TimeSlots setApptTime={setApptTime} setShowTime={setShowTime} startDate={startDate} salonId={props.salonId} /> : null}
                        {console.log('dt,tm', startDate.toLocaleDateString(), apptTime)}
                      </Col>
                      <Col xs={6} >
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          shouldCloseOnSelect={false}
                          onSelect={setDateShowTime}
                        />
                      </Col>

                    </Row>
                    {/* </div> */}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Booking Time : {apptTime}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => props.setBookingVisible(false)}
                  >Cancel</Button>
                  <Button size="small" variant="contained"
                    onClick={createAppointment}
                  >Confirm</Button>
                </CardActions>
              </Card>
            </Item>
            {/* ))} */}
          </Box>
        </ThemeProvider>
      </Grid>
      )
      {/* )} */}
    </Grid>
  );
}
