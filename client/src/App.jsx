import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*COMPONENTES*/
import ProtectedRoute from './components/ProtectedRoute';

/*Services*/
import { loadUserInformation } from './services/authentication';
import { singleUser } from './services/pokemon';

/*VIEWS*/
import Home from './views/ChooseYourPokemon';
import SignInSignOut from './views/SignInSingOut';
import EditProfileView from './views/editProfile';
import Battle from './views/Battle';
import Pokemons from './views/Pokemons';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false,
      userlog: '',
    };

    this.updateUserInformation = this.updateUserInformation.bind(this);
    this.loadUserInformation = this.loadUserInformation.bind(this);
  }

  componentDidMount() {
    loadUserInformation()
      .then((user) => this.updateUserInformation(user))
      .catch((error) => {
        console.log(error);
      });
  }

  async loadUserInformation(id) {
    const userlogData = await singleUser({ id });
    const userlog = userlogData.data;
    this.setState({
      userlog,
    });
  }

  updateUserInformation(user) {
    this.setState({
      loaded: true,
      user,
    });
  }

  render() {
    const existUser = this.state.user !== null;
    let existUserPokemonsLength;

    if (existUser) {
      existUserPokemonsLength = this.state.user.pokemons.length === 3;
    } else {
      existUserPokemonsLength = false;
    }

    return (
      <div>
        {this.state.loaded && (
          <BrowserRouter>
            <Switch>
              <ProtectedRoute
                path="/"
                exact
                authorized={!this.state.user}
                redirect={existUserPokemonsLength ? '/pokemons' : '/home'}
                redirectPage={existUserPokemonsLength ? '/pokemons' : '/home'}
                render={(props) => (
                  <SignInSignOut {...props} updateUserInformation={this.updateUserInformation} />
                )}
              />

              <ProtectedRoute
                path="/home"
                authorized={this.state.user}
                redirect={'/'}
                exact
                render={(props) =>
                  this.state.user.pokemons.length < 3 ? (
                    <Home
                      user={this.state.user}
                      {...props}
                      updateUserInformation={this.updateUserInformation}
                      loadUserInformation={this.loadUserInformation}
                      userlog={this.state.userlog}
                    />
                  ) : (
                    <Pokemons
                      {...props}
                      user={this.state.user}
                      updateUserInformation={this.updateUserInformation}
                      loadUserInformation={this.loadUserInformation}
                      userlog={this.state.userlog}
                    />
                  )
                }
              />

              {/* This Route will show the inputs for edit profile */}
              <ProtectedRoute
                path="/edit"
                exact
                authorized={this.state.user}
                redirect={existUserPokemonsLength ? '/pokemons' : '/home'}
                render={(props) => (
                  <EditProfileView
                    {...props}
                    user={this.state.user}
                    updateUserInformation={this.updateUserInformation}
                    redirectPage={existUserPokemonsLength ? '/pokemons' : '/home'}
                  />
                )}
              />

              <ProtectedRoute
                path="/battle"
                exact
                authorized={this.state.user}
                redirect={'/'}
                render={(props) => (
                  <Battle
                    {...props}
                    user={this.state.user}
                    updateUserInformation={this.updateUserInformation}
                    loadUserInformation={this.loadUserInformation}
                  />
                )}
              />

              <ProtectedRoute
                path="/pokemons"
                exact
                authorized={this.state.user}
                redirect={'/'}
                render={(props) => (
                  <Pokemons
                    {...props}
                    user={this.state.user}
                    updateUserInformation={this.updateUserInformation}
                    loadUserInformation={this.loadUserInformation}
                    userlog={this.state.userlog}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
