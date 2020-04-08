import React, { Component, Fragment } from 'react';


import './style.scss';


class FooterPokemonButton extends Component {
  constructor(props){
    super(props);
  };


  render() {
   
    return (
      
      <div className="scores-task">
        
          <Fragment>
            <div>
              <img className="scores-btn" src={this.props.picture} alt={this.props.name} />
              <small>{this.props.name}</small>
            </div>
            
          </Fragment>
        
      </div>
      
    );
  }
}

export default FooterPokemonButton;
