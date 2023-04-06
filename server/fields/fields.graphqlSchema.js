const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { FieldsModel } = require('./fields.mongoSchema')
const { v4 } = require('uuid');


function addFieldsGraphqlSchema() {

  const FieldsTC = composeMongoose(FieldsModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      fieldsById: FieldsTC.mongooseResolvers.findById(),
      fieldsByIds: FieldsTC.mongooseResolvers.findByIds(),
      fieldsOne: FieldsTC.mongooseResolvers.findOne(),
      fieldsMany: FieldsTC.mongooseResolvers.findMany(),
    });
    
  schemaComposer.Mutation.addFields({
    fieldsCreateOne: FieldsTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
      rp.beforeRecordMutate = async function(doc) {
        doc._id = v4()
        return doc;
      }
      return next(rp);
    }),
    fieldsCreateMany: FieldsTC.mongooseResolvers.createMany().wrapResolve((next) => (rp) => {
      rp.beforeRecordMutate = async function(doc) {
        doc._id = v4()
        return doc;
      }
      return next(rp);
    }),
    fieldsUpdateById: FieldsTC.mongooseResolvers.updateById(),
    fieldsRemoveById: FieldsTC.mongooseResolvers.removeById(),
    });
}

module.exports = {
  addFieldsGraphqlSchema
}