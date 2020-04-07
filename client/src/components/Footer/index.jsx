// components/navbar/Navbar.js

import React, { Component, Fragment } from 'react';
import FooterBattle from '../FooterBattle';
import FooterBattleButton from '../FooterBattleButton';
import FooterPokemonButton from '../FooterPokemonButton';

import './style.scss';


class FooterHome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleBattle: false,
      sidebarBattle: false,
      visibleViewScores: false,
      sidebarViewScores: false,
    };

    this.handleMouseUpBattle = this.handleMouseUpBattle.bind(this);
    this.toggleBattle = this.toggleBattle.bind(this);
    this.toggleSwipeBattle = this.toggleSwipeBattle.bind(this);
    this.handleMouseUpViewPokemon = this.handleMouseUpViewPokemon.bind(this);
    this.toggleViewPokemon = this.toggleViewPokemon.bind(this);
    this.toggleSwipeViewPokemon = this.toggleSwipeViewPokemon.bind(this);
  }

  //for the Toggle AddTask Form
  handleMouseUpBattle() {
    this.toggleBattle();
  }
  
 
  toggleBattle() {
    this.setState({
      visibleBattle: !this.state.visibleBattle
    });
  }

  toggleSwipeBattle() {
    this.setState({
      sidebarBattle: !this.state.sidebarBattle
    });
  }

  //for the Toggle View Pokemon
  handleMouseUpViewPokemon() {
    this.toggleViewPokemon();
  }

  toggleViewPokemon() {
    this.setState({
      visibleViewPokemon: !this.state.visibleViewPokemon
    });
  }
  toggleSwipeViewPokemon() {
    this.setState({
      sidebarViewPokemon: !this.state.sidebarViewPokemon
    });
  }

  
  render() {
   
    return (
      <footer className="footer-style">

      { this.props.user.pokemons.map( pokemon => 
        <Fragment  key={pokemon.pokemon}>
          <FooterPokemonButton
            name={pokemon.pokemon}
            handleMouseUp={this.handleMouseUpViewPokemon}
            menuVisibility={this.state.visibleViewPokemon}
            handleMouseUp={this.handleMouseUpViewPokemon}
            menuVisibility={this.state.visibleViewPokemon}
          />

         
        </Fragment>
      )}

       
        <FooterBattle
          user={this.props.user}
          handleMouseUp={this.handleMouseUpBattle}
          menuVisibility={this.state.visibleBattle}
        />
        
        <FooterBattleButton
          handleMouseUp={this.handleMouseUpBattle}
          menuVisibility={this.state.visibleBattle}
          updateUserInformation={this.props.updateUserInformation}
        />
      </footer>
    );
  }
}

export default FooterHome;