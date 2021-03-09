const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');


const ListPokemonType = new GraphQLObjectType({
  name: 'listpokemonQuery',
  fields: () => ({
    name:{ type: GraphQLString }
  })
});

const PokemonType = new GraphQLObjectType({
  name: 'pokemonQuery',
  fields: () => ({
    id:{ type: GraphQLInt },
    name: {type: GraphQLString},
    moves: {type: new GraphQLList(CommonType)},
    types: {type: new GraphQLList(CommonType)}
  })
});
const CommonType = new GraphQLObjectType({
  name: 'commondetail',
  fields: () => ({
    name:{ type: GraphQLString },
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    listpokemonQuery: {
      type: new GraphQLList(ListPokemonType),
      resolve(parent, args) {
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => {
            return res.data.results;
          })
      }
    },
    pokemonQuery: {
      type: PokemonType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${args.id}`)
          .then(res => {
            return({
              id: res.data.id,
              name: res.data.forms[0].name,
              moves: res.data.moves.map(item=>item.move),
              types: res.data.types.map(item=>item.type)
            });
          });
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});