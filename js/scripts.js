let pokemonRepository = (function () {
    let privatePokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function add(pokemon){
        if (typeof pokemon === 'object' && 'name' in pokemon &&
            "height" in pokemon &&
            "types" in pokemon) {
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
            showDetails(pokemon);
        });
    };

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    };

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function(details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.frront_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e){
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };

})();
// I create pokemonList variable to extract the information inside the IIFE
let pokemonList = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    pokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});
});    
    
//============================================================================================
/* FINISHED PODEDEX PROJECT FROM YOUTUBE - completed pokemon index using vanilla html below

const pokedex = document.getElementById('pokedex');

 const fetchPokemon = () => {
    const promises = [];
    for (let i=1; i <= 151; i++) {
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