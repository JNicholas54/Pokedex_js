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
    button.classList.add('button-class'); // Refers to the CSS class
    container.appendChild(button)
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
    loadingMessage.innerText = 'A couple of seconds please..';
    console.log('A couple of seconds pelase....');
}

function hideLoadingMessage() {
    loadingMessage.remove();
    console.log('All good, thanks for waiting!')
}

function loadList() {
    showLoadingMessage(false);
    return fetch(apiUrl).then(function (response) { 
        return response.json();                     
    }).then(function (json) {                       
        hideLoadingMessage(true);
        json.results.forEach(function (item) {  
            let pokemon = {
                name: item.name.toUpperCase(),  
                detailsUrl: item.url            
            };
            add(pokemon);                       
        });
    }).catch(function (e) {                     
        hideLoadingMessage(true);
        console.error(e);
    })
}

function loadDetails(item) {
    console.log('loading details...')
    showLoadingMessage(false);
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        console.log('details:', details)
        hideLoadingMessage(true);
        item.pokemonImg = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
        item.weight = details.weight;
        let abilities = [];
        details.abilities.forEach((item) => abilities.push(item.ability.name));
        item.abilities = abilities;
    }).catch(function (e) {
        hideLoadingMessage(true);
        console.error(e);
    });
}

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
};

function filterList() {
    let inputValue = $("input").val();
    let list = $("li");
    list.each(function () {
        let item = $(this);
        let name = item.text();
        if (name.startsWith(inputValue)) {
            item.show();
        } else {
            item.hide();
        }
    });
}

let modalContainer = document.querySelector('#exampleModal');

function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    modalTitle.empty();
    modalBody.empty();
    
    let nameElement = $(`<h1>${pokemon.name}</h1>`);
    
    let pokemonImage = $(`<img class="modal-img mx-auto" src="${pokemon.pokemonImg}">`);
    
    let heightElement = $(`<p class="ml-4 mt-3 mb-0">Height: ${pokemon.height}</p>`);
    
    let weightElement = $(`<p class="ml-4 mb-0">Weight: ${pokemon.weight}</p>`);
    
    let typesElement = $(`<div class="ml-4">Types: ${pokemon.types.join(", ")}</div>`);
    
    let abilitiesElement = $(`<p class="ml-4">Abilities: ${pokemon.abilities}</p>`);
    
    modalTitle.append(nameElement);
    modalBody.append(pokemonImage);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    $('#exampleModal').modal();
    
    
    modalContainer.classList.add('is-visible');
}

document.querySelector('#exampleModal').addEventListener('click', () => {
    showModal(pokemon);
});

let dialogPromiseReject;

function hideModal() {
    modalContainer.classList.remove('is-visible');
    
    if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
    }
}

let pokemonList = getAll();

loadList().then(function () {
    console.log(pokemonList)
    pokemonList.forEach(function (pokemon) {
        addListItem(pokemon);
    });
});

