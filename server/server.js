const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const { mongoose } = require("mongoose");
const { schemaComposer } = require("graphql-compose");
const { addUserGraphqlSchema } = require("./users/users.graphqlSchema");
const { addStudiesGraphqlSchema } = require("./studies/studies.graphqlSchema");
const {
  addQuestionnairesGraphqlSchema,
} = require("./questionnaires/questionnaire.graphqlSchema");
const {
  addTemplateGraphqlSchema,
} = require("./templates/templates.graphqlSchema");
const {
  addTranslationGraphqlSchema,
} = require("./translations/translations.graphqlSchema");
const { addFieldsGraphqlSchema } = require("./fields/fields.graphqlSchema");
const {
  addApprovedCodingsGraphqlSchema,
} = require("./approved_codings/approved_codings.graphqlSchema");
const { addImageGraphqlSchema } = require("./images/images.graphqlSchema");

addImageGraphqlSchema();
addApprovedCodingsGraphqlSchema();
addFieldsGraphqlSchema();
addQuestionnairesGraphqlSchema();
addStudiesGraphqlSchema();
addTemplateGraphqlSchema();
addTranslationGraphqlSchema();
addUserGraphqlSchema();
const graphqlSchema = schemaComposer.buildSchema();

async function connectToMongoDB() {
  const MONGO_URL =
    "mongodb+srv://yoav:yoav@cluster0.8wv31hj.mongodb.net/kms?retryWrites=true&w=majority";
  mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
  });
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    console.error(err);
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));
app.use(
  "/",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
  })
);

async function startServer() {
  await connectToMongoDB();
  app.listen(4000);
  console.log("Running a GraphQL API server at http://localhost:4000/");
}
startServer();
