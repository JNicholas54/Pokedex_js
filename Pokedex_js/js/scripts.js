let pokemonRepository = (function () {
    let privatePokemonList = [
        {name: "Balbasaur", height: 0.7, type: ["grass", "poison"]},
        {name: "Abra", height: 0.9, tyoe: "psychic"},
        {name: "Mew", height: 0.4, type: "psychic"},
        {name: "Charmeleon", height: 1.1, type: "fire"},
        {name: "Gyarados", height: 6.5, type: ["water", "flying"]},
        {name: "Snorlax", height: 2.1, type: "normal"},
        {name: "Ninetales", height: 1.1, type: "fire"},
        {name: 'Phyduck', height: 0.8, type: 'Water'},
        {name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying']},
        {name: 'Onix', height: 8.8, type: ['Rock', 'Ground'] },
        {name: 'Gangar', height: 1.5, type: ['Ghost', 'Posion']},
        {name: 'Picachu', height: 0.4, type: 'Electric'}
    ]

    function add(pokemon){
        if (typeof pokemon === 'object' && 'name' in pokemon){
            privatePokemonList.push(pokemon);
        } else {
            console.log(`Pokemon is not valid!`);
        }        
    }

    function getAll() {
        return privatePokemonList;
    }

    return {
        add: add,
        getAll: getAll,
    };

})();
// I create pokemonList variable to extract the information inside the IIFE
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function (pokemon) {
    if (pokemon.height >= 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Wow, thats's big! <br>`)
    } else if (pokemon.height > 1.0 && pokemon.height < 3.0) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Medium <br>`)
    } else {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Small <br>`)
    }
})

/* FINISHED PODEDEX PROJECT FROM YOUTUBE - completed pokemon index using vanilla html below

const pokedex = document.getElementById('pokedex');

 const fetchPokemon = () => {
    const promises = [];
    for (let i=1; i <= 150; i++) {
        const url =`https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
                name: result.name,
                id: result.id,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', ')
            }));
            displayPokemon(pokemon);
    });
}
    const displayPokemon = (pokemon) => {
        console.log(pokemon);
        const pokemonHTMLString = pokemon
            .map( 
                (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}" />
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li> 
        `
        )
        .join('');
        pokedex.innerHTML = pokemonHTMLString;
};

 fetchPokemon();
*/