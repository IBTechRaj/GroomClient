import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid'
import Card from './Card'
import 'react-responsive-modal/styles.css';
import Spinner from './Spinner'

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px'
  }
})

function Landing(props) {

  // console.log('lndg props', props)
  let content = '';
  const { userId, userName, userEmail } = props
  const [salons, setSalons] = useState([])
  const classes = useStyles()
  const salonUrl = (process.env.REACT_APP_SERVER) ? `https://groomwell-backend.onrender.com/salons` : `http://localhost:3001/salons`
  // const salonUrl = (process.env.REACT_APP_SERVER) ? `https://groomproj-production.up.railway.app/salons` : `http://localhost:3001/salons`




  useEffect(() => {
    axios.get(salonUrl,
    )
      .then(({ data }) => {
        setSalons(data)
      })

  }, [])

  return (
    <>

      <h4 className='text-center'> Choose Your Salon to Book Your Service</h4>
      {
        content = salons.length === 0 ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Grid container spacing={2} className={classes.gridContainer} justify="center">

            {salons.map(salon => (

              <Grid item xs={12} sm={6} key={salon.id}>
                <Card salon={salon} userId={userId} userName={userName} userEmail={userEmail} userMobile={props.userMobile} />
              </Grid>
            ))}
          </Grid>
        )}
    </>
  )
}

export default Landing