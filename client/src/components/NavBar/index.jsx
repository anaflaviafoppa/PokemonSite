// components/navbar/Navbar.js

import React, { Component, Fragment } from 'react';

import NavBarProfile from './../NavBarProfile';
import NavBarProfileButton from './../NavBarProfileButton';

import './style.scss';
// import { loadUserInformation } from './../../services/authentication';

// import { Swipeable } from 'react-swipeable';

class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleProfile: false,
      sidebarProfile: false,
    };

    
    this.handleMouseDownProfile = this.handleMouseDownProfile.bind(this);
    this.toggleMenuProfile = this.toggleMenuProfile.bind(this);
    this.toggleSwipeProfile = this.toggleSwipeProfile.bind(this);
  }
  
  //for the profile Menu
  handleMouseDownProfile() {
    this.toggleMenuProfile();
  }

  toggleMenuProfile() {
    this.setState({
      visibleProfile: !this.state.visibleProfile
    });
  }

  toggleSwipeProfile() {
    this.setState({
      sidebarProfile: !this.state.sidebarProfile
    });
  }



  render() {
    
    return (
      <nav className="nav-style">
        
        <NavBarProfile
          user={this.props.user}
          handleMouseDownProfile={this.handleMouseDownProfile}
          menuVisibility={this.state.visibleProfile}
          updateUserInformation={this.props.updateUserInformation}
        />

        <NavBarProfileButton
          user={this.props.user}
          handleMouseDownProfile={this.handleMouseDownProfile}
        />
      </nav>
    );
  }
}

export default Navbar;