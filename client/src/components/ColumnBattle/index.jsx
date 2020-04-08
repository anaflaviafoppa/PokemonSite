import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import './style.scss';

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
          { this.props.battle ?
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
            </div> : 
            <div className={this.props.style}>
              <h1>{this.props.pokemon.pokemon}</h1>
              <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
              <ul>
                <li>
                  
                    Speed: {this.props.pokemon.statsNumber[0]}
                  
                </li>
                <li>
                  
                    Special-Defense: {this.props.pokemon.statsNumber[1]}
                  
                </li>
                <li>
                  
                    Special-Attack: {this.props.pokemon.statsNumber[2]}
                  
                </li>
                <li>
                  
                    Defense: {this.props.pokemon.statsNumber[3]}
                  
                </li>

                <li>
                  
                    Attack: {this.props.pokemon.statsNumber[4]}
                  
                </li> 
              </ul>


              
            </div>
            }
          
          </div>
        }
      </div>
    )
  }
}
