import React, { Component } from 'react';

import './style.scss';

class FooterBattleButton extends Component {
  render() {
    return (
      <div className="add-task">
        <button onMouseUp={this.props.handleMouseUp}>
          <img className="add-btn" src="./../../../images/add.svg" alt="add" />
        </button>
        <small>Battle</small>
    </div>

    );
  }
}

export default FooterBattleButton;