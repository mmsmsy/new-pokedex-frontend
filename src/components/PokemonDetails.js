import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PokemonDetails extends Component{
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null,
      loading: false
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios.get(`/api/pokemons/${this.props.match.params.id}`)
      .then(res => res.data)
      .then(pokemon => {
        this.setState({
          pokemon,
          loading : false
        });
      });
  }
  componentDidUpdate (prevProps) {
    // respond to parameter change in /pokemon/:id url
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId)
      this.componentDidMount()
  }
  render(){
    const id = this.props.match.params.id;
    const outOfRange = (id, addition) => {
      id = parseInt(id,10);
      if ( (id + addition) < 1) return 10090;
      else if ( (id + addition) > 900 && (id + addition) < 10001) return 721;
      else if ( (id + addition) > 10090) return 1;
      else if ( (id + addition) < 900 && (id + addition) > 721) return 10001;
      return id + addition;
    }
    const {loading, pokemon} = this.state;
    if (loading || !pokemon) {
      return (
        <p className="pokemon--loading"> Loading ...</p>
      )
    }
    let pokemonType = '';
    pokemon.types.map(types => pokemonType += types.type.name + ' / ');
    pokemonType = pokemonType.slice(0,-3);

    return (
      <div id="pokemon--details">
        <div className="nav">
          <Link className="nav-back-to-list" to="/">Back to the list</Link>
        </div>
        <div id="pokemon--details--sprite">
          <img src={`/spriteshq/${id}.png`} alt={pokemon.name} />
        </div>
        <table>
          <tbody><tr><td>#</td><td>{pokemon.id}</td></tr></tbody>
          <tbody><tr><td>Name</td><td>{pokemon.name}</td></tr></tbody>
          <tbody><tr><td>Type</td><td>{pokemonType}</td></tr></tbody>
          <tbody><tr><td>Base experience</td><td>{pokemon.base_experience}</td></tr></tbody>
          <tbody><tr><td>Weight</td><td>Avg. {parseFloat(Math.round(pokemon.weight) / 10).toFixed(1)}kg ({parseFloat(Math.round(pokemon.weight * 2) / 100).toFixed(2)} - {parseFloat(Math.round(pokemon.weight*18) / 100).toFixed(2)})</td></tr></tbody>
          <tbody><tr><td>Height</td><td>Avg. {pokemon.height*10}cm ({pokemon.height*6} - {pokemon.height*14})</td></tr></tbody>
        </table>
        <div className="shrink-nav">
          <div className="nav">
            <Link className="nav-prev" to={`/pokemons/${outOfRange(id,-1)}`}>Prev</Link>
            <Link className="nav-next" to={`/pokemons/${outOfRange(id,1)}`}>Next</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonDetails;