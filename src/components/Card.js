import React,{useContext,useEffect,useReducer} from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from 'contexts/PokemonContext';
import { MyPokemonContext } from 'contexts/MyPokemonContext';
import mypokemonReducer from 'reducers/mypokemonReducer';

export default function Card({id,name,nickname,isList,cardIndex,totalOwned}) {
    // const {dispatchMyPokemon} = useContext(MyPokemonContext);
    const [mypokemon, dispatchMyPokemon] = useReducer( mypokemonReducer ,[],()=>{
        const localData = localStorage.getItem('mypokemon');
        return localData ? JSON.parse(localData) : [];
    });
    function ownedText(){
        if(parseInt(totalOwned)>0) return <p>Owned : {totalOwned}</p>;
        else return <p>You don't own this pokemon</p>;
    }
    function removePokemon(e){
        e.preventDefault();
        dispatchMyPokemon({
            type: "REMOVE_FROM_MY_LIST",
            nickname:nickname
        })
    }
    return (
        <div className={"card "+ ((cardIndex % 4== 0)?'mr-0':'')}>
            <Link to={`/pokemon/${id}`} className="imgWrapper"><img src={"https://pokeres.bastionbot.org/images/pokemon/"+id+'.png'} width="70%" alt=""/></Link>
            <div className="nameWrapper"><Link to={`/pokemon/${id}`} className="pokemon_name">{name}</Link></div>
            {isList && ownedText()}
            {nickname && (<p>Nickname : {nickname}</p>)}
            {nickname && (<button onClick={(e)=>removePokemon(e)}>Remove Pokemon</button>)}
        </div>
    )
}
