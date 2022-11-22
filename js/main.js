//Global Variables
const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


//Search Pokemon function
//Faz a solicitação pelo fetch, gera o arquivo json e retorna as infos de do pókemon.
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //Caso o pokemon não exista
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

//Render Pokemon in the HTML
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        //localizar os dados no arquivo json e mostrar no html.
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        searchPokemon = data.id;
        input.value = '';//Limpa o valor de input depois que pesquisar.
    } else {
        //caso não encontre o pokemon.
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }

}

//Search Area form
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());//Renderiza o pokemon que é digitado no formulário.
    
});

//Prev and Next Button
buttonPrev.addEventListener('click', () =>{

    if (searchPokemon <= 1){
        searchPokemon = 1;
    } else{
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon); //Quando abrir a página a pokedex nao estará vazia.


