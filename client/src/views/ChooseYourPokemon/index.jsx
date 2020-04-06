import React, { Component } from 'react'

/*Services*/
import {single as singlePokemon} from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import UserAll from './../../services/userall';


/*COMPONENTS*/
import SpritesPokemon from '../../components/spritesPokemon';
import NavBar from './../../components/NavBar';
import Stats from './../../components/Stats';



export default class ChooseYourPokemon extends Component {
  constructor(){
    super();
    this.state={
      numberIdPokemon:12,
      pokemon:'',
      users:[]
    }

    this.RandomNumber=this.RandomNumber.bind(this);
    this.triggerUpdatePokemon=this.triggerUpdatePokemon.bind(this);
    this.triggerUpdateUsersForScore=this.triggerUpdateUsersForScore.bind(this);
    this.addPokemon=this.addPokemon.bind(this);
  }

   async componentDidMount(){
     await this.fetchData();
   }

   async fetchData(){
    await this.RandomNumber();

     const number = this.state.numberIdPokemon;
     const pokemon = await singlePokemon({number});
     
     await this.triggerUpdateUsersForScore();
    
     this.setState({pokemon});
   }

   async RandomNumber(){
     const randomNumber = Math.floor(Math.random() * (125 - 1)) + 1;
     this.setState({
      numberIdPokemon:randomNumber
      });
   }

   triggerUpdatePokemon(){
     this.fetchData();
   }

   async triggerUpdateUsersForScore(){
    const users = await UserAll();
    this.setState({users});
   }

   async addPokemon(){
    await editUser(this.props.user._id,this.state.pokemon.name);
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
        />

        {this.state.pokemon !== '' &&
          <div>

            <h1>{this.state.pokemon.name}</h1>
            
            <SpritesPokemon 
              name={this.state.pokemon.name}
              src={this.state.pokemon.sprites.front_default} />

            <h2>Abilities:</h2>
            <ul>
              {this.state.pokemon.abilities.map( ability => 
              <li key={ability.ability.name}>{ability.ability.name}</li>
              )}
            </ul>

            <h2>Type:</h2>
            <p>{this.state.pokemon.types[0].type.name}</p>

            <h2>Stats: </h2>
            <Stats pokemon={this.state.pokemon} />

            <button onClick={this.triggerUpdatePokemon}>
              Random pokemon
            </button>

            <button onClick={this.addPokemon}>
              <img src="./../images/pokeball.svg" alt="pokeball" />
            </button>
            
          </div>
        }
      </div>
      
      
    )
  }
}
