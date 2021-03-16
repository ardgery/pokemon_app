const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
// const schema = require('./schema');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connected")
        return server.listen()
    })
    .then((res) => {
        console.log(`🚀  Server ready at ${res.url}`);
    });