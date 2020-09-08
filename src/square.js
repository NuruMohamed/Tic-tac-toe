import React from 'react';
import './index.css';

// this controlled component returns the square buttons 
const Square = (props) => {

    return (
      <button onClick={() => props.onClick()} className="square">
        {props.value}
      </button>
    );
  }

  export default Square;