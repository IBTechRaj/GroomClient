import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid'
import Card from './Card'
import 'react-responsive-modal/styles.css';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px'
  }
})

function Landing(props) {

  console.log('lndg props', props)
  const { userId, userName, userEmail } = props
  const [salons, setSalons] = useState([])
  const classes = useStyles()
  const salonUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/salons` : `http://localhost:3001/salons`
  // const salonurl = 'http://localhost:3001/salons';
  // const salonurl = 'https://groomserver.herokuapp.com/salons';

  // const getSalonData = async () => {
  //   try {
  //     const response = await axios.get(
  //       salonUrl
  //     );
  //     setSalons(response.data);
  //     console.log('respd', response.data)
  //   } catch (err) {
  //     console.log('e', err.message)
  //     setSalons(null);
  //   } 
  // }

  useEffect(() => {
    axios.get(salonUrl,
    )
      .then(({ data }) => {
        setSalons(data)
        console.log('cnt', salons.count)
      })

    //  getSalonData()
  }, [])

  return (
    <>

      <h2> Choose Your Salon to Book Your Service</h2>
      <Grid container spacing={2} className={classes.gridContainer} justify="center">

        {salons.map(salon => (
          <Grid item xs={12} sm={6} key={salon.id}>
            <Card salon={salon} userId={userId} userName={userName} userEmail={userEmail} userMobile={props.userMobile} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Landing