const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors')
const { mongoose } = require('mongoose')
const { schemaComposer } = require('graphql-compose')
const { addUserGraphqlSchema} = require('./users/users.graphqlSchema')
const { addCarsGraphqlSchema} = require('./cars/cars.graphqlSchema')


addUserGraphqlSchema()
addCarsGraphqlSchema()
const graphqlSchema = schemaComposer.buildSchema()

async function connectToMongoDB() {
  const MONGO_URL = "mongodb+srv://yoav:yoav@cluster0.8wv31hj.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connection.once("open", () => {
  console.log("connected to mongodb")
  })
  mongoose.connection.on("error", (err) => {
  console.error(err)
  });
  mongoose.set('strictQuery', false)
  await mongoose.connect(MONGO_URL)
}


const app = express();
app.use(cors())
app.use('/', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true,
}));

async function startServer() {
  await connectToMongoDB()
  app.listen(4000);
  console.log('Running a GraphQL API server at http://localhost:4000/');
}
startServer()
