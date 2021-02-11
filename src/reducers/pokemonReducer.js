const pokemonReducer = (state,action) => {
    switch(action.type){
        case 'SET_ALL_POKEMONS':
            return action.payload;
        case 'UPDATED_POKEMON_OWNED':
            let tempArr = state[action.payload.id].owned;
            let tempObj = {};
            tempObj.nickname =  action.payload.nickname;
            tempArr.push(tempObj);
            state[action.payload.id].owned = tempArr;

            return state;
        default:
            return state;
    }
}

export default pokemonReducer
