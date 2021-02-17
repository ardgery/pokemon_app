import React,{useEffect,useContext} from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { MyPokemonContext } from 'contexts/MyPokemonContext';

export default function MyPokemon() {
    const {mypokemon} = useContext(MyPokemonContext);
    return (
        <div className="listWrapper">
            {mypokemon.length<1 && (
                <h1>You currently don't have any owned pokemon.</h1>
            )}
            <div className="list">
                {
                    mypokemon.map((v,i)=>{
                        return <Card key={i} name={v.name} nickname={v.nickname} id={v.id} cardIndex={i+1}/>
                    })
                }
            </div>
        </div>
    )
}
