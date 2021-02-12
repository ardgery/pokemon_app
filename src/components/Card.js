import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from 'contexts/PokemonContext';

export default function Card({id,name,nickname,owned,cardIndex}) {
    const {dispatchMyPokemon,dispatch} = useContext(PokemonContext);
    const ownedText = () => {
        if(owned.length>0) return <p>Owned : {owned.length}</p>;
        if(owned.length<1) return <p>You don't own this pokemon</p>;
    }
    function removePokemon(e){
        e.preventDefault();
        dispatch({
            type: "REMOVE_OWNED",
            payload:{
                id:id-1,
                nickname:nickname
            }
        })
        dispatchMyPokemon({
            type: "REMOVE_FROM_MY_LIST",
            nickname:nickname
        })
    }
    return (
        <div className={"card "+ ((cardIndex % 4== 0)?'mr-0':'')}>
            <Link to={`/pokemon/${id}`} className="imgWrapper"><img src={"https://pokeres.bastionbot.org/images/pokemon/"+id+'.png'} width="70%" alt=""/></Link>
            <div className="nameWrapper"><Link to={`/pokemon/${id}`}>{name}</Link></div>
            {owned && ownedText()}
            {nickname && (<p>Nickname : {nickname}</p>)}
            {nickname && (<button onClick={(e)=>removePokemon(e)}>Remove Pokemon</button>)}
        </div>
    )
}
