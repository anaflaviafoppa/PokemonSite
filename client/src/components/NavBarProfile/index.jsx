//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { signOut } from './../../services/authentication';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class NavBarProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.props.updateUserInformation(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedRight={this.props.handleMouseDownProfile}>
        <div className="d-flex justify-content-center">
          <div id="flyoutSidebarProfile" className={visibility}>
            <button className="btn-swipe" onMouseDown={this.props.handleMouseDownProfile}>
              <img
                style={{
                  width: '2em',
                  float: 'right',
                  position: 'relative',
                  margin: '2em 1em',
                }}
                src="./../images/right-white.svg"
                alt="go back icon"
              />
            </button>
            <img
              style={{
                width: '10em',
                height: '10em',
                margin: '0 auto',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={this.props.user.picture}
              alt={this.props.user.name}
            />
            <h2 style={{ color: 'white', fontWeight: '500', marginTop: '1em' }}>
              {this.props.user.name}
            </h2>
            <p>{this.props.user.email}</p>

            
              <Link
                to="/edit"
              >
                <button className="btn-logout">
                  Edit Profile
                </button>
              </Link>
            

            <button className="btn-logout" onClick={this.handleSignOut}>
              <img style={{ width: '1.6em' }} src="./../images/logout.svg" alt="logout icon" />
              Logout
            </button>
          </div>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarProfile;
