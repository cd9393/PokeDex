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
    listItem.id = pokemon.name;
    listItem.value = pokemon.name;
    listItem.textContent = pokemon.name;
    listItem.addEventListener("click",(event) => {
      const selectedPokemon = event.target.id;
      PubSub.publish("pokemonListView: Pokemon-selected",selectedPokemon)
    })
    pokedex.appendChild(listItem)
  })
  return pokedex;
};

module.exports = PokemonListView;
