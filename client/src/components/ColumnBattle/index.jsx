import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdCached } from 'react-icons/md';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
          <div className="columnBattle-battle ">
            {this.props.battle ? (
              <div>
                <h2>{this.props.pokemon.pokemon}</h2>
                <div className="ColumnBattle-img">
                  <img src={this.props.pokemon.picture} alt={this.props.pokemon.pokemon} />
                </div>
                <h3 className="h3-battle">Choose the stats to battle:</h3>
                <ul>
                  <li>
                    <button
                      className="btn-battle"
                      onClick={() =>
                        this.props.competitionValue('speed', this.props.pokemon.statsNumber[0])
                      }
                    >
                      <p>Speed:</p> <p>{this.props.pokemon.statsNumber[0]}</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn-battle"
                      onClick={() =>
                        this.props.competitionValue(
                          'special-defense',
                          this.props.pokemon.statsNumber[1]
                        )
                      }
                    >
                      <p>Special-Defense:</p> <p>{this.props.pokemon.statsNumber[1]}</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn-battle"
                      onClick={() =>
                        this.props.competitionValue(
                          'special-attack',
                          this.props.pokemon.statsNumber[2]
                        )
                      }
                    >
                      <p>Special-Attack:</p> <p>{this.props.pokemon.statsNumber[2]}</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn-battle"
                      onClick={() =>
                        this.props.competitionValue('defense', this.props.pokemon.statsNumber[3])
                      }
                    >
                      <p>Defense:</p> <p>{this.props.pokemon.statsNumber[3]}</p>
                    </button>
                  </li>

                  <li>
                    <button
                      className="btn-battle"
                      onClick={() =>
                        this.props.competitionValue('attack', this.props.pokemon.statsNumber[4])
                      }
                    >
                      <p>Attack:</p> <p>{this.props.pokemon.statsNumber[4]}</p>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className={this.props.style}>
                <div className="img-star-heart">
                  {this.props.style === 'disabled' ? (
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {this.props.pokemon.pokemon} needs to rest
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <img src="./images/heart.png" alt="heart" />
                      </span>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          {this.props.pokemon.pokemon} is ready to battle!
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <img src="./images/star.png" alt="start" />
                      </span>
                    </OverlayTrigger>
                  )}
                </div>
                
                  <div className="btn-refresh-pokemon">
                    <h3>HP: {this.props.pokemon.statsNumber[5]}</h3>
                    {this.props.score > 25 && (
                      <div>
                    {this.props.style !== 'disabled' && (
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">This will cost you 25 points!</Tooltip>
                        }
                      >
                        <span className="d-inline-block">
                          <button onClick={() => this.props.randomPokemon(this.props.pokemon)}>
                            Change <MdCached />
                          </button>
                        </span>
                      </OverlayTrigger>
                    )}
                    </div>)}
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
                {this.props.style !== 'disabled' && (
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
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
