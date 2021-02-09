import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query PokemonsQuery {
    pokemons {
      name
      url
    }
  }
`;
