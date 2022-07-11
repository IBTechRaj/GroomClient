import React from 'react';
import './Button.css';

const Button = ({
   color, 
  name, setApptTime,setShowTime, reserved
}) => {
  const classes = `${color}
  
  `.trim();
// const reserved=false;

  return (
    <button type="button" onClick={() => {
        setApptTime(name)
        setShowTime(false)
    }} 
    className=
    {reserved ? 'reserved' : classes}
    >
      {name}
    </button>
  );
};
//  ${   wide ? 'ff-percent' : null }

// Button.defaultProps = {
//   wide: false,
//   color: 'orange',
//   name: '',
// };


export default Button;