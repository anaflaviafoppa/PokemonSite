import React, { Component, Fragment } from 'react'

/*Packages*/
import { Button } from 'react-bootstrap';


/*Services*/
import {single as singlePokemon} from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import {editUserCounter} from '../../services/pokemon';
import UserAll from './../../services/userall';
import { singleUser } from '../../services/pokemon';


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
      users:[],
      user:''
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
    
    const id = this.props.user._id;

    const userlogData = await singleUser({ id });
    const userlog = userlogData.data;
    
    this.setState({
      user: userlog
    });

    
    
    await this.RandomNumber();

     const number = this.state.numberIdPokemon;

     /*WILL VERIFY IF THE USERS ALREADY HAVE THE MAX */
     const pokemon = await this.triggerPokemon(number);
     
     this.setState({pokemon});
      
     
    
     /*after add some pokemon will refresh the pokemon*/
     await this.triggerUpdateUsersForScore();

     if(this.state.user.pokemons.length >= 3){
      this.props.history.push('/pokemons');
    }
     
   }

   async triggerPokemon(number){
     
      const pokemon = await singlePokemon({number});
      
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
      await this.props.loadUserInformation();

      const counterRandom = this.props.user.counterRandom+1;
      const id = this.props.user._id;

      await editUserCounter({id, counterRandom});


      if(counterRandom > 2){
        await this.addPokemon();
      }
      

      
    }
      
    await this.fetchData();
   }

  async triggerUpdateUsersForScore(){
    const users = await UserAll();
    this.setState({users});
  }

  async addPokemon(){
    
    if(this.props.user.pokemons.length < 3){
      const score = this.props.user.score;
      const counterRandom = this.props.user.counterRandom;
      const id = this.props.user._id;
      const pokemon = this.state.pokemon.name;

      await editUser({id,pokemon, score, counterRandom});


      const originPokeball = true;
      this.triggerUpdatePokemon(originPokeball);
    }
    
  }

  render() {
    const originPokeball = false;
    
    return (
      <div className="content">
        <NavBar
          user={this.props.user}
          users={this.state.users}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
          updateUsersScore={this.triggerUpdateUsersForScore}
          redirectPage={'/home'}
        />

        {this.state.pokemon !== '' &&
          <div className="body">

            <RandomPokemon battle={false} 
            pokemon={this.state.pokemon} 
            userPokemon={this.state.user.pokemons.length < 3} 
            triggerUpdatePokemon={this.triggerUpdatePokemon}
            originPokeball={false}
            addPokemon={this.addPokemon}
            />
            
            <FooterHome
              loadUserInformation={this.props.loadUserInformation}
              user={this.state.user}

            />
          </div>
        }
      </div>
      
      
    )
  }
}
