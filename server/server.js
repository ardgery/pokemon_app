const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
// const schema = require('./schema');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connected")
        return server.listen()
    })
    .then((res) => {
        console.log(`🚀  Server ready at ${res.url}`);
    });