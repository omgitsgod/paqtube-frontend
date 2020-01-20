import React from 'react';
import '../css/Banner.css';
import paqBanner from '../imgs/paqBanner.jpg';

function Banner(props) {
  return (
    <div>
      <img className='banner' src={paqBanner} alt='Banner'/>
      <hr />
    </div>
  );
}

export default Banner;
