import React, {createContext, useReducer, useEffect} from 'react';
import mypokemonReducer from 'reducers/mypokemonReducer';

export const MyPokemonContext = createContext();

export default function MyPokemonContextProvider(props) {
    const [mypokemon, dispatchMyPokemon] = useReducer( mypokemonReducer ,[],()=>{
        const localData = localStorage.getItem('mypokemon');
        return localData ? JSON.parse(localData) : [];
    });
    useEffect(()=>{
        localStorage.setItem('mypokemon', JSON.stringify(mypokemon));
    },[mypokemon])
    return (
        <MyPokemonContext.Provider value={{mypokemon,dispatchMyPokemon}}>
            {props.children}
        </MyPokemonContext.Provider>
    );
}