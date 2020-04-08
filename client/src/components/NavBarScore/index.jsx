
import './style.scss';
import React, { Component } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';





class NavBarScore extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedLeft={this.props.handleMouseDownScore}>
        <div id="flyoutMenu" className={visibility}>
          <Button onMouseDown={this.props.handleMouseDownScore}>
            <img
              style={{
                width: '2em',
                float: 'left',
                position: 'relative',
                margin: '2em 1em'
              }}
              src="./../images/left-white.svg"
              alt="go back icon"
            />
          </Button>

          <h1>SCORE:</h1>
          <ol>
          {this.props.users.map(user => 
            <div key={user._id}>
                <li>
                  <h2>{user.name}</h2>
                  <h3>{user.score}</h3>
                </li>
            </div>
          )}
          </ol>
        </div>


        
      </Swipeable>
    );
  }
}

export default NavBarScore;