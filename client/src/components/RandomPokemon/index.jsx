import React from 'react';

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
            <h3>Your Opponent:</h3>
            <img src="./images/question.png" alt="question"></img>
          </div>
          
        </div>
      ) : (
        <div>
          <h2>{props.pokemon.name}</h2>
          <SpritesPokemon name={props.pokemon.name} src={props.pokemon.sprites.front_default} />
          <h2>Abilities:</h2>
          <ul>
            {props.pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>

          <h2>Type:</h2>
          <p>{props.pokemon.types[0].type.name}</p>

          <h2>Stats: </h2>
          <Stats pokemon={props.pokemon} />
        </div>
      )}
    </div>

    // <div>
    //   {props.pokemon !== undefined &&
    //   <div>
    //     <h1>{props.pokemon.name}</h1>

    //     {/* <SpritesPokemon
    //       name={props.pokemon.name}
    //       src={props.pokemon.sprites.front_default}
    //     /> */}

    //     {!this.props.battle &&
    //       <div>
    //         <h2>Abilities:</h2>
    //         <ul>
    //           {props.pokemon.abilities.map( ability =>
    //           <li key={ability.ability.name}>{ability.ability.name}</li>
    //           )}
    //         </ul>

    //         <h2>Type:</h2>
    //         <p>{props.pokemon.types[0].type.name}</p>

    //         <h2>Stats: </h2>
    //         <Stats pokemon={props.pokemon} />
    //       </div>
    //     }
    //   </div>}
    // </div>
  );
};

export default RandomPokemon;
