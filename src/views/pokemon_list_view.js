const PubSub = require('../helpers/pub_sub.js')

const PokemonListView = function(container){
  this.container = container;
};

PokemonListView.prototype.bindEvents = function () {
  PubSub.subscribe('Pokemon:pokemon-data-loaded',(event) => {
    const pokemon = event.detail
    const pokedex = this.createPokedex(pokemon);
    this.container.appendChild(pokedex)
  })
};

PokemonListView.prototype.createPokedex = function (pokemonArray) {
  const pokedex = document.createElement('ul');
  pokedex.classList.add('pokedex');
  pokemonArray.forEach((pokemon) => {
    const listItem = document.createElement('li');
    listItem.textContent = pokemon.name;
    pokedex.appendChild(listItem)
  })
  return pokedex;
};

module.exports = PokemonListView;
