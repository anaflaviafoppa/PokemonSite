import React, { Component } from 'react'

export default class SpritesPokemon extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <figure>
        <img src={this.props.src} alt={this.props.name} />
      </figure>
    )
  }
}
