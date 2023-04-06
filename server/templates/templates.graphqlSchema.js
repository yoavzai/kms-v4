const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { TemplateModel } = require('./templates.mongoSchema')
const { v4 } = require('uuid');


function addTemplateGraphqlSchema() {
  const TemplateTC = composeMongoose(TemplateModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      templateById: TemplateTC.mongooseResolvers.findById(),
      templateByIds: TemplateTC.mongooseResolvers.findByIds(),
      templateOne: TemplateTC.mongooseResolvers.findOne(),
      templateMany: TemplateTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      templateCreateOne: TemplateTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc._id = v4()
          return doc;
        }
        return next(rp);
      }),
      templateCreateMany: TemplateTC.mongooseResolvers.createMany().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc._id = v4()
          return doc;
        }
        return next(rp);
      }),
      templateUpdateById: TemplateTC.mongooseResolvers.updateById(),
      templateRemoveById: TemplateTC.mongooseResolvers.removeById(),
    });

}

module.exports = {
  addTemplateGraphqlSchema
}