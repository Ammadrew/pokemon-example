import './style.scss';

function pokemonCardText(p) {
  let cardType = p.type.map(t => {
    return `<div class="type ${t}">${t}</div>`
  }).join('');
  return `
  <div class="card">
    <div class="thumbnail-bg">
      <img src="${p.ThumbnailImage}" alt="${p.name}" class="image"/>
    </div>
    <div>
      <div class="number">#${p.number}</div>
      <div class="name">${p.name}</div>
      <div class="group-type">${cardType}</div>
    </div>
  </div>
  `;
}
const pokemonListElement = document.getElementById('pokemon-list');

const btnCreatePokemon = document.getElementById('btn-create');
if (btnCreatePokemon != null) {
  btnCreatePokemon.addEventListener('click', function(){
    const newPokemonForm = document.getElementById("new-pokemon-form");
    const name = newPokemonForm.querySelector("#name").value;
    const type = newPokemonForm.querySelector("#type").value;
    const data = {
        name: name,
        type: [type],
    };
    const createPokemonUrl = "http://localhost:3000/pokemons";
    fetch(createPokemonUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //window.location.reload(); //เปลืองทรัพยากรณ์
        pokemonListElement.insertAdjacentHTML('beforeend', pokemonCardText(data));
      });
  });
}

if(pokemonListElement != null) {
  const pokemonListUrl = ` http://localhost:3000/pokemons`;

  fetch(pokemonListUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      let pokemons = data;
      pokemons.map((p) => {
        pokemonListElement.insertAdjacentHTML('beforeend', pokemonCardText(p));
      })
    })
}