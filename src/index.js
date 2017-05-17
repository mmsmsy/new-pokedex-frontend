import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './sass/styles.css';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} />
      <Route exact path="/" component={PokemonList} />
      <Route exact path="/:amount" component={PokemonList} />
      <Route path="/pokemons/:id" component={PokemonDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
