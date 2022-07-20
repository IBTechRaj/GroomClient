import * as React from 'react';
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import BookService from './BookService';

export default function OutlineCard(props) {
  console.log('card props', props)
  const { salon } = props;
  const { userName } = props
  const [services, setServices] = useState([{}])
  const [bookingVisible, setBookingVisible] = useState(false)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState({ apptDate: "", apptTime: "" })
  const servicesUrl = (process.env.REACT_APP_SERVER) ? `https://groomserver.herokuapp.com/services` : `http://localhost:3001/services`
  // const servicesUrl = 'http://localhost:3001/services/';
  // const servicesUrl = 'https://groomserver.herokuapp.com/services/';

  const filteredServices = (services) => {
    const curServ = services.filter(
      (service) => service.salon_id === salon.id
    );
    return curServ
  }

  const handleBooking = () => {
    if (!userName)
      alert('Please login to book your appointment')
    else
    setBookingVisible(true)
  }

  useEffect(() => {
    const getServicesData = async () => {
      try {
        const response = await axios.get(
          servicesUrl
        );
        setServices(response.data);
      } catch (err) {
        setError(err.message);
        setServices(null);
      } finally {
        setLoading(false);
      }
    };

    getServicesData()
  }, [])

  return (
    <>
      <Card
        sx={{ maxHeight: 900 }}
      >
        <CardMedia
          component="img"
          height="240"
          image={salon.get_image_url}
          alt="green iguana"
        />
        <div className='center py-1' style={{ marginLeft: 200, position: 'absolute' }}>
          {bookingVisible &&
            <BookService
              booking={booking}
              setBooking={setBooking}
              salonId={salon.id}
              salonName={salon.name}
              salonEmail={salon.email}
              salonLandline={salon.landline}
              salonMobile={salon.mobile}
              services={filteredServices(services)}
              clientName={userName}
              clientEmail={props.userEmail}
              clientMobile={props.userMobile}
              userId={props.userId}
              setBookingVisible={setBookingVisible}
            />}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {salon.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {salon.address1},{salon.address2}, {salon.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredServices(services).map((service) =>
              <li key={service.id}>
                {service.id} - {service.stype} :  {service.sprice}
              </li>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small"
            onClick={() => handleBooking()}
          >Book Your Service</Button>

        </CardActions>

      </Card>
    </>
  );
}

