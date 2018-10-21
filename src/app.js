const Pokemon = require('./models/pokemon.js')
const PokemonListView = require('./views/pokemon_list_view.js')
const ResultView = require('./views/resultView.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log("javascript Loaded");

  const typeSelector = document.querySelector('#pokemon-type')
  const pokedex = document.querySelector('.pokemon-container')
  const pokemonListView = new PokemonListView(pokedex,typeSelector)
  pokemonListView.bindEvents();

  const resultView = new ResultView(pokedex);
  resultView.bindEvents();



  const pokemon = new Pokemon();
  pokemon.bindEvents();
  pokemon.getData();
});
