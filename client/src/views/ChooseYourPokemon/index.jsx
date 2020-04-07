import React, { Component } from 'react'

/*Packages*/
import { Button } from 'react-bootstrap';


/*Services*/
import {single as singlePokemon} from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import {editUserCounters} from '../../services/pokemon';
import UserAll from './../../services/userall';


/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import FooterHome from './../../components/Footer';
import RandomPokemon from './../../components/RandomPokemon';



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
    this.triggerPokemon=this.triggerPokemon.bind(this);
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
     const pokemon = await this.triggerPokemon(number);
     
     this.setState({pokemon});
      
     
    
     /*after add some pokemon will refresh the pokemon*/
     await this.triggerUpdateUsersForScore();
     
   }

   async triggerPokemon(number){
     
      const pokemon = await singlePokemon({number});
      console.log('triggerPokemon');
      return pokemon;
      
      
   }

   async RandomNumber(){
    /*RANDOM NUMBER FUNCTION*/
     const randomNumber = Math.floor(Math.random() * (500 - 1)) + 1;
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
    
    if(this.props.user.pokemons.length < 3){
      
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

            <RandomPokemon battle={false} pokemon={this.state.pokemon} />

            <Button variant="primary" 
            onClick={() => this.triggerUpdatePokemon(originPokeball)}>
              Random pokemon
            </Button>

            <button onClick={this.addPokemon}>
            
            <img 
              src="./../images/pokeball.svg"
              alt="pokeball" />
            </button>
            

            <FooterHome
              loadUserInformation={this.props.loadUserInformation}
              user={this.props.user}

            />
          </div>
        }
      </div>
      
      
    )
  }
}
