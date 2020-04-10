import React, { Component } from 'react';

import SignUp from './../../components/SignUp';
import SignIn from './../../components/SignIn';

import { loadUserInformation } from './../../services/authentication';

import './style.scss';

class SignInSignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
    };
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
  }

  handleAuthentication() {
    this.setState({
      signIn: !this.state.signIn,
    });
  }

  changeHistory() {
    this.props.history.push(this.props.redirectPage);
  }

  render() {
    return (
      <div className="contentSign">
        <div className="body body-sign">
          {this.state.signIn ? (
            <SignIn
              updateUserInformation={this.props.updateUserInformation}
              changeHistory={this.changeHistory}
            />
          ) : (
            <SignUp
              updateUserInformation={this.props.updateUserInformation}
              changeHistory={this.changeHistory}
            />
          )}
          <span onClick={this.handleAuthentication}>
            {this.state.signIn ? (
              <div className="change-signup-singin">
                <span className="span-home">Don’t have an account?</span>
                <button className="home-btn"><p>Create an Account</p></button>
              </div>
            ) : (
              <div className="change-signup-singin">
                <span className="span-home">Already have an account?</span>{' '}
                <button className="home-btn"><p>Sign In</p></button>
              </div>
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default SignInSignOut;
