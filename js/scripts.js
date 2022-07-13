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
        {name: 'Pikachu', height: 0.4, type: 'Electric'}
    ]

    function add(pokemon){
        if (typeof pokemon === 'object' && 'name' in pokemon &&
            "height" in pokemon &&
            "type" in pokemon) {
            privatePokemonList.push(pokemon);
        } else {
            console.log(`Pokemon is not valid!`);
        }        
    };

    function getAll() {
        return privatePokemonList;
    };

    function addListItem(pokemon) {
        let ulPokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        ulPokemonList.appendChild(listPokemon);
        addEventListener(button, pokemon);
    };

    function showDetails(pokemon) {
        console.log(pokemon);
    };

    function eventListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
    };

})();
// I create pokemonList variable to extract the information inside the IIFE
let pokemonList = pokemonRepository.getAll();

// i'm going to loop with addListItem()



pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});    
    
//============================================================================================
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