const express = require('express');
const body_parser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const app = express();

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql:true
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;