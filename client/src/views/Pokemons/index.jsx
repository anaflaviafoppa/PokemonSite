import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import ColumnBattle from './../../components/ColumnBattle';

/*Services*/
import UserAll from './../../services/userall';
import { editUserPull } from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import {single as singlePokemon} from '../../services/pokemon';


/*STYLE*/
import './style.scss';

export default class Pokemons extends Component {
  constructor(){
    super();
    this.state={
      users:[],
      numberIdPokemon:4,
      user:''
    }

    this.RandomNumber=this.RandomNumber.bind(this);
    this.triggerUpdatePokemon=this.triggerUpdatePokemon.bind(this);
    this.triggerUpdateUsersForScore=this.triggerUpdateUsersForScore.bind(this);
    this.addPokemon=this.addPokemon.bind(this);
    this.triggerPokemon=this.triggerPokemon.bind(this);
  };

  async componentDidMount(){ 
    await this.fetchData();
  };

  /*FETCH DATA */
  async fetchData(){
    
    const id = this.props.user._id;
    const userUpdate = await this.props.loadUserInformation(id);
    
    this.setState({
      user:this.props.userlog
    });
    
    /*after add some pokemon will refresh the pokemon*/
    await this.triggerUpdateUsersForScore();
     
  };

  async triggerUpdateUsersForScore(){
    const users = await UserAll();
    this.setState({users});
  }

  async RandomNumber(){
    /*RANDOM NUMBER FUNCTION*/
    const randomNumber = Math.floor(Math.random() * (500 - 1)) + 1;
    this.setState({
      numberIdPokemon:randomNumber
    });
  }

  async triggerUpdatePokemon(pokemonChange){
    const id = this.props.user._id;
    const pokemon = pokemonChange.pokemon;
    const score = this.props.user.score;

    if(score >= 25 ){
      /*RETIRAR O ANTIGO POKEMON*/
      await editUserPull({id, pokemon});
      
      await this.RandomNumber();
      const newPokemon = await this.triggerPokemon(this.state.numberIdPokemon);
      
      await this.addPokemon(id, newPokemon);
      await this.fetchData();
    }
    
    
  }

  async triggerPokemon(number){ 
    const pokemon = await singlePokemon({number});
    return pokemon;
  }

  async addPokemon(id, newPokemon){
    const score = this.props.user.score-25;

    const counterRandom = this.props.user.counterRandom;
     
    const pokemon = newPokemon.name;
    
    await editUser({id,pokemon, score, counterRandom});
  }



  render() {
    return (
      <div>
         <NavBar
          user={this.props.user}
          users={this.state.users}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
          updateUsersScore={this.triggerUpdateUsersForScore}
          redirectPage={'/pokemons'}
        />
      {this.state.user !== '' &&
      <section>
      { this.props.location.state.scoreBefore >= 0 &&
        <h1>{this.props.location.state.scoreBefore < this.props.location.state.score ? 'YOU WIN' : 'YOU LOST THE GAME'}</h1>}
        <h1>Choose your next Pokemon to play:</h1>

        <div className="row">
          {this.state.user.pokemons.map(pokemon =>
          
          <div key={pokemon._id} className="col">
          
            <Link
              to={{
                  pathname: '/battle',
                  state: {
                    pokemonUser: pokemon
                  }
                }}>
              <ColumnBattle 
                pokemon={pokemon} 
                battle={false} 
                style={this.props.location.state.pokemonNameUsed === pokemon.pokemon ? 'disable' : 'active'}
                randomPokemon={this.triggerUpdatePokemon}
              />
            </Link>

            <Button
              onClick={() => this.triggerUpdatePokemon(pokemon)}
              className={this.props.location.state.pokemonNameUsed === pokemon.pokemon ? 'disableButton' : 'activeButton'}>
                Random Pokemon
              </Button>
          </div>
          )}
        </div>
      </section>
      }  

      </div>
    )
  }
}
