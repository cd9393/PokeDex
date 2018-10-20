const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Pokemon= function(){
this.data = null;
};

Pokemon.prototype.bindEvents = function () {
PubSub.subscribe("pokemonListView: Pokemon-selected", (event) => {
  const selectedPokemon = event.detail;
 this.getIndividualData(selectedPokemon);

})
};

Pokemon.prototype.getIndividualData = function (individualPokemon) {
  const url= `https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`;
  const request = new Request(url);

  request.get().then(data => {
    console.log(data);
  PubSub.publish('Pokemon:individualPokemon', data);
  })
}

Pokemon.prototype.getData = function () {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const request = new Request(url);

  request.get().then(data => {
    this.data = data.results;
  PubSub.publish('Pokemon:pokemon-data-loaded', this.data);
  })
  // request.get((data) => {
  //   this.data = data.message;
  //   PubSub.publish('Dogs:dog-data-loaded', this.data);
  // });
}

module.exports = Pokemon;
