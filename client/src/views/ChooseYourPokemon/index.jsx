import React, { Component } from 'react'

/*Packages*/
import { Button } from 'react-bootstrap';


/*Services*/
import {single as singlePokemon} from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import {editUserCounters} from '../../services/pokemon';
import UserAll from './../../services/userall';


/*COMPONENTS*/
import SpritesPokemon from '../../components/spritesPokemon';
import NavBar from './../../components/NavBar';
import Stats from './../../components/Stats';
import FooterHome from './../../components/Footer';



export default class ChooseYourPokemon extends Component {
  constructor(){
    super();
    this.state={
      numberIdPokemon:12,
      pokemon:'',
      counterRandom:0,
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

   /*FETCH DATA */
   async fetchData(){
    
    await this.props.loadUserInformation();
    
    await this.RandomNumber();

     const number = this.state.numberIdPokemon;

     /*WILL VERIFY IF THE USERS ALREADY HAVE THE MAX */
     
      const pokemon = await singlePokemon({number});
      this.setState({pokemon});
     
    
     /*after add some pokemon will refresh the pokemon*/
     await this.triggerUpdateUsersForScore();
     
   }

   async RandomNumber(){
    /*RANDOM NUMBER FUNCTION*/
     const randomNumber = Math.floor(Math.random() * (125 - 1)) + 1;
     this.setState({
      numberIdPokemon:randomNumber
      });
   }

   async triggerUpdatePokemon(originPokeball){
    
    if(!originPokeball){

      this.setState(previousState => ({
        counterRandom: this.props.user.counterRandom+1
      }));

      const counterRandom = this.state.counterRandom;
      console.log('counterRandom',counterRandom);

      const id = this.props.user._id;
      if(counterRandom > 2){
        await this.addPokemon();
      }
      await editUserCounters({id, counterRandom})
    }
      
    await this.fetchData();
   }

  async triggerUpdateUsersForScore(){
    const users = await UserAll();
    this.setState({users});
  }

  async addPokemon(){
    console.log('his.props.user.pokemons.length',this.props.user.pokemons.length < 3);

    if(this.props.user.pokemons.length < 3){
      console.log('this.props.user._id',this.props.user._id);
      console.log('this.state.pokemon.name',this.state.pokemon.name);
      const id = this.props.user._id;
      const pokemon = this.state.pokemon.name;
      await editUser({id,pokemon});
      const originPokeball = true;
      this.triggerUpdatePokemon(originPokeball);
    }
    
  }

  render() {
    const originPokeball = false;
    
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


            <Button variant="primary" onClick={() => this.triggerUpdatePokemon(originPokeball)}>Random pokemon</Button>

            <button onClick={this.addPokemon}>
            
            <img 
              src="./../images/pokeball.svg"
              alt="pokeball" />
            </button>
            

            <FooterHome />
          </div>
        }
      </div>
      
      
    )
  }
}
