import './style.scss';

const pokemonListElement = document.getElementById('pokemon-list');
if(pokemonListElement != null) {
  const pokemonListUrl = ` http://localhost:3000/data`;

  fetch(pokemonListUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      let pokemons = data;

      pokemons.map((p) => {
        let cardType = p.type.map(t => {
          return `<div class="type ${t}">${t}</div>`
        }).join('')
        let itemElementText = `
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
        `
        pokemonListElement.insertAdjacentHTML('beforeend', itemElementText)
      })
    })
}