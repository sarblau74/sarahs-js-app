let pokemonList = [{name: 'Squirtle', type: 'water', height: 1.08, weight:'19.8 lbs'},
                   {name: 'Charmander', type: 'fire', height: 2.00, weight:'18.7 lbs'},
                   {name: 'Rattata', type: 'normal', height: 1.00, weight:'7.7 lbs'},
                   {name: 'Pikachu', type: 'electric', height: 1.04, weight:'13.2 lbs'},
                   {name: 'Weedle', type: ['bug', 'poison'], height: 1.00, weight:'7.1 lbs'}]
let pokemonRepository = (function () {
const pokemonList = [
                    {
                        name: 'Squirtle', 
                        type: 'water', 
                        height: 1.08, 
                        weight:'19.8 lbs'
                    },
                    {
                        name: 'Charmander', 
                        type: 'fire', 
                        height: 2.00, 
                        weight:'18.7 lbs'
                    },
                    {
                        name: 'Rattata', 
                        type: 'normal', 
                        height: 1.00, 
                        weight:'7.7 lbs'
                    },
                    {
                        name: 'Pikachu', 
                        type: 'electric', 
                        height: 1.04, 
                        weight:'13.2 lbs'
                    },                        
                    {
                        name: 'Weedle', 
                        type: ['bug', 'poison'], 
                        height: 1.00, 
                        weight:'7.1 lbs'
                    } 
            ]
    function add (pokemon) {
        pokemonList.push (pokemon);
    }             
    function getAll () {
        return pokemonList;
    }
    return {
        add,
        getAll,
    };
})();
//const pokemonLoop = 
function addListItem(pokemon) {
    let pokemonList= document.querySelector('.pokemon-list');
        let listItem= document.createElement('li');
        let button= document.createElement ('button');
        button.innerText= pokemon.name;
        console.log(button.innerText);
        button.classList.add ('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);   
};
        pokemonRepository.getAll().forEach(function(pokemon){
          //pokemonRepository.addListItem(pokemon);
        });
 