import './style.scss';
import React, { Component, Fragment } from 'react';
import { Swipeable } from 'react-swipeable';


class FooterPokemonToggle extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    

    var visibility = 'hide';
    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedDown={this.props.handleMouseUp}>
        <div id="flyoutMenu_ViewScores" className={visibility}>
          <a onMouseUp={this.props.handleMouseUp}>
            {' '}
            <img className="down-icon" src="./../images/down-white.svg" alt="go down icon" />
          </a>

          <h3>{this.props.name}</h3>

          
   
        </div>
      </Swipeable>
    );
  }
}

export default FooterPokemonToggle;