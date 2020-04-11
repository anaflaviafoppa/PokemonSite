import React from 'react';
import { MdCached } from 'react-icons/md';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/*COMPONENTS*/
import SpritesPokemon from '../spritesPokemon';
import Stats from '../Stats';

import './style.scss';

const RandomPokemon = (props) => {
  return (
    <div className="columnBattle randomPokemon">
      {props.battle ? (
        <div>
          <h2>{props.pokemon.name}</h2>
          <div className="ColumnBattle-img">
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
          </div>
          <div className="question-mark">
            <h2>Your Opponent:</h2>
            <img src="./images/question.png" alt="question"></img>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="btn-refresh-pokemon">
            <h3>HP: {props.pokemon.stats[5].base_stat}</h3>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to refresh!</Tooltip>}>
              <span className="d-inline-block">
                <button
                  className="random-btn"
                  onClick={() => props.triggerUpdatePokemon(props.originPokeball)}
                >
                  Refresh <MdCached />
                </button>
              </span>
            </OverlayTrigger>
          </div>

          <div className="ColumnBattle-img">
            <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
          </div>
          <h2>{props.pokemon.name}</h2>

          <div className="row">
            <div className="col-4">
              <div className="row row-type-abilities">
                <h3>Type:</h3>
                <ul>
                  <li className="stats">{props.pokemon.types[0].type.name}</li>
                </ul>
              </div>
              <div className="row row-type-abilities">
                <h3>Abilities:</h3>
                <ul>
                  {props.pokemon.abilities.map((ability) => (
                    <li className="stats" key={ability.ability.name}>
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-8">
              <h3>Stats: </h3>
              <Stats className="stats" pokemon={props.pokemon} />
            </div>
          </div>

          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to catch!</Tooltip>}>
            <span className="d-inline-block d-flex justify-content-center">
              <button className="pokeball" onClick={props.addPokemon}>
                <img src="./images/pokeball.png" alt="pokeball" />
              </button>
            </span>
          </OverlayTrigger>
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;
