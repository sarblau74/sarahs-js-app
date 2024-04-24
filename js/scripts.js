let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
          pokemonList.push(pokemon);
      } else {
          console.log("pokemon is not correct");
      }
  }

  function getAll() {
      return pokemonList;
  }

  function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');

      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary', 'list-group-item', 'pokemon-button');

      listItem.classList.add('list-group-item');

      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);

      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

  function loadList() {
      return fetch(apiUrl)
          .then(function (response) {
              return response.json();
          })
          .then(function (json) {
              json.results.forEach(function (item) {
                  let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  add(pokemon);
                  console.log(pokemon);
              });
          })
          .catch(function (e) {
              console.error(e);
          });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
          .then(function (response) {
              return response.json();
          })
          .then(function (details) {
              // Now we add the details to the item
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
              return item; // Return the item with details
          })
          .catch(function (e) {
              console.error(e);
          });
  }

  function showDetails(item) {
      loadDetails(item).then(function (itemWithDetails) {
          // Display details in modal
          const modal = document.getElementById('pokemonModal');
          const modalName = document.getElementById('pokemonName');
          const modalHeight = document.getElementById('pokemonHeight');
          const modalImage = document.getElementById('pokemonImage');

          modalName.innerText = itemWithDetails.name;
          modalHeight.innerText = itemWithDetails.height + ' decimetres';
          modalImage.src = itemWithDetails.imageUrl;

          modal.style.display = 'block';

          // Close modal when close button clicked
          const closeButton = document.getElementsByClassName('close')[0];
          closeButton.addEventListener('click', function () {
              modal.style.display = 'none';
          });

          // Close modal when clicking outside of modal
          window.addEventListener('click', function (event) {
              if (event.target == modal) {
                  modal.style.display = 'none';
              }
          });
      });
  }

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
