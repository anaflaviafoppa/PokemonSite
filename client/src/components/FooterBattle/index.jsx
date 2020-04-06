import './style.scss';
import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';


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
        <div id="flyoutMenu_AddTask" className={visibility}>
          <div >
            <h2 onMouseUp={this.props.handleMouseUp}>Choose your pokemon</h2>
            <img onClick={this.props.handleMouseUp}  className="arrow-icon" src="./../../../images/close.svg" alt="close" />
          </div>
          
       
          HEHEHE

        </div>
      </Swipeable>
    );
  }
}

export default FooterAddTasksToggle;
