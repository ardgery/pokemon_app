import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query ListpokemonsQuery {
    listpokemons {
      name
      url
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query PokemonQuery($id: Int!) {
    pokemon(id: $id) {
      id
      moves{
          name
          url
      }
      types{
        name
        url
      }
    }
  }
`;