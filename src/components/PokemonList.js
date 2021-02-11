import React, {useContext,useEffect} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';
import MainBg from 'images/bg_main.svg';

export default function PokemonList() {
    const {pokemons} = useContext(PokemonContext);

    useEffect(()=>{
        console.log("pokemonsssss = ",pokemons)
    },[pokemons])

    return (
        <div className="listWrapper">
            <div className="list">
                {
                    pokemons.map((v,i)=>{
                        return <Card key={i} name={v.name} owned={v.owned} id={i+1}/>
                    })
                }
            </div>
        </div>
     );
}
