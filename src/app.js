const Pokemon = require('./models/pokemon.js')
const PokemonListView = require('./views/pokemon_list_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log("javascript Loaded");

  const pokedex = document.querySelector('.pokemon-container')
  const pokemonListView = new PokemonListView(pokedex)
  pokemonListView.bindEvents();

  const pokemon = new Pokemon();
  pokemon.bindEvents();
  pokemon.getData();
});
