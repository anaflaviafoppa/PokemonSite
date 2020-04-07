import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*COMPONENTES*/
import ProtectedRoute from './components/ProtectedRoute';

/*Services*/
import { loadUserInformation } from './services/authentication';

/*VIEWS*/
import Home from './views/ChooseYourPokemon';
import SignInSignOut from './views/SignInSingOut';
import EditProfileView from './views/editProfile';
import Battle from './views/Battle';


export default class App extends Component {
  constructor(){
    super();
    this.state= {
      user:null,
      loaded: false
    }

    this.updateUserInformation = this.updateUserInformation.bind(this);
    this.loadUserInformation=this.loadUserInformation.bind(this);
  };

  componentDidMount() {
    loadUserInformation()
      .then(user => this.updateUserInformation(user))
      .catch(error => {
        console.log(error);
      });
  }

  loadUserInformation(){
    loadUserInformation()
      .then(user => 
        this.setState({
          user
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    this.setState({
      loaded: true,
      user
    });
  }

  render() {
    return (
      <div>
        {this.state.loaded && (<BrowserRouter>
        <Switch>
          <ProtectedRoute
          path="/"
          exact
          authorized={!this.state.user}
          redirect={'/home'}
          render={props => (
                  <SignInSignOut {...props} updateUserInformation={this.updateUserInformation} />)}
          />

          <ProtectedRoute
            path="/home"
            authorized={this.state.user}
            redirect={'/'}
            exact
            render={props => (
              <Home
                user={this.state.user}
                {...props}
                updateUserInformation={this.updateUserInformation}
                loadUserInformation={this.loadUserInformation}
                  />
                )}
          />

          {/* This Route will show the inputs for edit profile */}
          <ProtectedRoute
                path="/edit"
                exact
                authorized={this.state.user}
                redirect={'/home'}
                render={props => (
                  <EditProfileView
                    {...props}
                    user={this.state.user}
                    updateUserInformation={this.updateUserInformation}
                  />
                )}
              />

            <ProtectedRoute
                path="/battle"
                exact
                authorized={this.state.user}
               
                render={props => (
                  <Battle
                    {...props}
                    user={this.state.user}
                    updateUserInformation={this.updateUserInformation}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
              />

          
        </Switch>
      </BrowserRouter>)}
      </div>
      
    )
  }
}




