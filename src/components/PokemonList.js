import React, {useContext,useEffect,useState} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';
import Loading from 'images/loading.gif';

export default function PokemonList() {
    const {pokemons} = useContext(PokemonContext);
    useEffect(()=>{
    },[pokemons])
   
    if(pokemons){
        return (
            <div className="listWrapper">
                <div className="list">
                    {
                        pokemons.map((v,i)=>{
                            return <Card key={i} name={v.name} owned={v.owned} id={i+1} cardIndex={i+1} />
                        })
                    }
                </div>
            </div>
        );
    }
    return <div className="listWrapper loadingWrapper"><img src={Loading} alt=""/></div>;
}
