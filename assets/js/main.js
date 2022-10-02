const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

// 1, 2, 3, 4, 5           0 - 5
// 6, 7, 8, 9, 10          5 - 5
// 11,                     10 - 5 (remove o botao)


function loadPokemonItens(offset, limit) {
    function convertPokemonToHtml(pokemon) {
        console.log(pokemon);
        return `
        
            <li class="pokemon ${pokemon.type}" onclick="selectPokemon(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                         ${pokemon.types.map((type)=>{
                             return `<li class="type ${type}">${type}</li>`
                         }).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>  
        `
    }

    pokeApi.getPokemons(offset, limit)
    .then((pokemons =[])=>{
        // Melhor Versão
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('');



        // Versão com o Map mais ainda grande
        // const newList = pokemons.map((pokemon)=>{
        //     return convertPokemonToHtml(pokemon);
        // })


        // const newHtml = newList.join('');

        // console.log(newHtml);

        // pokemonList.innerHTML += newHtml;

        
        // sintaxe complicada
        // const listItems =[];
        // for(let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     listItems.push(convertPokemonToHtml(pokemon))
          
        // }

        // console.log(listItems);
    })
    .catch((error)=>console.error(error))
}

function selectPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    pokemon = fetch(url)
        .then(response=>response.json())
        .then(pokemon=> montaDetail(pokemon))
    
        
}

function montaDetail(resp) {
    console.log(resp.sprites.other.dream_world.front_default)
    const htmlString=`
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img src="${resp.sprites.other.dream_world.front_default}" alt="${resp.name}">
                <h2>${resp.name}</h2>
            </div>     
        </div>
    `

    pokemonList.innerHTML += htmlString;
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset +=limit;
    const qtdrecordNextPage = offset + limit
    if(qtdrecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

function closePopup() {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}



    