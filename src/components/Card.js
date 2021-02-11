import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from 'contexts/PokemonContext';

export default function Card({id,name,nickname}) {
    const {pokemons,dispatchMyPokemon,mypokemon} = useContext(PokemonContext);

    function removePokemon(e){
        e.preventDefault();
        console.log("HAHEE")
        dispatchMyPokemon({
            type: "REMOVE_FROM_MY_LIST",
            nickname:nickname
        })
    }
    return (
        <div className={"card "+ ((id% 4== 0)?'mr-0':'')}>
            <Link to={`/pokemon/${id}`}><img src={"https://pokeres.bastionbot.org/images/pokemon/"+id+'.png'} width="70%" alt=""/></Link>
            <Link to={`/pokemon/${id}`}>{name}</Link>
            {nickname && (<Link to={`/pokemon/${id}`}>{nickname}</Link>)}
            {nickname && (<button onClick={(e)=>removePokemon(e)}>Remove Pokemon</button>)}
        </div>
    )
}
