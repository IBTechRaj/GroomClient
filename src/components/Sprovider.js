import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import Salons from './Salons';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Services from './Services'
import EditSalon from './EditSalon'

function Sprovider(props) {

  console.log('spro', props)
  // const { spSalonId } = props;
  const [salonId, setSalonId] = useState(props.salonId)
  const [showSalons, setShowSalons] = useState(false)
  const [showServices, setShowServices] = useState(false)
  const [editData, setEditData] = useState(false)
  console.log('spro2', salonId)

  const closeChild = () => {
    setShowSalons(false)
  };
  const closeServices = () => {
    setShowServices(false)
  };
  const closeEdits = () => {
    setEditData(false)
  };

  return (
    <>
      {/* {setSalonId(spSalonId)} */}

      <section id="about">
        <Container className="container">
          <Row className="row">
            <div className="section-header">
              <h2 className="section-title text-center wow fadeInDown mt-3" style={{ color: 'black' }}>Add or Edit your Salon and Services Details</h2>
            </div>
          </Row>

          <ButtonGroup variant="contained" size="large" aria-label="outlined primary button group">

            {(props.salonId) ?
              (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                onClick={() => { setEditData(true) }}
              // disabled={servicesBtn}
              >
                Edit Salon Details
              </Button>) :
              (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 5, ml: 5 }}
                onClick={() => { setShowSalons(true) }}
              // disabled={servicesBtn}
              >
                Add Salon Details
              </Button>)}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 5, ml: 80 }}
              // disabled={!salonId}
              onClick={() => { setShowServices(true) }}
            >
              Add/Delete Services
            </Button>

          </ButtonGroup>
          {showSalons &&
            <Salons spId={props.spId} setSalonId={setSalonId} client={props.client} setClient={props.setClient} onClose={closeChild} />
          }
          {showServices &&
            <Services salonId={(salonId ? salonId : props.salonId)} onClose={closeServices} />
          }
          {editData &&
            <EditSalon salonId={props.salonId} client={props.client} setClient={props.setClient} onClose={closeEdits} />
          }

        </Container>
      </section>
    </>
  )
}

export default Sprovider