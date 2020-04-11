import React, { Component } from 'react';


import './style.scss';


class FooterPokemonButton extends Component {
  constructor(props){
    super(props);
  };


  render() {
   
    return (
      
      <div className="pokeball-pokemon">
        
          
            <div>
              <img src={this.props.picture} alt={this.props.name} />
              <small>{this.props.name}</small>
            </div>
            
          
        
      </div>
      
    );
  }
}

export default FooterPokemonButton;
