import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pokemon extends Component{
  render(){
    const {pokemonName,id} = this.props;
    return (
      <div className="pokemon--item">
          <Link to={`/pokemons/${id}`}>
            <div>{`${id}. ${pokemonName}`}</div>
            <div className="pokemon--item--sprite">
              <img src={`/sprites/${id}.png`} alt={pokemonName} />
            </div>
          </Link>
      </div>
    )
  }
}

export default Pokemon;