import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pokemon from './/Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons : [],
      fetched : false,
      loading : false
    }
  }
  componentDidMount() {
    this.setState({
      loading : true
    });
    axios.get(`/api/listpokemons`)
      .then(res => res.data)
      .then(pokemons => {
        this.setState({
          pokemons,
          fetched : true
        });
      });
  }
  componentDidUpdate (prevProps) {
    // respond to parameter change in /pokemon/:id url
    let oldAmount = prevProps.match.params.amount;
    let newAmount = this.props.match.params.amount;
    if (newAmount !== oldAmount)
      this.componentDidMount()
  }
  render() {
    // return next or previous number based on the part of the list you're at, so that you can generate links or pokemon--list (when slice === true) dynamically
    const showThesePokemon = (addition, slicing = false) => {
      let amount = parseInt(this.props.match.params.amount,10);
      if ( ((amount + addition) < 1 && !slicing) || ((amount + addition ) > 899 && !slicing)) return '';
      if ( ((amount + addition) < 1 && slicing) || ((amount + addition ) > 899 && slicing)) return 811;
      else if ( (amount + addition) >= 0 && (amount + addition <= 800) ) return amount + addition;
      else if ( (amount + addition) > 800) return 800;
      else if ( isNaN(amount) && addition > 0 ) return addition;
      else if ( isNaN(amount) && addition < 0 ) return 800;
    }
    const {fetched, loading} = this.state;
    const pokemons = this.state.pokemons
                      .sort((a,b) => a.id - b.id)
                      .slice(showThesePokemon(0),showThesePokemon(100,true))
                      .map(pokemon => <Pokemon key={pokemon.name} id={pokemon.id} pokemonName={pokemon.name}/>)
    
    if(fetched){
      return (
        <div id="pokemon--list">
          <div className="nav">
            <Link className="nav-prev" to={`/${showThesePokemon(-100)}`}>Prev 100</Link>
            <Link className="nav-next" to={`/${showThesePokemon(100)}`}>Next 100</Link>
          </div>
          {pokemons}
          <div className="nav">
            <Link className="nav-prev" to={`/${showThesePokemon(-100)}`}>Prev 100</Link>
            <Link className="nav-next" to={`/${showThesePokemon(100)}`}>Next 100</Link>
          </div>
        </div>
      );
    } else if(loading && !fetched) return <p id="pokemon--loading"> Loading ...</p>;
    return <div/>;
  }
}

export default PokemonList;