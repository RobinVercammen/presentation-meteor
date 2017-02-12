import { Meteor } from 'meteor/meteor';
import request from 'request';
import { getPokemonInfo } from '../common/methods';

Meteor.startup(() => {
  // code to run on server at startup
});

const methods = {};

methods[getPokemonInfo] = (pokemonId, callback) => {
  const httpget = Meteor.wrapAsync(request.get);
  const result = httpget(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`, {});
  const parsedPokemon = JSON.parse(result.body)
  return parsedPokemon;
}

Meteor.methods(methods);
