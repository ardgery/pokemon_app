import React, { useContext, useEffect, useState } from 'react';
import Card from 'components/Card';
import 'styles/pages/pokemon_list.scss';
import { PokemonContext } from 'contexts/PokemonContext';
import { MyPokemonContext } from 'contexts/MyPokemonContext';
import Loading from 'images/loading.gif';

export default function PokemonList() {
    const { loading, error, pokemons } = useContext(PokemonContext);
    const { mypokemon } = useContext(MyPokemonContext);
    function countOwned(name) {
        let returnValue = 0;
        for (let i = 0; i < mypokemon.length; i++) {
            if (mypokemon[i].name === name) {
                returnValue += 1;
            }
        }
        return returnValue;
    }
    if (loading) return <div className="listWrapper loadingWrapper"><img src={Loading} alt="" /></div>;
    if (error) return <div className="listWrapper loadingWrapper"><h2>Error on Fetching Data</h2></div>;
    // useEffect(() => {
    //     // axios
    //     //     .get('https://localhost:8080/api/users')
    //     //     .then(res => {
    //     //         console.log("RESSS = ", res)
    //     //     })
    // }, [])
    return (
        <div className="listWrapper">
            <div className="list">
                {
                    pokemons.map((v, i) => {
                        return <Card key={i} name={v.name} id={i + 1} cardIndex={i + 1} totalOwned={countOwned(v.name)} isList={true} />
                    })
                }
            </div>
        </div>
    );
}
