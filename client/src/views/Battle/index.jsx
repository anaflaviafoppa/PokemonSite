import React, { Component } from 'react';

/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import ColumnBattle from './../../components/ColumnBattle';
import RandomPokemon from './../../components/RandomPokemon';

/*Services*/
import {single as singlePokemon} from '../../services/pokemon';
import {editUser} from '../../services/pokemon';
import {editUserCounters} from '../../services/pokemon';
import UserAll from './../../services/userall';


export default class Battle extends Component {
  constructor(){
    super();
    this.state={
      users:[],
      numberIdPokemon:0,
      pokemon:'',
      pokemonUser:''
    }

    this.RandomNumber=this.RandomNumber.bind(this);
    this.triggerUpdateUsersForScore=this.triggerUpdateUsersForScore.bind(this);
    this.triggerPokemon=this.triggerPokemon.bind(this);
    this.competitionValue=this.competitionValue.bind(this);
  };

  async componentDidMount(){ 
    await this.fetchData();
  };

  /*FETCH DATA */
  async fetchData(){
    
    await this.props.loadUserInformation;
    
    await this.RandomNumber();

     const number = this.state.numberIdPokemon;

     /*WILL VERIFY IF THE USERS ALREADY HAVE THE MAX */
     const pokemon = await this.triggerPokemon(number);
     const pokemonUser  = this.props.location.state.pokemonUser;
    
     
     this.setState({pokemon, pokemonUser});
      
     /*after add some pokemon will refresh the pokemon*/
     await this.triggerUpdateUsersForScore();
     
  };

  
  /*API REQ. FOR SINGLE POKEMON*/
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


async triggerUpdateUsersForScore(){
  const users = await UserAll();
  this.setState({users});
}


/*COMPARE VALUES*/
async competitionValue(nameOfAbility, userValue){
  let points;
  switch (nameOfAbility) {
    case 'speed':
      points=8;
      break;
    case 'special-defense':
      points=15;
      break;
    case 'special-attack':
      points=18;
      break;
    case 'defense':
      points=12;
      break;
    default:
      points=10;
      break;
  }

  const pokemon = this.state.pokemon;
  const valueEnemy = pokemon.stats.find( element => element.stat.name === nameOfAbility );

  if(valueEnemy.base_stat > userValue){
   //'ENEMY WINS'

  }else if(valueEnemy.base_stat < userValue){
    //'USER WINS'
    await editUser
  }else{
    //'DRAW'
  }
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
        { this.state.pokemon !== '' &&
        <section>
          <div className="row">
            <div className="col">
              <ColumnBattle pokemon={this.state.pokemonUser} competitionValue={this.competitionValue}/>
            </div>

            <div className="col">
              <RandomPokemon battle={true} pokemon={this.state.pokemon} />
            </div>
          </div>
        </section>}

        
      </div>
    )
  }
}
