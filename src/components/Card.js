import React from 'react';
import '../css/Card.css'

function Card(props) {
  return (
    <div className='container'>
  <div className='card'>
    <img src={props.img} alt='Project' className='card_image' />
    <div className='card_text'>
      <h2 className='title'>{props.name}</h2>
    </div>
    <hr />
    <div className='card_footer'>
    <div className='summary'>
      {props.text}
    </div>
    </div>
  </div>
</div>
  );
}

export default Card;
