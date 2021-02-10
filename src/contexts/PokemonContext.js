import React, {createContext, useReducer, useEffect} from 'react';
import pokemonReducer from '../reducers/pokemonReducer';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';

export const PokemonContext = createContext();

export default function PokemonContextProvider(props) {
    let [pokemons, dispatch] = useReducer( pokemonReducer ,[]);
    const { data } = useQuery(GET_ALL_POKEMONS);
    function setOwned(par){
        let datas = par.map((v,i) => 
            Object.assign({}, v, {owned:0,id:i+1})
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
        <PokemonContext.Provider value={{pokemons, dispatch}}>
            {props.children}
        </PokemonContext.Provider>
    );
}
