import React, {createContext, useReducer, useEffect} from 'react';
import pokemonReducer from 'reducers/pokemonReducer';
import mypokemonReducer from 'reducers/mypokemonReducer';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';

export const PokemonContext = createContext();

export default function PokemonContextProvider(props) {
    const [pokemons, dispatch] = useReducer( pokemonReducer ,);
    const [mypokemon, dispatchMyPokemon] = useReducer( mypokemonReducer ,[]);
    const { data } = useQuery(GET_ALL_POKEMONS);
    function setOwned(par){
        let datas = par.map((v) => 
            Object.assign({}, v, {owned:[]})
        )
        return datas;
    }
    useEffect(()=>{
        if(data) {
            dispatch({
                type: "SET_ALL_POKEMONS",
                payload: setOwned(data.listpokemons)
            });
        }
    },[data])
        
    return (
        <PokemonContext.Provider value={{pokemons, dispatch,mypokemon,dispatchMyPokemon}}>
            {props.children}
        </PokemonContext.Provider>
    );
}
