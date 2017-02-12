import { Meteor } from 'meteor/meteor';
import request from 'request';
import { getPokemonInfo } from '../common/methods';
import { pokemon } from '../common/pokemon';

Meteor.startup(() => {
  // code to run on server at startup
});

const methods = {};

methods[getPokemonInfo] = (pokemonId, callback) => {
  const cachedPokemon = pokemon.findOne({ pokemonId });
  if (!cachedPokemon) {
    const httpget = Meteor.wrapAsync(request.get);
    const result = httpget(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`, {});
    const parsedPokemon = JSON.parse(result.body)
    pokemon.upsert({ pokemonId }, { pokemonId, pokemon: JSON.parse(result.body) })
    return parsedPokemon;
  }
  return cachedPokemon.pokemon;
}

Meteor.methods(methods);
