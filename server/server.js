const path = require('path')
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const cors = require('cors')

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});
const resolversArray = loadFilesSync('**/*', {
  extensions: ['resolvers.js'],
});

const schema = makeExecutableSchema(
  {
    typeDefs: typesArray,
    resolvers: resolversArray,
  }
)

const app = express();

app.use(cors())

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/');