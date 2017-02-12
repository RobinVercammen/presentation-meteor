import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import getValueFromForm from '../common/get-value-input-field';
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
    }
});

Template.pokemon.events({
    'submit form[name="pokemon-search"]': (evt, template) => {
        evt.preventDefault();
        template.loading.set(true);
        const pokemonNumber = getValueFromForm('pokemon-number', evt);

        setTimeout(function () {
            template.loading.set(false);
            template.pokemon.set({ id: pokemonNumber, name: 'bulba' });
        }, 1500);
    }
});
