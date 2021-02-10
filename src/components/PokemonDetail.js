import React,{useEffect, useContext} from 'react';
import 'styles/pages/pokemon_detail.scss';
import { Link, useParams } from 'react-router-dom';
import { GET_POKEMON_DETAIL } from 'graphqlquery/Queries';
import { useQuery,gql } from '@apollo/client';

export default function PokemonDetail() {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
        variables: { id }
    });
    if(data) console.log("DATAEEEEEE = ",data.pokemon)

    return (
        <div>
            <h1>Pokemon Detail</h1>
        </div>
    )
}
