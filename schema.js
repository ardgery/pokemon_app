const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Pokemon Type
const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    name:{ type: GraphQLString },
    url:{ type: GraphQLString}
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pokemons: {
      type: new GraphQLList(PokemonType),
      resolve(parent, args) {
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.data.results)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});