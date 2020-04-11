import React from 'react';

import './style.scss';

const Win = (props) => {
  return (
    <div className="winner">
      <img  src="./images/trophy.svg" alt="trophy"></img>
      <img className="ribbon" src="./images/ribbon.png" alt="ribbon"></img>
      <h1 className="text">You Win!</h1>
    </div>
  );
};

const Loose = (props) => {
  return (
    <div  className="winner">
      <img src="./images/pikachu.svg" alt="pikachu"></img>
      <img className="ribbon" src="./images/ribbonlose.png" alt="ribbon"></img>
      <h1  className="text">You lose!</h1>
    </div>
  );
};

export { Win, Loose };
