import React,{useEffect,useContext} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';

export default function MyPokemon() {
    const {mypokemon} = useContext(PokemonContext);

    useEffect(()=>{
        console.log("myPokemon = ",mypokemon)
    },[])
    return (
        <div className="listWrapper">
            <div className="list">
                {
                    mypokemon.map((v,i)=>{
                        return <Card key={i} name={v.name} nickname={v.nickname} id={i+1}/>
                    })
                }
            </div>
        </div>
    )
}
