import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const SalonCard  = (props) =>{
  console.log('p', props)
    const { salon } = props;
    return (
      <div className="col-md-3 mb-5">
        <div className="card card-body bg-dark text-center h-100 mx-auto">
          <img
            className="w-100 mb-2"
            src={salon.get_image_url}
            alt="Salon Image"
          />
          <h5 className="text-light card-title">{salon.name}</h5>
          Title: {salon.city}
        </div>
      </div>
    );
  }


export default SalonCard