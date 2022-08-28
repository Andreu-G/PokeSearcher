function Start()
{
    GetAllPokemon();
}

async function GetAllPokemon()
{
    let pokemons = await fetch('http://pokeapi.co/api/v2/pokemon/?limit=200').then(response => response.json());

  for (const pokemon of pokemons.results) {
    let pokeDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(response => response.json());
    let pokeColorRequest = (await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeDetails.id}`).then(response => response.json()));
    let pokeGen = pokeColorRequest.generation.name;
    pokeGen = pokeGen.slice(11).toUpperCase();
    let pokeColor = (pokeColorRequest.color.name);
    pokeColor = pokeColor.charAt(0).toUpperCase() + pokeColor.slice(1);
    pokename = pokemon.name;
    pokename = pokename.charAt(0).toUpperCase() + pokename.slice(1);
    document.getElementById("content").innerHTML += `
    <div class="pokemon-card">
    <img src="${pokeDetails.sprites.front_default}" alt="">
    <h6 class="text-dark">${pokename}</h6>
    <div>
      <div style="font-weight:600; display: inline-block;">Color: </div><div class="ms-2" style="display: inline-block;">${pokeColor}</div>
    </div>
    <div>
      <div class="ms-2" style="font-weight:600; display: inline-block;">Generation: ${pokeGen}</div>
    </div>`;
  }
};

window.onload = Start();