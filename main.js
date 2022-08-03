import './style.scss';

function pokemonCardText(p) {
  let cardType = p.type.map(t => {
    return `<div class="type ${t}">${t}</div>`
  }).join('');
  return `
    <div class="thumbnail-bg">
      <img src="${p.ThumbnailImage}" alt="${p.name}" class="image"/>
    </div>
    <div class="p-4">
      <div class="text-sm flex justify-between">
        <div class="number">#${p.id}</div>
        <div class="actions flex flex-nowrap gap-2">
          <button class="btn-edit" data-id="${p.id}">Edit</button>
          <div>|</div>
          <button class="btn-delete" data-id="${p.id}">Delete</button>
        </div>
      </div>
      <div class="name">${p.name}</div>
      <div class="group-type">${cardType}</div>
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

function assignEditCard(card) {
  let btnEdit = card.querySelector(".btn-edit");
  if (btnEdit !== null) {
    btnEdit.addEventListener('click', (e) => 
    console.log("Will edit pokemon id: " +e.target.dataset.id));
  }
}

function assignDeleteCard(card) {
  let btnDelete = card.querySelector(".btn-delete");
    if (btnDelete !== null) {
      btnDelete.addEventListener('click', (e) => {
        let targetId = e.target.dataset.id;
        let deleteUrl = pokemonListUrl + '/' + targetId;
        if(confirm("Are you sure ?")) {
        fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }, 
        })
          .then((resp) => resp.json())
          .then((data) => {
            card.remove();
          });
        }
      });
    }
}
const pokemonListUrl = ` http://localhost:3000/pokemons`;
if(pokemonListElement != null) {
  

  fetch(pokemonListUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      let pokemons = data;
      pokemons.map((p) => {
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute('class','card');
        cardDiv.innerHTML = pokemonCardText(p);

        assignEditCard(cardDiv);

        assignDeleteCard(cardDiv);
        
        pokemonListElement.insertAdjacentElement('beforeend', cardDiv);
      })
    })
}