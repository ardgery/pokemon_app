const pokemonReducer = (state,action) => {
    switch(action.type){
        case 'SET_ALL_POKEMONS':
            return action.payload;
        default:
            return state;
    }
}

export default pokemonReducer
