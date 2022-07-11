// https://www.npmjs.com/package/react-responsive-carousel

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './carousel.css'
//Photo by <a href="https://unsplash.com/@demoya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michael DeMoya</a> on <a href="https://unsplash.com/s/photos/beauty-salon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  // michael-demoya-J99pG-3RHwc-unsplash.jpg
  // adam-winger-WDmvpGs2060-unsplash.jpg

class MyCarousel extends Component {
  render() {
    return (
      <Carousel interval={5000} infiniteLoop={true} showThumbs={false} autoPlay={true}>


        <div>
          <img src="assets/michael-demoya-J99pG-3RHwc-unsplash.jpg" alt="No img" className="myCarousel"  />
          <p className="legend " style={{ fontSize: 30, color: '#fb6a33' }}>Your looks will get a second look with Our Grooming</p>
        </div>
        <div>
          <img src="assets/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg" alt="No img" className="myCarousel" />
          <p className="legend" style={{ fontSize: 30, color: '#fb6a33' }}>Your Satisfaction is our Motto</p>
        </div>
        <div>
          <img src="assets/adam-winger-WDmvpGs2060-unsplash.jpg" alt="No img" className="myCarousel" />
          <p className="legend" style={{ fontSize: 30, color: '#fb6a33' }}>You will come back again</p>
        </div>
        {/* <div>
        Photo by <a href="https://unsplash.com/@bayleejadegramling?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Baylee Gramling</a> on <a href="https://unsplash.com/s/photos/beauty-salon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
        </div> */}
      </Carousel >
    );
  }
}

export default MyCarousel
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls