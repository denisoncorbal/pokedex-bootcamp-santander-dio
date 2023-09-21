
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()    

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.abilities = pokeDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name);
    pokemon.height = pokeDetail.height;
    pokemon.moves = pokeDetail.moves.map((moveSlot)=>moveSlot.move.name);
    pokemon.species = pokeDetail.species;
    pokemon.hp = pokeDetail.stats[0].base_stat;
    pokemon.attack = pokeDetail.stats[1].base_stat;
    pokemon.defense = pokeDetail.stats[2].base_stat;
    pokemon.spAttack = pokeDetail.stats[3].base_stat;
    pokemon.spDef = pokeDetail.stats[4].base_stat;
    pokemon.speed = pokeDetail.stats[5].base_stat;
    pokemon.total = pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spAttack + pokemon.spDef + pokemon.speed;
    pokemon.weight = pokeDetail.weight;    
    pokemon.speciesUrl = pokeDetail.species.url;
    

    return pokemon
}

function convertSpeciesToPokemon(species){    
    const pokemon = {};    
    pokemon.eggGroups = species.egg_groups.map((eggGroupSlot)=>eggGroupSlot.name);
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getFullPokemonDetail = async (pokemon) =>{
    let poke = new Pokemon();
    const fetchBasic = await fetch(pokemon.basicUrl).then((res)=>res.json()).then(convertPokeApiDetailToPokemon);
    poke = {...poke, ...fetchBasic};
    const fetchSpecies = await fetch(poke.speciesUrl).then((res)=>res.json()).then(convertSpeciesToPokemon);
    poke = {...poke, ... fetchSpecies};
    return poke;
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}