const pokeApi = {}

// função de conversão dos detalhes para a classe pokemon (no pokemon-model.js)
function convertPokeApiDetailToPokemon(pokeDetail) {
    // cria nova instância do pokemon
    const pokemon = new Pokemon()
    // resgata número e nome do pokemon
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    // resgata e mapeia os tipos
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types  
    pokemon.types = types
    pokemon.type = type
    // resgata imagem do pokemon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    // retorna o pokemon
    return pokemon
}
/* busca os detalhes do pokemon na url, transforma em json e então na
ultima função converte para uma classe pokemon (usando a função acima)*/
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}