let pokemonRepository = (function () {
    console.log('Init pokemonRepo...')
    let privatePokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let input = $("input");
    input.on("input", filterList);

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
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
        listPokemon.classList.add("col-sm-6", "col-md-4", "col-lg-3");
        let container = document.createElement('div');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        container.classList.add('container');
        button.classList.add('button-class'); // refers to the css class
        container.appendChild(button);
        listPokemon.appendChild(container);
        ulPokemonList.appendChild(listPokemon);
        eventListener(button, pokemon);
    };
    
    function eventListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    };

    let container = document.querySelector('.container');
    let loadingMessage = document.createElement('div');
    container.append(loadingMessage)

    function showLoadingMessage() {
        loadingMessage.innerText = 'Just a moment..';
        console.log('Just a moment...');
    };

    function hideLoadingMessage() {
        loadingMessage.remove();
        console.log('Thanks for waiting!')
    };

    function loadList() {
        showLoadingMessage(false);
        return fetch(apiUrl).then(function (response) { // Allows you to get, or “fetch,” data asynchronously from external data sources. ".then()" is expecting a promise that in this case is the 'apiUrl' the code within is executed If the code in the promise is successfully completed.
            return response.json(); // the response will be converted to a json. it will return a promise object.
        }).then(function (json) { // the second .then() statement will contain the callback function for this second promise.  when working with promises, is called “Promise Chaining.” this means that pokemonList will contain an array of JSON objects, each representing a single Pokémon.
            hideLoadingMessage(true);
            json.results.forEach(function (item) { // The result of json, we are going to run it a forEach loop that presents all data from APi
                let pokemon = {
                    name: item.name.toUpperCase(), // I am asking for each item the name
                    detailsUrl: item.url // I am asking for each item the detailsUrl
                };
                add(pokemon); // once the loop is run, i said add pokemon (the first function in pokemonRepository)
            });
        }).catch(function (e) { // If there is an error after push the pokemon(object), is gonna be caught right here
            hideLoadingMessage(true);
            console.error(e);
        });
    };

    function loadDetails(item) {
        console.log('loading details...')
        showLoadingMessage(false);
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            console.log('details:', details)
            hideLoadingMessage(true);
            // Now we add the details to the item
            item.pokemonImg = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            let types = [];
            details.types.forEach((item) => {
                let name = item.type.name
                name = name[0].toUpperCase() + name.substring(1)
                types.push(name)
            });
                item.types = types;
                item.weight = details.weight;
                let abilities = [];
                details.abilities.forEach((item) => {
                    let name = item.ability.name
                    name = name[0].toUpperCase() + name.substring(1)
                    abilities.push(name)
                });
                    item.abilities = abilities;
        }).catch(function (e) {
            hideLoadingMessage(true);
            console.error(e);
        });
    };

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    };

    function filterList() {
        let inputValue = $("input").val();
        let list = $("li");
        list.each(function () {
            let item = $(this);
            let name = item.text();
            if (name.toLowerCase().startsWith(inputValue.toLowerCase()) || item.hasClass('nav-item')) {
                item.show();
            } else {
                item.hide();
            }
        });
    };

    let modalContainer = document.querySelector('#exampleModal');

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        //creating elements 
        let nameElement = $(`<h1>${pokemon.name}</h1>`);

        let pokemonImage = $(`<img class="modal-img mx-auto" src="${pokemon.pokemonImg}">`);

        let heightElement = $(`<p class="ml-4 mt-3 mb-0">Height: ${pokemon.height}</p>`);

        let weightElement = $(`<p class="ml-4 mb-0">Weight: ${pokemon.weight}</p>`);

        let typesElement = $(`<div class="ml-4">Types: ${pokemon.types.join(", ")}</div>`);

        let abilitiesElement = $(`<p class="ml-4">Abilities: ${pokemon.abilities.join(", ")}</p>`);
        
        modalTitle.append(nameElement);
        modalBody.append(pokemonImage);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
        $('#exampleModal').modal();

        /*
        modalContainer.innerHTML = ''; // Clear all existing modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('model-close'); // This class is in the CSS
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.imageUrl;

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name.toUpperCase();

        let heightElement = document.createElement('p');
        weightElement.innerText = `Weight: ${pokemon.weight}`;


        let weightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height}`;

        let typesElement = document.createElement('p');
        typesElement.innerText = `Types: ${pokemon.types.join(", ")}`;
        

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonImg);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typesElement);
        modal.appendChild(abilitiesElement);
        modalContainer.appendChild(modal); // modalContainer is the father of modal, modal has 3 childs who are button, title and content.
        */

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#exampleModal').addEventListener('click', () => {
        showModal(pokemon);
    });

    let dialogPromiseReject; // This can be set later, by showDialog

    function hideModal() {
        // let modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
                dialogPromiseReject();
                dialogPromiseReject = null;
        };
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
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