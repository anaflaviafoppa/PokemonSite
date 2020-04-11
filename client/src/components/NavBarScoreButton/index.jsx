import React, { Component } from 'react';
import './style.scss';

class NavBarScoreButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="div-score">
        <img 
        id="buttonImg"
        src="./../images/crown.svg"
        alt='score'
        onMouseDown={this.props.handleMouseDownScore}
      />
      </div>
      
    );
  }
}

export default NavBarScoreButton;
