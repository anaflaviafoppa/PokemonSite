import React from 'react'
import './style.scss';

const Stats = (props) => {
  return (
    <div>
      {props.pokemon.stats.map( stat => 
      <div key={stat.stat.name} className="statsLi">
        <p>{stat.stat.name} :</p> <p>{stat.base_stat}</p>
      </div>
      )}
    </div>
  )
}


export default Stats;
