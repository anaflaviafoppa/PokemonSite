import React, { Component } from 'react';

/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import ColumnBattle from './../../components/ColumnBattle';
import RandomPokemon from './../../components/RandomPokemon';

/*Services*/
import { single as singlePokemon } from '../../services/pokemon';
import { editUser } from '../../services/pokemon';
import { editUserPull } from '../../services/pokemon';
import UserAll from './../../services/userall';

import './style.scss';

export default class Battle extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      numberIdPokemon: 0,
      pokemon: '',
      pokemonUser: '',
      scoreBefore: 0,
    };

    this.RandomNumber = this.RandomNumber.bind(this);
    this.triggerUpdateUsersForScore = this.triggerUpdateUsersForScore.bind(this);
    this.triggerPokemon = this.triggerPokemon.bind(this);
    this.competitionValue = this.competitionValue.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  /*FETCH DATA */
  async fetchData() {
    await this.props.loadUserInformation;

    await this.RandomNumber();

    const number = this.state.numberIdPokemon;

    /*WILL VERIFY IF THE USERS ALREADY HAVE THE MAX */
    const pokemon = await this.triggerPokemon(number);
    const pokemonUser = this.props.location.state.pokemonUser;

    this.setState({ pokemon, pokemonUser });

    /*after add some pokemon will refresh the pokemon*/
    await this.triggerUpdateUsersForScore();
  }

  /*API REQ. FOR SINGLE POKEMON*/
  async triggerPokemon(number) {
    const pokemon = await singlePokemon({ number });
    return pokemon;
  }

  async RandomNumber() {
    /*RANDOM NUMBER FUNCTION*/
    const randomNumber = Math.floor(Math.random() * (500 - 1)) + 1;
    this.setState({
      numberIdPokemon: randomNumber,
    });
  }

  async triggerUpdateUsersForScore() {
    const users = await UserAll();
    this.setState({ users });
  }

  /*COMPARE VALUES*/
  async competitionValue(nameOfAbility, userValue) {
    let score = this.props.user.score;
    this.setState({ scoreBefore: score });

    const pokemon = this.state.pokemonUser.pokemon;
    const counterRandom = this.props.user.counterRandom;

    const id = this.props.user._id;
    let timesPlayed = this.state.pokemonUser.timesPlayed;

    await editUserPull({ id, pokemon });

    timesPlayed++;

    const pokemonEnemy = this.state.pokemon;
    const valueEnemy = pokemonEnemy.stats.find((element) => element.stat.name === nameOfAbility);

    if (valueEnemy.base_stat >= userValue) {
      //'ENEMY WINS'
      await editUser({ id, score, pokemon, timesPlayed, counterRandom });
    } else if (valueEnemy.base_stat < userValue) {
      //'USER WINS'
      switch (nameOfAbility) {
        case 'speed':
          score += 8;
          break;
        case 'special-defense':
          score += 15;
          break;
        case 'special-attack':
          score += 18;
          break;
        case 'defense':
          score += 12;
          break;
        default:
          score += 10;
          break;
      }

      console.log('score', score);

      await editUser({ id, score, pokemon, timesPlayed, counterRandom });
    }

    this.props.history.push({
      pathname: '/pokemons',
      state: {
        scoreBefore: this.state.scoreBefore,
        score: score,
        pokemonNameUsed: this.state.pokemonUser.pokemon,
        
      },
    });
  }

  render() {
    return (
      <div className="content">
        <NavBar
          user={this.props.user}
          users={this.state.users}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
          updateUsersScore={this.triggerUpdateUsersForScore}
          redirectPage={'/battle'}
        />
        {this.state.pokemon !== '' && (
          <section className="body battle">
            <div>
              <div className="row">
                <div className="col">
                  <ColumnBattle
                    battle={true}
                    pokemon={this.state.pokemonUser}
                    competitionValue={this.competitionValue}
                  />
                </div>

                <div className="col vs-image d-flex justify-content-center">
                  <img src="./images/VS.png" alt="versus" />
                </div>

                <div className="col">
                  <RandomPokemon battle={true} pokemon={this.state.pokemon} />
                </div>
              </div>
            </div>
          </section>
        )}
        <p className="pt-5 pb-2">Ana Flavia Foppa © 2020</p>
      </div>
    );
  }
}
