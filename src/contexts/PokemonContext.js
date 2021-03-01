import React, {createContext, useReducer, useEffect} from 'react';
import pokemonReducer from 'reducers/pokemonReducer';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';

export const PokemonContext = createContext();

export default function PokemonContextProvider(props) {
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS);
    const [pokemons, dispatch] = useReducer( pokemonReducer,undefined,()=>{
        const localData = localStorage.getItem('pokemons');
        return localData ? JSON.parse(localData) : [];
    });
    function setAllPokemons(){
        dispatch({
            type: "SET_ALL_POKEMONS",
            payload: data.listpokemonQuery
        });
    }
    useEffect(()=>{
        localStorage.setItem('pokemons', JSON.stringify(pokemons))
    },[pokemons])
    useEffect(()=>{
        if(data) {
            setAllPokemons();
        }
    },[data])
        
    return (
        <PokemonContext.Provider value={{loading,error,pokemons,dispatch}}>
            {props.children}
        </PokemonContext.Provider>
    );
}