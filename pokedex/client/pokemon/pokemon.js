import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { getPokemonInfo } from '../../common/methods';
import getValueFromForm from '../common/get-value-input-field';
import { pokemon } from '../../common/pokemon';
import './pokemon.html';

Template.pokemon.onCreated(function () {
    this.pokemon = new ReactiveVar();
    this.loading = new ReactiveVar(false);
})

Template.pokemon.helpers({
    'pokemon': () => {
        return Template.instance().pokemon.get();
    },
    'loading': () => {
        return Template.instance().loading.get();
    },
    'pokemons': () => {
        return pokemon.find().map(p => p.pokemon).sort((p1, p2) => +p1.id - (+p2.id));
    }
});

Template.pokemon.events({
    'submit form[name="pokemon-search"]': (evt, template) => {
        evt.preventDefault();
        template.loading.set(true);
        const pokemonNumber = getValueFromForm('pokemon-number', evt);
        Meteor.call(getPokemonInfo, pokemonNumber, (e, result) => {
            template.pokemon.set(result);
            setTimeout(function () {
                template.loading.set(false);
                $(`#pokemon-${pokemonNumber}`).get(0).scrollIntoView()
            }, 1500);
        });
    }
});
