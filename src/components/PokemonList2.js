import React, {useContext,useEffect,useState} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';
import { MyPokemonContext } from 'contexts/MyPokemonContext';
import Loading from 'images/loading.gif';

export function CountOwned(name,mypokemon){
    if(mypokemon){
        let returnValue = 0;
        for(let i=0;i<mypokemon.length;i++){
            if( mypokemon[i].name === name ){
                returnValue+=1;
            }
        }
    }
    return false;
}
export function PokemonList() {
    const {loading,error,pokemons} = useContext(PokemonContext);
    const {mypokemon} = useContext(MyPokemonContext);
    
    if(loading) return <div className="listWrapper loadingWrapper"><img src={Loading} alt=""/></div>;
    if(error) return <div className="listWrapper loadingWrapper"><h2>Error on Fetching Data</h2></div>;
    return (
        <div className="listWrapper">
            <div className="list">
                {
                    pokemons.map((v,i)=>{
                        return <Card key={i} name={v.name} id={i+1} cardIndex={i+1} totalOwned={CountOwned(v.name,mypokemon)} isList={true}  />
                    })
                }
            </div>
        </div>
    );
}
