import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query ListpokemonQuery {
    listpokemonQuery {
      name
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query PokemonqueryQuery($id: ID!) {
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