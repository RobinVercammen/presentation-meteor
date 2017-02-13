# Meteor
## ![Involed-IT](https://www.involved-it.be/user/themes/involved/images/involved-logo.svg)  <!-- .element width="250px" style="border:none; background:none;" -->
#### [www.involved-it.be](https://www.involved-it.be) <!-- .element target="blank" -->


# About Involved

- Passionate people
- On top of technology
- Working together with clients
- Empowering everyones potential



# Why Meteor

- Fast
- Reactive
- Javascript

Note: Meteor enables us to quickly develop any application at a rapid pase.
Not only is it blazing fast to develop an application in. At runtime you'll be amazed by its speed. Due to its full-stack reactivity.
An event on any client will tangle into all the other clients if needed.
And best of all it's all in one language.
But since this is a workshop i wont be going into the gruesome detail of the framework itself we are going to build something!



# What we're building
Reactive pokedex using the free [pokemon api](https://pokeapi.co/).
- Search pokemons
- Display pokemon statistics
- Cache pokemons in our database



# Setup
## [Install meteor](https://www.meteor.com/install) <!-- .element target="blank" -->



# Create app
```shell
meteor create pokedex
cd pokedex
meteor npm install
meteor
```
![welcome](img/welcome-to-meteor.png) <!-- .element height="200" -->
[Code](https://github.com/RobinVercammen/presentation-meteor/commit/30d6b43c51876d1fa9a939a1518a9fe2d35869bc) <!-- .element target="_blank" style="position:fixed; left:15px; bottom:15px;"-->


# Add packages
```shell
meteor npm i -S bootstrap@next request
meteor add fourseven:scss
```
Note: We'll be using bootstrap and sass. Therefor we'll be installing some dependencies



# Template [(Blaze)](http://blazejs.org/) <!-- .element target="_blank" -->
```html
<template name="pokemon">
    <div class="col-12">
        <form name="pokemon-search">
            <input type="number" name="pokemon-number" required>
            <button class="btn btn-primary" type="submit">Search poke</button>
            <button class="btn btn-default" type="button" id="cache-all">Cache all</button>
            {{#if loading}}
            <div class="spinner"></div>
            {{/if}}
        </form>
        {{#if pokemon}}
        <h1>Found pokemon: {{pokemon.name}}</h1>
        {{/if}}
    </div>
</template>
<!-- render template -->
{{>pokemon}}
```
[Code](https://github.com/RobinVercammen/presentation-meteor/commit/9e03ce2bd404156bcdbabec91af419c33872b3fc) <!-- .element target="_blank" style="position:fixed; left:15px; bottom:15px;"-->
Note: We're using blaze to create our templates


# Lifecycle (onCreated)
```javascript
Template.pokemon.onCreated(function () {
    this.pokemon = new ReactiveVar();
    this.loading = new ReactiveVar(false);
});
```
Note: Whenever a template is loaded it's onCreated method gets called before being 'drawn' to the screen. Here we'll do some initialization.
Reactive Variables are meteor way to say, hey whenever this changes like someone needs it we need to rerun this function.


# Helpers
```javascript
Template.pokemon.helpers({
    'pokemon': () => {
        return Template.instance().pokemon.get();
    },
    'loading': () => {
        return Template.instance().loading.get();
    }
});
```
Note: Helpers are used to provide data to the template. Here we'll see the template calling the reactive variables. Be sure to understand why the Template.instance();


# Events
```javascript
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
```
[Code](https://github.com/RobinVercammen/presentation-meteor/commit/45bd75276769469c39158129bdb7742250d9f3fb) <!-- .element target="_blank" style="position:fixed; left:15px; bottom:15px;"-->
Note: Events are being used to capture user interaction. Mind the set on the reactive variable and see it update the screen



# Server methods
```javascript
// server
const methods = {};
methods[getPokemonInfo] = (pokemonId, callback) => {
  const httpget = Meteor.wrapAsync(request.get);
  const result = httpget(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`, {});
  const parsedPokemon = JSON.parse(result.body)
  return parsedPokemon;
}
Meteor.methods(methods);
// client
Meteor.call(getPokemonInfo, pokemonNumber, (e, result) => {
    template.pokemon.set(result);
    template.loading.set(false);
});
```
[Code](https://github.com/RobinVercammen/presentation-meteor/commit/f421b5eacf3e958c59cb0fac3f2f9e210f6babba)<!-- .element target="_blank" style="position:fixed; left:15px; bottom:15px;"-->



# Persist
```javascript
// common
import { Mongo } from 'meteor/mongo';

export const pokemon = new Mongo.Collection('pokemon');

// client do mongo queries as a reactive source
pokemon.find().map(p => p.pokemon).sort((p1, p2) => +p1.id - (+p2.id));

// server
pokemon.upsert({ pokemonId }, { pokemonId, pokemon: JSON.parse(result.body) })
```
[Code](https://github.com/RobinVercammen/presentation-meteor/commit/50e991d151501d09ef8c60edb37f3b364bc72144)<!-- .element target="_blank" style="position:fixed; left:15px; bottom:15px;"-->
Note: Caching pokemon like its nothing mongo collections are reactive (open 2nd browser window)



# Result
![result](img/final.png) <!-- .element height="300" -->



# Further leads:
- React
- Routing
- GraphQL
- [The meteor chef](https://themeteorchef.com/)