const pokemonReducer = (state,action) => {
    switch(action.type){
        case 'REMOVE_OWNED':
            state[action.payload.id].owned = state[action.payload.id].owned.filter(item => item.nickname !== action.payload.nickname);
            return state;
        case 'SET_ALL_POKEMONS':
            return action.payload;
        case 'UPDATE_OWNED_POKEMON':
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
