const PubSub = require('../helpers/pub_sub.js')

const ResultView = function(container){
  this.container = container;
  this.individualPokemon = null;
  this.additionalInfo = null;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Pokemon:individualPokemon',(event) => {
    const pokemon = event.detail
    this.individualPokemon = pokemon
    this.render(pokemon);

  })

  PubSub.subscribe('Pokemon:additionInfoPokemon', (event) => {
    const info = event.detail
    this.additonalInfo = info;

  })
};

ResultView.prototype.render = function (pokemon) {
  this.container.innerHTML = '';
  this.createHeader(pokemon)
  this.createImage(pokemon);
  this.pokemonStats(pokemon);
  this.renderDescription()

};

ResultView.prototype.createHeader = function (pokemon) {
  const header = document.createElement('div')
  header.classList.add('header')
  header.textContent = pokemon.name.capitalize();
  this.container.appendChild(header);
};

ResultView.prototype.findEnglish = function (flavorText){
  const english = flavorText.filter((text) => {
    return text.language.name ==="en"
  })
  return english
};

ResultView.prototype.renderDescription = function () {
  console.log(this.additonalInfo);
  const species = this.additonalInfo.genera[2].genus;
  const speciesDiv = document.createElement('div')
  speciesDiv.classList.add('species')
  speciesDiv.textContent = species
  const descriptionDiv = document.createElement('div')
  descriptionDiv.classList.add('description')
  const description = this.findEnglish(this.additonalInfo.flavor_text_entries)
  descriptionDiv.textContent = description[0].flavor_text;
  this.container.appendChild(speciesDiv);
  this.container.appendChild(descriptionDiv);


};

ResultView.prototype.pokemonStats = function (pokemon) {
  const stats = pokemon.stats;
  const infoBox = document.createElement('div')
  infoBox.classList.add('infobox')
  const statsBox = document.createElement('div')
  statsBox.classList.add('stats');
  stats.forEach((status) => {
    const statsRow = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = status.stat.name;
    statsRow.appendChild(span);
    const attribute = document.createElement('span')
    attribute.textContent= status.base_stat;
    statsRow.appendChild(attribute);
    statsBox.appendChild(statsRow);
  })
  infoBox.appendChild(this.createImage(this.individualPokemon))
  infoBox.appendChild(statsBox)
  this.container.appendChild(infoBox)
};

ResultView.prototype.createImage = function (pokemon) {
  const div = document.createElement('div');
  div.classList.add('image');
  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default
  div.appendChild(image)
  return div
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
