const PubSub = require('../helpers/pub_sub.js')

const ResultView = function(container){
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Pokemon:individualPokemon',(event) => {
    const pokemon = event.detail
    console.log(pokemon);
    this.render(pokemon);

  })
};

ResultView.prototype.render = function (pokemon) {
  this.container.innerHTML = '';
  this.createImage(pokemon);
  this.pokemonInfo(pokemon);

};

ResultView.prototype.createImage = function (pokemon) {
  const div = document.createElement('div');
  div.classList.add('image');
  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default
  div.appendChild(image)
  this.container.appendChild(div);
};

ResultView.prototype.pokemonInfo = function (pokemon) {
  const pokemonWeight = pokemon.weight; //number
  const pokemonHeight = pokemon.height;
  const pokedexNo = pokemon.id;
  const div = document.createElement('div');
  div.classList.add('info');
  const noPara = document.createElement('p')
  noPara.textContent = `No. ${pokedexNo} ${pokemon.name.capitalize()}`;
  div.appendChild(noPara);
  const heightPara = document.createElement('p')
  heightPara.textContent = `Height: ${pokemonHeight} feet`;
  div.appendChild(heightPara);
  const weightPara = document.createElement('p')
  weightPara.textContent = `Weight:  ${pokemonWeight} lbs`;
  div.appendChild(weightPara);
this.container.appendChild(div);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);}

module.exports = ResultView;
