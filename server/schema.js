const { makeExecutableSchema } = require('apollo-server');
const gql = require('graphql-tag');
const axios = require('axios');

const typeDefs = gql`
  type ListPokemonType {
    name: String
  }
  type PokemonType {
    id: ID!
    name: String
    moves: [MovesAndTypes],
    types: [MovesAndTypes]
  }
  type MovesAndTypes {
    name: String
  }
  type Query {
    listpokemonQuery: [ListPokemonType],
    pokemonQuery(id: ID!): PokemonType
  }
`;

const resolvers = {
  Query: {
    listpokemonQuery: () => {
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
          return res.data.results;
        })
    },
    pokemonQuery: (parent, args, context, info) => {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${args.id}`)
        .then(res => {
          return ({
            id: res.data.id,
            name: res.data.forms[0].name,
            moves: res.data.moves.map(item => item.move),
            types: res.data.types.map(item => item.type)
          });
        });
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;