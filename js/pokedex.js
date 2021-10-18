const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

// Punti in cui sarà inserito del codice HTML attraverso Javascript
const imageScreen = document.querySelector(".image-screen");
const errorLabel = document.querySelector("label");
const info = document.querySelector(".pokemon-body");
const types = document.querySelector(".types");

// Form
const pokeForm = document.querySelector(".poke-form");

// Input dell'utente
const userInput = document.getElementById("insert-id");

function init() {
  pokeForm.addEventListener("submit", sendInfo);
}

function sendInfo(a) {
  a.preventDefault(); // Impedisce il caricamento della pagina

  const pokemonID = userInput.value;

  getPokemonData(pokemonID);

  a.target.reset(); // Resetta il form dopo l'invio
}

function checkInputError(userInput) {
  if (userInput > 898) {
    errorLabel.innerText = "Esistono solo 899 Pokemon!";
  }
  else if (userInput == "") {
    errorLabel.innerText = "Inserisci l'ID di un Pokémon!";
  }
  else if (userInput < 1) {
    errorLabel.innerText = "Non esistono Pokémon con ID pari a 0 o negativi!";
  }
  else {
    errorLabel.innerText = "";
  }
}

async function getPokemonData(pokeID) {
  checkInputError(pokeID);
  const response = await fetch(pokeAPI + pokeID);
  const pokeEndpoint = await response.json();

  const pokeName = pokeEndpoint.name;

  const pokeImagePath = pokeEndpoint.sprites.other;
  const pokeImage = pokeImagePath["official-artwork"].front_default; // Faccio accesso alla risorsa con il "-"

  const pokeTypesPath = pokeEndpoint.types;
  const pokeType = [];
  pokeTypesPath.forEach(element => pokeType.push(element.type.name));

  const pokeWeight = pokeEndpoint.weight / 10 + "Kg";

  const pokeHeight = pokeEndpoint.height / 10 + "m";

  const pokeData = {
    name: pokeName,
    image: pokeImage,
    type: pokeType,
    height: pokeHeight,
    weight: pokeWeight
  };
  console.log(pokeData);

  // Immagine e Nome
  imageScreen.innerHTML = `
    <img alt=${pokeData.name} src="${pokeData.image}">
    <div class="pokemon-name">
      <p>${pokeData.name}</p>
    <div>
  `

  // Tipi del Pokemon
  types.innerHTML = "";
  pokeData.type.forEach(element => {
    // let span = document.createElement("span");
    types.innerHTML += `
    <span>${element}</span>
    `;
  })


  // Altezza e Peso
  info.innerHTML = `
  <p>Height: ${pokeData.height}</p>
  <p>Weight: ${pokeData.weight}</p>
  `;
}

init();
