// Define pokemonRepository object
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Function to add a Pokémon to the repository
  function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
          pokemonList.push(pokemon);
      } else {
          console.log("pokemon is not correct");
      }
  }

  // Function to get all Pokémon in the repository
  function getAll() {
      return pokemonList;
  }

  // Function to add a list item for a Pokémon
  function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');

      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary', 'list-group-item', 'pokemon-button');

      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);

      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
  }

  // Function to load Pokémon from the API
  function loadList() {
      return fetch(apiUrl)
          .then(function(response) {
              return response.json();
          })
          .then(function(json) {
              json.results.forEach(function(item) {
                  let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  add(pokemon);
              });
          })
          .catch(function(e) {
              console.error(e);
          });
  }

  // Function to load details of a Pokémon
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
          .then(function(response) {
              return response.json();
          })
          .then(function(details) {
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
              return item;
          })
          .catch(function(e) {
              console.error(e);
          });
  }

  // Function to show Pokémon details in the modal
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function(itemWithDetails) {
          const modalName = document.querySelector('.modal-name');
          const modalHeight = document.querySelector('.modal-height');
          const modalImage = document.querySelector('.modal-image');

          modalName.textContent = itemWithDetails.name;
          modalHeight.textContent = itemWithDetails.height + ' decimetres';
          modalImage.src = itemWithDetails.imageUrl;

          $('#pokemonModal').modal('show');

          // Add event listener to close the modal when the "x" button is clicked
          document.querySelector('.close').addEventListener('click', function() {
              $('#pokemonModal').modal('hide');
          });

          // Add event listener to close the modal when the background is clicked
          document.querySelector('.modal-backdrop').addEventListener('click', function() {
              $('#pokemonModal').modal('hide');
          });
      });
  }

  // Function to filter Pokémon based on the search query
  function filterPokemon(searchQuery) {
      const filteredPokemon = pokemonList.filter(pokemon => {
          return pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

      // Clear existing list items
      let pokemonListElement = document.querySelector('.pokemon-list');
      pokemonListElement.innerHTML = '';

      // Add filtered Pokémon to the list
      if (filteredPokemon.length === 0) {
          document.getElementById('no-results').style.display = 'block';
      } else {
          document.getElementById('no-results').style.display = 'none';
          filteredPokemon.forEach(pokemon => {
              addListItem(pokemon);
          });
      }
  }

  // Event listener for search bar input
  document.getElementById('search-bar').addEventListener('input', function() {
      const searchQuery = this.value.trim();
      filterPokemon(searchQuery);
  });

  // Return public functions
  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

// Load Pokémon data and add list items
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});