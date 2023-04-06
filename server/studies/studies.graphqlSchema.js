const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { StudyModel } = require('./studies.mongoSchema')
const { v4 } = require('uuid');


function addStudiesGraphqlSchema() {

  const StudyTC = composeMongoose(StudyModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      studyById: StudyTC.mongooseResolvers.findById(),
      studyByIds: StudyTC.mongooseResolvers.findByIds(),
      studyOne: StudyTC.mongooseResolvers.findOne(),
      studyMany: StudyTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      studyCreateOne: StudyTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
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
      studyUpdateById: StudyTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc.date_updated = new Date()
          return doc;
        }
        return next(rp);
      }),
      studyRemoveById: StudyTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
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
  addStudiesGraphqlSchema
}