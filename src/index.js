import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} />
      <Route exact path="/:amount" component={PokemonList} />
      <Route exact path="/" component={PokemonList} />
      <Route path="/pokemons/:id" component={PokemonDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
