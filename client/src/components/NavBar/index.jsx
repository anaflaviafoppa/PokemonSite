// components/navbar/Navbar.js

import React, { Component, Fragment } from 'react';

/*PROFILE BUTTONS AND COMPONENTS*/
import NavBarProfile from './../NavBarProfile';
import NavBarProfileButton from './../NavBarProfileButton';

/*SCORE BUTTONS AND COMPONENTS*/
import NavBarScoreButton from './../NavBarScoreButton';
import NavBarScore from './../NavBarScore';

import './style.scss';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleProfile: false,
      visibleScore: false,
      sidebarProfile: false,
      sidebarScore: false,
    };

    
    this.handleMouseDownProfile = this.handleMouseDownProfile.bind(this);
    this.toggleMenuProfile = this.toggleMenuProfile.bind(this);
    this.toggleSwipeProfile = this.toggleSwipeProfile.bind(this);

    this.handleMouseDownScore = this.handleMouseDownScore.bind(this);
    this.toggleMenuScore = this.toggleMenuScore.bind(this);
    this.toggleSwipeScore = this.toggleSwipeScore.bind(this);
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

  //for the Score Menu:

  async handleMouseDownScore() {
    await this.props.triggerUpdateUsersForScore;
    this.toggleMenuScore();
    
  }

  toggleMenuScore() {
    this.setState({
      visibleScore: !this.state.visibleScore
    });
  }

  toggleSwipeScore() {
    this.setState({
      sidebarScore: !this.state.sidebarScore
    });
  }


  render() {
    
    
    return (
      <nav className="nav-style">
        
        <NavBarScoreButton
          user={this.props.user}
          handleMouseDownScore={this.handleMouseDownScore}
         
        />

        <div  className="logo">
          <Link to={this.props.redirectPage}>
           
              <img src="./images/logo.png" alt="logo"></img>
            
            
          </Link>
        </div>
        

        <NavBarScore
          user={this.props.user}
          users={this.props.users}
          handleMouseDownScore={this.handleMouseDownScore}
          menuVisibility={this.state.visibleScore}
          updateUserInformation={this.props.updateUserInformation}
        />

        <NavBarProfile
          user={this.props.user}
          users={this.props.users}
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