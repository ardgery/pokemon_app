import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query ListpokemonsQuery {
    listpokemons {
      name
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query PokemonQuery($id: Int!) {
    pokemon(id: $id) {
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