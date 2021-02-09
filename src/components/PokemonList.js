import React from 'react';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries.js';
import { useQuery } from '@apollo/client';

export default function PokemonList() {
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      console.log("Data = ",data)
  
    return (
        <h1>Hehheeyyy</h1>
     );
}
