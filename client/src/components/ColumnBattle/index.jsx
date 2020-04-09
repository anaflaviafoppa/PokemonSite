import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';

export default class ColumnBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="columnBattle d-flex justify-content-center">
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
                <button onClick={() => this.props.randomPokemon(this.props.pokemon)}>
                  Random Pokemon
                </button>

                <div className="ColumnBattle-img">
                  <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
                </div>

                <h2>{this.props.pokemon.pokemon}</h2>
                <h3>Stats:</h3>
                <ul>
                  <li>Speed: {this.props.pokemon.statsNumber[0]}</li>
                  <li>Special-Defense: {this.props.pokemon.statsNumber[1]}</li>
                  <li>Special-Attack: {this.props.pokemon.statsNumber[2]}</li>
                  <li>Defense: {this.props.pokemon.statsNumber[3]}</li>

                  <li>Attack: {this.props.pokemon.statsNumber[4]}</li>
                </ul>

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
            )}
          </div>
        )}
      </div>
    );
  }
}
