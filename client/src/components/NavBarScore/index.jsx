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
          <button className="btn-swipe" onMouseDown={this.props.handleMouseDownScore}>
            <img
              style={{
                width: '2em',
                float: 'left',
                position: 'relative',
                margin: '2em 1em',
              }}
              src="./../images/left-white.svg"
              alt="go back icon"
            />
          </button>

          <div className="d-flex justify-content-center">
            <div className="crown-div">
              <img src="./images/crown.svg" alt="crown"></img>
            </div>
          </div>

          <h1>SCORE:</h1>
          <ol>
            {this.props.users.map((user) => (
              <li key={user._id}>
                <div className="list-score">
                  <img src={user.picture} alt="profile" />
                  <h2>{user.name}</h2>
                  <h3>{user.score}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarScore;
