import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*COMPONENTS*/
import NavBar from './../../components/NavBar';
import ColumnBattle from './../../components/ColumnBattle';

/*Services*/
import UserAll from './../../services/userall';


export default class Pokemons extends Component {
  constructor(){
    super();
    this.state={
      users:[]
    }

    this.triggerUpdateUsersForScore=this.triggerUpdateUsersForScore.bind(this);
  };

  async componentDidMount(){ 
    await this.fetchData();
  };

  /*FETCH DATA */
  async fetchData(){
    
  await this.props.loadUserInformation;
    
      
     /*after add some pokemon will refresh the pokemon*/
  await this.triggerUpdateUsersForScore();
     
  };

  async triggerUpdateUsersForScore(){
    const users = await UserAll();
    this.setState({users});
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

      <section>
        <h1>Choose your next Pokemon to play:</h1>

        <div className="row">
          {this.props.user.pokemons.map(pokemon =>
          <div className="col">
            <Link
              to={{
                  pathname: '/battle',
                  state: {
                    pokemonUser: pokemon
                  }
                }}>
              <ColumnBattle pokemon={pokemon} battle={false}/>
            </Link>
           
          </div>
          )}
        </div>
      </section>
        

      </div>
    )
  }
}
