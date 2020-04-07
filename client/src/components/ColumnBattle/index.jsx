import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class ColumnBattle extends Component {
  constructor(props){
    super(props);
    this.state={

    };

  }

  

  render() {
    return (
      <div>
        {this.props.pokemon &&
          <div>
            <h1>{this.props.pokemon.pokemon}</h1>
            <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
            <ul>
              <li>
                <Button variant="dark" onClick={() => this.props.competitionValue('speed',this.props.pokemon.statsNumber[0])}>
                  Speed: {this.props.pokemon.statsNumber[0]}
                </Button>
              </li>
              <li>
                <Button variant="dark" onClick={() => this.props.competitionValue('special-defense',this.props.pokemon.statsNumber[1])}>
                  Special-Defense: {this.props.pokemon.statsNumber[1]}
                </Button>
              </li>
              <li>
                <Button variant="dark" onClick={() => this.props.competitionValue('special-attack',this.props.pokemon.statsNumber[2])}>
                  Special-Attack: {this.props.pokemon.statsNumber[2]}
                </Button>
              </li>
              <li>
                <Button variant="dark" onClick={() => this.props.competitionValue('defense',this.props.pokemon.statsNumber[3])}>
                  Defense: {this.props.pokemon.statsNumber[3]}
                </Button>
              </li>

              <li>
                <Button variant="dark" onClick={() => this.props.competitionValue('attack',this.props.pokemon.statsNumber[4])}>
                  Attack: {this.props.pokemon.statsNumber[4]}
                </Button>
              </li> 
            </ul>
          
          </div>
        }
      </div>
    )
  }
}
