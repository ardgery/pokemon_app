import React, {useContext,useEffect,useReducer} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';
import { MyPokemonContext } from 'contexts/MyPokemonContext';
import Loading from 'images/loading.gif';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';
import mypokemonReducer from 'reducers/mypokemonReducer';

export function CountOwned(name,mypokemon){
    if(mypokemon){
        let returnValue = 0;
        for(let i=0;i<mypokemon.length;i++){
            if( mypokemon[i].name === name ){
                returnValue+=1;
            }
        }
        return returnValue;
    }
    return false;
}
export function PokemonList() {
    // const {loading,error,pokemons} = useContext(PokemonContext);
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS);
    const [mypokemon] = useReducer( mypokemonReducer ,[],()=>{
        const localData = localStorage.getItem('mypokemon');
        return localData ? JSON.parse(localData) : [];
    });
    // const {mypokemon} = useContext(MyPokemonContext);
    useEffect(()=>{
        if(data){
            // console.log("pokemons = ",data.listpokemonQuery)
        }
        
    })
    if(error) return <div className="listWrapper loadingWrapper">Error on Fetching Data<h2>Error on Fetching Data</h2></div>;
    if(loading) return <div className="listWrapper loadingWrapper" role="loading">Loading...<img src={Loading} alt=""/></div>;
    return (
        <div className="listWrapper">
            <div className="list" id="list_pokemon">
                {
                    data.listpokemonQuery.map((v,i)=>{
                        return <Card key={i} name={v.name} id={i+1} cardIndex={i+1} totalOwned={CountOwned(v.name,mypokemon)} isList={true}  />
                    })
                }
            </div>
        </div>
    );
}
