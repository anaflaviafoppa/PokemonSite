import './style.scss';
import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';

import Stats from '../Stats';



class FooterAddTasksToggle extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    
    return (
      <Swipeable onSwipedRight={this.props.handleMouseUp}>
        <div id="flyoutMenu_Pokemon" className={visibility}>
          <div >
            <h2 onMouseUp={this.props.handleMouseUp}>Choose your pokemon</h2>
            <img onClick={this.props.handleMouseUp}  className="arrow-icon" src="./../../../images/close.svg" alt="close" />
          </div>
          
       
          {this.props.user.pokemons.map(pokemon =>
            <div key={pokemon.pokemon}>
              <h1>{pokemon.pokemon}</h1>
              <img alt={pokemon.pokemon} src={pokemon.picture}></img>
              <h2>Abilities:</h2>
              <ul>
                {pokemon.abilities.map( ability => 
                <li key={ability}>{ability}</li>
                )}
              </ul>

              <h2>Stats: </h2>
              <ul>
                {pokemon.statsNumber.map( stat => 
                <li key={stat}>{stat}</li>
                )}
              </ul>
            </div>
          )}

        </div>
      </Swipeable>
    );
  }
}

export default FooterAddTasksToggle;
