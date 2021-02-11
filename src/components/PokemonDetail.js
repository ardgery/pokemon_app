import React,{useEffect, useContext, useState} from 'react';
import 'styles/pages/pokemon_detail.scss';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_DETAIL } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';
import { PokemonContext } from 'contexts/PokemonContext';


export default function PokemonDetail() {
    var url = new URL(window.location.href);
    console.log("URLLL = ",url)
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
                    type: "UPDATE_OWNED_POKEMON",
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
        <div className="detailWrapper">
            <div className="detailInside">
                <div className="imgWrapper">
                    <img src={"https://pokeres.bastionbot.org/images/pokemon/"+id+'.png'} width="300px" alt=""/>
                </div>
                <div className="detailColumns">
                    <h1>{data && data.pokemon.name}</h1>
                    <div className="detailPokemon">
                        <h2>Types</h2>
                        <div>
                            {
                                data  && data.pokemon.types.map((v,i)=>{
                                    return (
                                        <p key={i}>{v.name}</p>
                                    )
                                })
                            }
                        </div>
                        <h2 className="headingMoves">Moves</h2>
                        <div className="moves">
                            {
                                data  && data.pokemon.moves.map((v,i)=>{
                                    if(i<3){
                                        return (
                                            <p key={i}>{v.name}</p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <button>Catch this Pokemon!</button>
            {/* <input type="text" onChange={(e)=>setNickname(e.target.value)} value={nickname}/>
            <button onClick={()=>getPokemon(id)}>Get Pokemon</button> */}
        </div>
    )
}
