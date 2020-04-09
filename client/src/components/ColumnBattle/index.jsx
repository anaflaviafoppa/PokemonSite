import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdCached } from "react-icons/md";


import './style.scss';

export default class ColumnBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="columnBattle">
        {this.props.pokemon && (
          <div>
            {this.props.battle ? (
              <div>
                <h2>{this.props.pokemon.pokemon}</h2>
                <div className="ColumnBattle-img">
                  <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
                </div>
                <ul>
                  <li>
                    <button
                      onClick={() =>
                        this.props.competitionValue('speed', this.props.pokemon.statsNumber[0])
                      }
                    >
                      Speed: {this.props.pokemon.statsNumber[0]}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        this.props.competitionValue(
                          'special-defense',
                          this.props.pokemon.statsNumber[1]
                        )
                      }
                    >
                      Special-Defense: {this.props.pokemon.statsNumber[1]}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        this.props.competitionValue(
                          'special-attack',
                          this.props.pokemon.statsNumber[2]
                        )
                      }
                    >
                      Special-Attack: {this.props.pokemon.statsNumber[2]}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        this.props.competitionValue('defense', this.props.pokemon.statsNumber[3])
                      }
                    >
                      Defense: {this.props.pokemon.statsNumber[3]}
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() =>
                        this.props.competitionValue('attack', this.props.pokemon.statsNumber[4])
                      }
                    >
                      Attack: {this.props.pokemon.statsNumber[4]}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className={this.props.style}>
              <div className="btn-refresh-pokemon">
                <h3>HP: {this.props.pokemon.statsNumber[5]}</h3>
                <button onClick={() => this.props.randomPokemon(this.props.pokemon)}>
                  <MdCached />
                </button>
              </div>
                

                <div className="ColumnBattle-img">
                  <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
                </div>

                <h2>{this.props.pokemon.pokemon}</h2>

                <div className="row">
                  <div className="col-5">
                    <h3>Abilities:</h3>
                    <ul>
                      {this.props.pokemon.abilities.map((ability) => (
                        <li key={ability}>{ability}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-7 p-0">
                    <h3>Stats:</h3>
                    <ul>
                      <li>Speed: {this.props.pokemon.statsNumber[0]}</li>
                      <li>Special-Defense: {this.props.pokemon.statsNumber[1]}</li>
                      <li>Special-Attack: {this.props.pokemon.statsNumber[2]}</li>
                      <li>Defense: {this.props.pokemon.statsNumber[3]}</li>
                      <li>Attack: {this.props.pokemon.statsNumber[4]}</li>
                      
                    </ul>
                  </div>
                </div>

                <div className="row row-choose">
                  <Link
                    to={{
                      pathname: '/battle',
                      state: {
                        pokemonUser: this.props.pokemon,
                      },
                    }}
                  >
                    <button>Choose</button>
                  </Link>
                </div>        
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
