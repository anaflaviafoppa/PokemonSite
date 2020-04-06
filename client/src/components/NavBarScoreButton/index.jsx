import React, { Component } from 'react';
import './style.scss';

class NavBarScoreButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <img
        id="buttonImg"
        src="./../images/score.svg"
        alt={this.props.user.name}
        onMouseDown={this.props.handleMouseDownScore}
      />
    );
  }
}

export default NavBarScoreButton;
