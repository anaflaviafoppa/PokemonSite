import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*COMPONENTES*/
import ProtectedRoute from './components/ProtectedRoute';

/*Services*/
import { loadUserInformation } from './services/'

/*VIEWS*/
import Home from './views/ChooseYourPokemon';

export default class App extends Component {
  constructor(){
    super();
    this.state= {
      user:null,
      loaded: false
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
          path="/"
          exact
          render={props => (
                  <Home />)}
          />

          
        </Switch>
      </BrowserRouter>
    )
  }
}




