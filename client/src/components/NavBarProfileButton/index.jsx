import React, { Component } from 'react';
import './style.scss';

class NavBarProfileButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <img
        id="buttonImg"
        src={this.props.user.picture}
        alt={this.props.user.name}
        onMouseDown={this.props.handleMouseDownProfile}
      />
    );
  }
}

export default NavBarProfileButton;
