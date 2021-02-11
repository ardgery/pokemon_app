import React,{useEffect, useContext, useState} from 'react';
import 'styles/pages/pokemon_detail.scss';
import { Link, useParams } from 'react-router-dom';
import { GET_POKEMON_DETAIL } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';
import { PokemonContext } from 'contexts/PokemonContext';


export default function PokemonDetail() {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
        variables: { id }
    });
    const { pokemons,dispatch,dispatchMyPokemon,mypokemon } = useContext(PokemonContext);
    const [nickname, setNickname] = useState('');
    if(data) console.log("DATAEEEEEE = ",data)
    function checkExistNickname(newNickname){
        var existNickname = false;
        for(let i =0;i<mypokemon.length;i++){
            if (mypokemon[i].nickname == newNickname) {
                existNickname = true;
                break;
            }
        }
        return existNickname;  
    }

    function getPokemon(){
        let success = Math.random() < 0.5;

        if(success) {
            console.log("SUCCESSS GET POKEMON")
            
            if(nickname==''){
                console.log("Pokemon Nickname Cannot be Empty")
            }
            if(!checkExistNickname(nickname)){
                dispatch({
                    type: "UPDATED_OWNED_POKEMON",
                    payload: {id:id-1, nickname:nickname}
                });
                dispatchMyPokemon({
                    type: "ADD_TO_MY_LIST",
                    payload: {
                        id:id,
                        name:data.pokemon.name,
                        nickname:nickname,
                    }
                })
            }else{
                console.log("Nickname is already exist for this kind of pokemon")
            }
        } else {
            console.log("FAILED GET POKEMON")
        }

        setNickname('');

        console.log("POKEMONS = ",pokemons)
    }

    return (
        <div>
            <h1>Pokemon Detail</h1>
            <input type="text" onChange={(e)=>setNickname(e.target.value)} value={nickname}/>
            <button onClick={()=>getPokemon(id)}>Get Pokemon</button>
        </div>
    )
}
