import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import ColumnBattle from './../../components/ColumnBattle';

/*Services*/
import UserAll from './../../services/userall';
import { editUserPull } from '../../services/pokemon';
import { editUser } from '../../services/pokemon';
import { single as singlePokemon } from '../../services/pokemon';
import { singleUser } from '../../services/pokemon';

/*STYLE*/
import './style.scss';

export default class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      numberIdPokemon: 4,
      user: '',
    };

    this.RandomNumber = this.RandomNumber.bind(this);
    this.triggerUpdatePokemon = this.triggerUpdatePokemon.bind(this);
    this.triggerUpdateUsersForScore = this.triggerUpdateUsersForScore.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.triggerPokemon = this.triggerPokemon.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  /*FETCH DATA */
  async fetchData() {
    const id = this.props.user._id;

    const userlogData = await singleUser({ id });
    const userlog = userlogData.data;

    this.setState({
      user: userlog,
    });

    /*after add some pokemon will refresh the pokemon*/
    await this.triggerUpdateUsersForScore();
  }

  async triggerUpdateUsersForScore() {
    const users = await UserAll();
    this.setState({ users });
  }

  async RandomNumber() {
    /*RANDOM NUMBER FUNCTION*/
    const randomNumber = Math.floor(Math.random() * (500 - 1)) + 1;
    this.setState({
      numberIdPokemon: randomNumber,
    });
  }

  async triggerUpdatePokemon(pokemonChange) {
    const id = this.props.user._id;
    const pokemon = pokemonChange.pokemon;
    const score = this.props.user.score;

    if (score >= 25) {
      /*RETIRAR O ANTIGO POKEMON*/
      await editUserPull({ id, pokemon });

      await this.RandomNumber();
      const newPokemon = await this.triggerPokemon(this.state.numberIdPokemon);

      await this.addPokemon(id, newPokemon);
      await this.fetchData();
    }
  }

  async triggerPokemon(number) {
    const pokemon = await singlePokemon({ number });
    return pokemon;
  }

  async addPokemon(id, newPokemon) {
    const score = this.props.user.score - 25;

    const counterRandom = this.props.user.counterRandom;

    const pokemon = newPokemon.name;

    await editUser({ id, pokemon, score, counterRandom });
  }

  render() {
    let scoreBefore = this.props.location.state;
    let pokemonNameUsed;

    if (scoreBefore == undefined) {
      scoreBefore = -1;
      pokemonNameUsed = 'null';
    }

    return (
      <div>
        <NavBar
          user={this.props.user}
          users={this.state.users}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
          updateUsersScore={this.triggerUpdateUsersForScore}
        />

        {this.state.user !== '' && (
          <section className="body">
            <div className="body-firstChild">
              <div className="logo">
                <img src="../images/logo.png" alt="logo"></img>
              </div>

              <h1>Pokeball</h1>

              {scoreBefore >= 0 && (
                <h1>
                  {scoreBefore < this.props.location.state.score ? 'YOU WIN' : 'YOU LOST THE GAME'}
                </h1>
              )}

              <div className="row row-Cards">
                {this.state.user.pokemons.map((pokemon) => (
                  <div key={pokemon._id} className="col col-Cards pl-0 pr-0 d-flex justify-content-center ml-0 mr-0">

                      <ColumnBattle
                        pokemon={pokemon}
                        battle={false}
                        style={pokemonNameUsed === pokemon.pokemon ? 'disable' : 'active'}
                        randomPokemon={this.triggerUpdatePokemon}

                      />
                  
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
