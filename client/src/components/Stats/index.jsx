import React from 'react'

const Stats = (props) => {
  return (
    <ul>
      {props.pokemon.stats.map( stat => 
      <li key={stat.stat.name}>
        {stat.stat.name} : {stat.base_stat}
      </li>
      )}
    </ul>
  )
}


export default Stats;
