const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { QuestionnaireModel } = require('./questionnaire.mongoSchema')
const { v4 } = require('uuid');


function addQuestionnairesGraphqlSchema() {

  const QuestionnaireTC = composeMongoose(QuestionnaireModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      questionnaireById: QuestionnaireTC.mongooseResolvers.findById(),
      questionnaireByIds: QuestionnaireTC.mongooseResolvers.findByIds(),
      questionnaireOne: QuestionnaireTC.mongooseResolvers.findOne(),
      questionnaireMany: QuestionnaireTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      questionnaireCreateOne: QuestionnaireTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc._id = v4()
          const date = new Date()
          doc.date_created = date
          doc.date_updated = date
          doc.is_deleted = false
          return doc;
        }
        return next(rp);
      }),
      questionnaireUpdateById: QuestionnaireTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc.date_updated = new Date()
          return doc;
        }
        return next(rp);
      }),
      questionnaireRemoveById: QuestionnaireTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc.date_updated = new Date()
          doc.is_deleted = true
          return doc;
        }
        return next(rp);
      }),

    });
}

module.exports = {
  addQuestionnairesGraphqlSchema
}