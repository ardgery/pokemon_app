import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query listpokemonQuery {
    listpokemonQuery {
      name
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query PokemonqueryQuery($id: Int!) {
    pokemonQuery(id: $id) {
      id
      name
      moves{
          name
      }
      types{
        name
      }
    }
  }
`;