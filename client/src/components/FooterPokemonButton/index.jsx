import React, { Component, Fragment } from 'react';
import FooterPokemonToggle from '../FooterPokemonToggle';

import './style.scss';


class FooterPokemonButton extends Component {
  constructor(props){
    super(props);
    
  };


  render() {
   
    return (
      
      <div className="scores-task">
        
          <Fragment>
            <button onMouseUp={this.props.handleMouseUp}>
              {/* <img className="scores-btn" src={this.state.pokemon.sprites.front_default} alt={this.props.name} />  */}
              <small>{this.props.name}</small>
            </button>
            
            <FooterPokemonToggle
              name={this.props.name}
              handleMouseUp={this.props.handleMouseUp}
              menuVisibility={this.props.menuVisibility}
            />

           

          </Fragment>
        
      </div>
      
    );
  }
}

export default FooterPokemonButton;
