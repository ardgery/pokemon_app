let initialState=[];
const mypokemonReducer = (state,action) => {
    switch(action.type){
        case 'REMOVE_FROM_MY_LIST':
            return state.filter(item => item.nickname !== action.nickname)
        case 'ADD_TO_MY_LIST':
            return[...state,{
                id: action.payload.id,
                name: action.payload.name,
                nickname: action.payload.nickname,
            }]
        default:
            return state;
    }
}

export default mypokemonReducer