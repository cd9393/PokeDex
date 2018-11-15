/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Pokemon = __webpack_require__(/*! ./models/pokemon.js */ \"./src/models/pokemon.js\")\nconst PokemonListView = __webpack_require__(/*! ./views/pokemon_list_view.js */ \"./src/views/pokemon_list_view.js\")\nconst ResultView = __webpack_require__(/*! ./views/resultView.js */ \"./src/views/resultView.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log(\"javascript Loaded\");\n\n  const typeSelector = document.querySelector('#pokemon-type')\n  const pokedex = document.querySelector('.pokemon-container')\n  const pokemonListView = new PokemonListView(pokedex,typeSelector)\n  pokemonListView.bindEvents();\n\n  const resultView = new ResultView(pokedex);\n  resultView.bindEvents();\n\n\n\n  const pokemon = new Pokemon();\n  pokemon.bindEvents();\n  pokemon.getData();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n}\n\n  Request.prototype.get = function () {\n    return fetch(this.url).then(response => response.json());\n  };\n  module.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/pokemon.js":
/*!*******************************!*\
  !*** ./src/models/pokemon.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\nconst Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\")\n\nconst Pokemon= function(){\n  this.data = null;\n};\n\nPokemon.prototype.bindEvents = function () {\n  this.getTypes();\n  PubSub.subscribe(\"pokemonListView: Pokemon-selected\", (event) => {\n    const selectedPokemon = event.detail;\n\n    this.getIndividualData(selectedPokemon);\n\n  })\n  PubSub.subscribe('PokemonListViewchange', (event) => {\n    const types = event.detail\n    this.getTypesPokemon(types)\n\n  })\n\n  PubSub.subscribe('PokemonListView:search-input',(event) => {\n    const searchTerms = event.detail;\n    const searchResults = this.data.filter((pokemon) => {\n      return pokemon.name.includes(searchTerms)\n    })\n    PubSub.publish(\"Pokemon:searchResults\",searchResults)\n  })\n};\n\nPokemon.prototype.getTypesPokemon = function (types) {\n  const url = `https://pokeapi.co/api/v2/type/${types}/`;\n  const request = new Request(url);\n\n  request.get().then(data => {\n    console.log(data);\n    PubSub.publish('Pokemon:pokemon-filtered-by-types', data.pokemon);\n  })\n};\n\nPokemon.prototype.getTypes = function () {\n  const url = \"https://pokeapi.co/api/v2/type/\";\n  const request = new Request(url);\n\n  request.get().then(data => {\n    PubSub.publish('Pokemon:pokemon-types-loaded', data.results);\n  })\n};\n\nPokemon.prototype.getIndividualData = function (individualPokemon) {\n  const url= `https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`;\n  const request = new Request(url);\n\n  request.get().then(data => {\n    PubSub.publish('Pokemon:individualPokemon', data);\n  })\n  this.additionInfoPokemon(individualPokemon)\n}\n\n\nPokemon.prototype.additionInfoPokemon = function (individualPokemon) {\n  const url= `https://pokeapi.co/api/v2/pokemon-species/${individualPokemon}/`;\n  const request = new Request(url);\n\n  request.get().then(data => {\n    PubSub.publish('Pokemon:additionInfoPokemon', data);\n  })\n}\n\nPokemon.prototype.getData = function () {\n  const url = \"https://pokeapi.co/api/v2/pokemon/\";\n  const request = new Request(url);\n\n  request.get().then(data => {\n    this.data = data.results;\n    PubSub.publish('Pokemon:pokemon-data-loaded', this.data);\n  })\n  // request.get((data) => {\n  //   this.data = data.message;\n  //   PubSub.publish('Dogs:dog-data-loaded', this.data);\n  // });\n}\n\nmodule.exports = Pokemon;\n\n\n//# sourceURL=webpack:///./src/models/pokemon.js?");

/***/ }),

/***/ "./src/views/pokemon_list_view.js":
/*!****************************************!*\
  !*** ./src/views/pokemon_list_view.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\n\nconst PokemonListView = function(container,element){\n  this.container = container;\n  this.element = element;\n};\n\nPokemonListView.prototype.bindEvents = function () {\n\n  const searchBar = document.querySelector('#search');\n  searchBar.addEventListener('input',(event) => {\n    PubSub.publish('PokemonListView:search-input',event.target.value)\n  })\n  PubSub.subscribe('Pokemon:pokemon-data-loaded',(event) => {\n    const pokemon = event.detail\n    const pokedex = this.createPokedex(pokemon);\n    this.container.appendChild(pokedex)\n  })\n  PubSub.subscribe('Pokemon:pokemon-types-loaded', (event) => {\n    const typesArray = event.detail\n    this.populate(typesArray)\n  })\n  this.element.addEventListener('change', (evt) => {\n    const selectedType = evt.target.value;\n    PubSub.publish('PokemonListViewchange', selectedType);\n  });\n\n  PubSub.subscribe('Pokemon:pokemon-filtered-by-types', (event) => {\n    const pokemon = event.detail\n    this.container.innerHTML = ''\n\n    const filter = this.createFilteredList(pokemon)\n    this.container.appendChild(filter)\n  })\n  PubSub.subscribe(\"Pokemon:searchResults\",(event) => {\n    const pokemon = event.detail;\n    this.container.innerHTML = ''\n    const searchResults = this.createPokedex(pokemon);\n    this.container.appendChild(searchResults)\n  })\n};\n\nPokemonListView.prototype.createFilteredList = function (pokemonArray) {\n  const filteredList = document.createElement('ul');\n  filteredList.classList.add('pokedex');\n  pokemonArray.forEach((pokemon) => {\n    const listItem = document.createElement('li');\n    listItem.id = pokemon.pokemon.name;\n    listItem.value = pokemon.pokemon.name;\n    listItem.textContent = `${pokemon.pokemon.name.capitalize()}`;\n    listItem.addEventListener(\"click\",(event) => {\n      const selectedPokemon = event.target.id;\n      PubSub.publish(\"pokemonListView: Pokemon-selected\",selectedPokemon)\n    })\n    filteredList.appendChild(listItem)\n  })\n  return filteredList;\n};\n\nPokemonListView.prototype.populate = function(types){\n  types.forEach((type) => {\n    const option = document.createElement('option');\n    option.textContent = type.name;\n    option.value = type.name;\n    this.element.appendChild(option);\n  })\n}\n\nPokemonListView.prototype.createPokedex = function (pokemonArray) {\n  const pokedex = document.createElement('ul');\n  pokedex.classList.add('pokedex');\n  pokemonArray.forEach((pokemon,index) => {\n    const number = index+=1;\n    const listItem = document.createElement('li');\n    listItem.id = pokemon.name;\n    listItem.value = pokemon.name;\n    listItem.textContent = `-----No${number}  ${pokemon.name.capitalize()}`;\n    listItem.addEventListener(\"click\",(event) => {\n      const selectedPokemon = event.target.id;\n      PubSub.publish(\"pokemonListView: Pokemon-selected\",selectedPokemon)\n    })\n    pokedex.appendChild(listItem)\n  })\n  return pokedex;\n};\n\nmodule.exports = PokemonListView;\n\n\n//# sourceURL=webpack:///./src/views/pokemon_list_view.js?");

/***/ }),

/***/ "./src/views/resultView.js":
/*!*********************************!*\
  !*** ./src/views/resultView.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\n\nconst ResultView = function(container){\n  this.container = container;\n  this.individualPokemon = null;\n  this.additionalInfo = null;\n};\n\nResultView.prototype.bindEvents = function () {\n  PubSub.subscribe('Pokemon:individualPokemon',(event) => {\n    const pokemon = event.detail\n    this.individualPokemon = pokemon\n    this.render(pokemon);\n\n  })\n\n  PubSub.subscribe('Pokemon:additionInfoPokemon', (event) => {\n    const info = event.detail\n    this.additonalInfo = info;\n\n  })\n};\n\nResultView.prototype.render = function (pokemon) {\n  this.container.innerHTML = '';\n  this.createHeader(pokemon)\n  this.createImage(pokemon);\n  this.pokemonStats(pokemon);\n  this.renderDescription()\n\n};\n\nResultView.prototype.createHeader = function (pokemon) {\n  const header = document.createElement('div')\n  header.classList.add('header')\n  header.textContent = pokemon.name.capitalize();\n  this.container.appendChild(header);\n};\n\nResultView.prototype.findEnglish = function (flavorText){\n  const english = flavorText.filter((text) => {\n    return text.language.name ===\"en\"\n  })\n  return english\n};\n\nResultView.prototype.renderDescription = function () {\n  console.log(this.additonalInfo);\n  const species = this.additonalInfo.genera[2].genus;\n  const speciesDiv = document.createElement('div')\n  speciesDiv.classList.add('species')\n  speciesDiv.textContent = species\n  const descriptionDiv = document.createElement('div')\n  descriptionDiv.classList.add('description')\n  const description = this.findEnglish(this.additonalInfo.flavor_text_entries)\n  descriptionDiv.textContent = description[0].flavor_text;\n  this.container.appendChild(speciesDiv);\n  this.container.appendChild(descriptionDiv);\n\n\n};\n\nResultView.prototype.pokemonStats = function (pokemon) {\n  const stats = pokemon.stats;\n  const infoBox = document.createElement('div')\n  infoBox.classList.add('infobox')\n  const statsBox = document.createElement('div')\n  statsBox.classList.add('stats');\n  stats.forEach((status) => {\n    const statsRow = document.createElement('div')\n    statsRow.classList.add('stat-row');\n    const span = document.createElement('span');\n    span.textContent = status.stat.name;\n    statsRow.appendChild(span);\n    const attribute = document.createElement('span')\n    attribute.textContent= status.base_stat;\n    statsRow.appendChild(attribute);\n    statsBox.appendChild(statsRow);\n  })\n  infoBox.appendChild(this.createImage(this.individualPokemon))\n  infoBox.appendChild(statsBox)\n  this.container.appendChild(infoBox)\n};\n\nResultView.prototype.createImage = function (pokemon) {\n  const div = document.createElement('div');\n  div.classList.add('image');\n  const image = document.createElement('img');\n  image.src = pokemon.sprites.front_default\n  div.appendChild(image)\n  return div\n};\n\nResultView.prototype.pokemonInfo = function (pokemon) {\n  const pokemonWeight = pokemon.weight; //number\n  const pokemonHeight = pokemon.height;\n  const pokedexNo = pokemon.id;\n  const div = document.createElement('div');\n  div.classList.add('info');\n  const noPara = document.createElement('p')\n  noPara.textContent = `No. ${pokedexNo} ${pokemon.name.capitalize()}`;\n  div.appendChild(noPara);\n  const heightPara = document.createElement('p')\n  heightPara.textContent = `Height: ${pokemonHeight} feet`;\n  div.appendChild(heightPara);\n  const weightPara = document.createElement('p')\n  weightPara.textContent = `Weight:  ${pokemonWeight} lbs`;\n  div.appendChild(weightPara);\n  this.container.appendChild(div);\n};\n\nString.prototype.capitalize = function() {\n  return this.charAt(0).toUpperCase() + this.slice(1);}\n\n  module.exports = ResultView;\n\n\n//# sourceURL=webpack:///./src/views/resultView.js?");

/***/ })

/******/ });