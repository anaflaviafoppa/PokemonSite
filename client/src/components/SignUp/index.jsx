import React, { Component } from 'react';

import { signUp } from './../../services/authentication';

import './style.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, password } = this.state;
    signUp({
      name,
      email,
      password,
    })
      .then((user) => {
        this.props.updateUserInformation(user);
        this.props.changeHistory();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="signup__container">
        <div>
          <h2>Welcome to</h2>
          <img src="./images/logo.png" alt="logo"></img>

          <form onSubmit={this.handleFormSubmission} className="signup__form">
            <h3>Create an account to get started</h3>

            
            <input
              className="signup__input"
              onChange={this.handleInputChange}
              value={this.state.name}
              name="name"
              type="text"
              placeholder="Enter name"
              autoComplete="none"
            />

            <input
              className="signup__input"
              onChange={this.handleInputChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Enter email"
              autoComplete="none"
            />

            <input
              className="signup__input"
              onChange={this.handleInputChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="none"
            />

            <button className="signup__btn">Create an account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
