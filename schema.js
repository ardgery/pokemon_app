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
  name: 'listpokemons',
  fields: () => ({
    name:{ type: GraphQLString },
    url:{ type: GraphQLString}
  })
});

const PokemonType = new GraphQLObjectType({
  name: 'pokemon',
  fields: () => ({
    id:{ type: GraphQLInt },
    moves: {type: new GraphQLList(MoveTypeDetail)},
    types: {type: new GraphQLList(MoveTypeDetail)}
  })
});
const MoveTypeDetail = new GraphQLObjectType({
  name: 'movedetail',
  fields: () => ({
    name:{ type: GraphQLString },
    url:{ type: GraphQLString}
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    listpokemons: {
      type: new GraphQLList(ListPokemonType),
      resolve(parent, args) {
        return axios
          .get('https://pokeapi.co/api/v2/pokemon')
          .then(res => {
            return res.data.results;
          })
      }
    },
    pokemon: {
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