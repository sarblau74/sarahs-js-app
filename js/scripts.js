let pokemonList = [{name: 'Squirtle', type: 'water', height: 1.08, weight:'19.8 lbs'},
                   {name: 'Charmander', type: 'fire', height: 2.00, weight:'18.7 lbs'},
                   {name: 'Rattata', type: 'normal', height: 1.00, weight:'7.7 lbs'},
                   {name: 'Pikachu', type: 'electric', height: 1.04, weight:'13.2 lbs'},
                   {name: 'Weedle', type: ['bug', 'poison'], height: 1.00, weight:'7.1 lbs'}]
for (let i=0; i<pokemonList.length; i++) {
    document.write (pokemonList[i].name + ' (height: '+ pokemonList[i].height +') ');
if (pokemonList[i].height<= 1.0) {
    document.write ('<br>');
}
else {
    document.write ('That\'s a big pokemon!');
    document.write ('<br>');
}
}
