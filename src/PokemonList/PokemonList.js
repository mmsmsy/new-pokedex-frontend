import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

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
    const howMany = (addition, slicing = false) => {
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
                      .slice(howMany(0),howMany(100,true))
                      .map(pokemon => <Pokemon key={pokemon.name} id={pokemon.id} pokemonName={pokemon.name}/>)
    
    if(fetched){
      return (
        <div className="pokemon--species--list">
          <Link className="link--to--next--list" to={`/${howMany(100)}`}>Next 100</Link>
          <Link className="link--to--prev--list" to={`/${howMany(-100)}`}>Prev 100</Link>
          {pokemons}
          <div id="lower--nav">
            <Link className="link--to--next--list2" to={`/${howMany(100)}`}>Next 100</Link>
            <Link className="link--to--prev--list2" to={`/${howMany(-100)}`}>Prev 100</Link>
          </div>
        </div>
      );
    }else if(loading && !fetched){
        return <p className="pokemon--loading"> Loading ...</p>;
    }
    else{
      return <div/>;
    }
  }
}

export default PokemonList;