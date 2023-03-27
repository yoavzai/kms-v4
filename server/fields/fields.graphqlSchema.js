const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { FieldsModel } = require('./fields.mongoSchema')


function addFieldsGraphqlSchema() {

  const FieldsTC = composeMongoose(FieldsModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      fieldsById: FieldsTC.mongooseResolvers.findById(),
      fieldsByIds: FieldsTC.mongooseResolvers.findByIds(),
      fieldsOne: FieldsTC.mongooseResolvers.findOne(),
      fieldsMany: FieldsTC.mongooseResolvers.findMany(),
    });
    
  schemaComposer.Mutation.addFields({
    fieldsCreateOne: FieldsTC.mongooseResolvers.createOne(),
    fieldsCreateMany: FieldsTC.mongooseResolvers.createMany(),
    fieldsUpdateById: FieldsTC.mongooseResolvers.updateById(),
    fieldsRemoveById: FieldsTC.mongooseResolvers.removeById(),
    });
}

module.exports = {
  addFieldsGraphqlSchema
}