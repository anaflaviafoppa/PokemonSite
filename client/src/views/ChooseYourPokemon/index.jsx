import React, { Component } from 'react'

/*Services*/
import {single as singlePokemon} from '../../services/pokemon';


/*COMPONENTS*/
import SpritesPokemon from '../../components/spritesPokemon';


export default class ChooseYourPokemon extends Component {
  constructor(){
    super();
    this.state={
      numberIdPokemon:12,
      pokemon:''
    }

    this.RandomNumber=this.RandomNumber.bind(this);
    this.triggerUpdatePokemon=this.triggerUpdatePokemon.bind(this);
  }

   async componentDidMount(){
     await this.fetchData();
   }

   async fetchData(){
    await this.RandomNumber();

     const number = this.state.numberIdPokemon;
     const pokemon = await singlePokemon({number});
    
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

  render() {

    
    return (
      this.state.pokemon !== '' &&
      <div>
        <h1>{this.state.pokemon.name}</h1>
        
        <SpritesPokemon 
          name={this.state.pokemon.name}
          src={this.state.pokemon.sprites.front_default} />

        <button onClick={this.triggerUpdatePokemon}>
          Random pokemon
        </button>
        
      </div>
      
    )
  }
}
