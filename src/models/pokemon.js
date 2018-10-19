const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Pokemon= function(){
this.data = null;
};

Pokemon.prototype.bindEvents = function () {

};

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
