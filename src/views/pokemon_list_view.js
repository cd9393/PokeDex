const PubSub = require('../helpers/pub_sub.js')

const PokemonListView = function(container,element){
  this.container = container;
  this.element = element;
};

PokemonListView.prototype.bindEvents = function () {
  PubSub.subscribe('Pokemon:pokemon-data-loaded',(event) => {
    const pokemon = event.detail
    const pokedex = this.createPokedex(pokemon);
    this.container.appendChild(pokedex)
  })
  PubSub.subscribe('Pokemon:pokemon-types-loaded', (event) => {
    const typesArray = event.detail
    this.populate(typesArray)
  })
  this.element.addEventListener('change', (evt) => {
    const selectedType = evt.target.value;
    PubSub.publish('PokemonListViewchange', selectedType);
  });

  PubSub.subscribe('Pokemon:pokemon-filtered-by-types', (event) => {
    const pokemon = event.detail
    this.container.innerHTML = ''

    const filter = this.createFilteredList(pokemon)
    this.container.appendChild(filter)


  })
};

PokemonListView.prototype.createFilteredList = function (pokemonArray) {
  const filteredList = document.createElement('ul');
  filteredList.classList.add('pokedex');
  pokemonArray.forEach((pokemon) => {
    const listItem = document.createElement('li');
    listItem.id = pokemon.pokemon.name;
    listItem.value = pokemon.pokemon.name;
    listItem.textContent = `${pokemon.pokemon.name.capitalize()}`;
    listItem.addEventListener("click",(event) => {
      const selectedPokemon = event.target.id;
      PubSub.publish("pokemonListView: Pokemon-selected",selectedPokemon)
    })
    filteredList.appendChild(listItem)
  })
  return filteredList;
};

PokemonListView.prototype.populate = function(types){
  types.forEach((type) => {
    const option = document.createElement('option');
    option.textContent = type.name;
    option.value = type.name;
    this.element.appendChild(option);
  })
}

PokemonListView.prototype.createPokedex = function (pokemonArray) {
  const pokedex = document.createElement('ul');
  pokedex.classList.add('pokedex');
  pokemonArray.forEach((pokemon,index) => {
    const number = index+=1;
    const listItem = document.createElement('li');
    listItem.id = pokemon.name;
    listItem.value = pokemon.name;
    listItem.textContent = `-----No${number}  ${pokemon.name.capitalize()}`;
    listItem.addEventListener("click",(event) => {
      const selectedPokemon = event.target.id;
      PubSub.publish("pokemonListView: Pokemon-selected",selectedPokemon)
    })
    pokedex.appendChild(listItem)
  })
  return pokedex;
};

module.exports = PokemonListView;
