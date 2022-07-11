import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='social-media-wrap'>
        <div className='footer-logo'>
          <Link to='/' className='social-logo'>
          <img src="assets/SeekPng.com_group-silhouette-png_508662.png" alt="NoImg" style={{width: 50, height: 50}}/>
            {/* <MdLocalCarWash className='navbar-icon' style={{ fontSize: 24 }} /> */}
            GroomWell
          </Link>
        </div>
        <small className='website-rights'>GroomWell Salon Services © 2022</small>
        <div className='social-icons'>
          <Link
            className='social-icon-link'
            to='/'
            target='_blank'
            aria-label='Facebook'
          >
            <FaFacebook />
          </Link>
          <Link
            className='social-icon-link'
            to={
              '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
            }
            target='_blank'
            aria-label='Youtube'
          >
            <FaYoutube />
          </Link>
          <Link
            className='social-icon-link'
            to='/'
            target='_blank'
            aria-label='Twitter'
          >
            <FaTwitter />
          </Link>
          <Link
            className='social-icon-link'
            to='/'
            target='_blank'
            aria-label='LinkedIn'
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
