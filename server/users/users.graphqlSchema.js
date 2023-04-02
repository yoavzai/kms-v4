const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { UserModel } = require('./users.mongoSchema')
const { v4 } = require('uuid');


function addUserGraphqlSchema() {
  const UserTC = composeMongoose(UserModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      userById: UserTC.mongooseResolvers.findById(),
      userByIds: UserTC.mongooseResolvers.findByIds(),
      userOne: UserTC.mongooseResolvers.findOne(),
      userMany: UserTC.mongooseResolvers.findMany(),
    });
  
  schemaComposer.Mutation.addFields({
    userCreateOne: UserTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
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
    userUpdateById: UserTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
      rp.beforeRecordMutate = async function(doc) {
        doc.date_updated = new Date()
        return doc;
      }
      return next(rp);
    }),
    userRemoveById: UserTC.mongooseResolvers.updateById().wrapResolve((next) => (rp) => {
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
  addUserGraphqlSchema
}