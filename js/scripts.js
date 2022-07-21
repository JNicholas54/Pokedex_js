let pokemonRepository = (function () {
    let privatePokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class'); // refers to the css class
        listPokemon.appendChild(button);
        ulPokemonList.appendChild(listPokemon);
        eventListener(button, pokemon);
    };

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    };

    function eventListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    };

    let container = document.querySelector('#container');
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
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) { // Allows you to get, or “fetch,” data asynchronously from external data sources. ".then()" is expecting a promise that in this case is the 'apiUrl' the code within is executed If the code in the promise is successfully completed.
            return response.json(); // the response will be converted to a json. it will return a promise object.
        }).then(function (json) { // the second .then() statement will contain the callback function for this second promise.  when working with promises, is called “Promise Chaining.” this means that pokemonList will contain an array of JSON objects, each representing a single Pokémon.
            hideLoadingMessage();
            json.results.forEach(function (item) { // The result of json, we are going to run it a forEach loop that presents all data from APi
                let pokemon = {
                    name: item.name, // I am asking for each item the name
                    detailsUrl: item.url // I am asking for each item the detailsUrl
                };
                add(pokemon); // once the loop is run, i said add pokemon (the first function in pokemonRepository)
            });
        }).catch(function (e) { // If there is an error after push the pokemon(object), is gonna be caught right here
            hideLoadingMessage();
            console.error(e);
        });
    };

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            // Now we add the details to the item
            item.imageUrl = details.sprites.frront_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    };

    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text) {
        modalContainer.innerHTML = ''; // Clear all existing modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('model-close'); // This class is in the CSS
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal); // modelCointainer is the father of modal, modal has 3 children: button, title and text.

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        // let modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('is-visible');
    }

    function showDialog(title, text) {
        showModal(title, text);

        // We have defined modalContainer here
        let modalContainer = document.querySelector('#modal-container');

        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
    }

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?');
      });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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