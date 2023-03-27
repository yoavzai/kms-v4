const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { TemplateModel } = require('./templates.mongoSchema')


function addTemplateGraphqlSchema() {
  const TemplateTC = composeMongoose(TemplateModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      templateById: TemplateTC.mongooseResolvers.findById(),
      templateByIds: TemplateTC.mongooseResolvers.findByIds(),
      templateOne: TemplateTC.mongooseResolvers.findOne(),
      templateMany: TemplateTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      templateCreateOne: TemplateTC.mongooseResolvers.createOne(),
      templateCreateMany: TemplateTC.mongooseResolvers.createMany(),
      templateUpdateById: TemplateTC.mongooseResolvers.updateById(),
      templateRemoveById: TemplateTC.mongooseResolvers.removeById(),
    });

}

module.exports = {
  addTemplateGraphqlSchema
}