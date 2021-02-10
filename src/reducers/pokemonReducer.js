import { v4 as uuidv4 } from 'uuid';

const pokemonReducer = (state,action) => {
    switch(action.type){
        case 'ADD_POKEMON':
            return[...state,{
                id: uuidv4(),
                name: action.pokemon.title,
                url: action.pokemon.author,
            }]
        case 'REMOVE_POKEMON':
            return state.filter(pokemon => pokemon.id !== action.id);
        case 'SET_ALL_POKEMONS':
            return action.payload;
        case 'SET_POKEMON_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

export default pokemonReducer
