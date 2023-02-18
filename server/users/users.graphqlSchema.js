const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { UserModel } = require('./users.mongoSchema')


function addUserGraphqlSchema() {
  const UserTC = composeMongoose(UserModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      userById: UserTC.mongooseResolvers.findById(),
      userByIds: UserTC.mongooseResolvers.findByIds(),
      userOne: UserTC.mongooseResolvers.findOne(),
      userMany: UserTC.mongooseResolvers.findMany(),
      userDataLoader: UserTC.mongooseResolvers.dataLoader(),
      userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
      userCount: UserTC.mongooseResolvers.count(),
      userConnection: UserTC.mongooseResolvers.connection(),
      userPagination: UserTC.mongooseResolvers.pagination(),
    });
    
    schemaComposer.Mutation.addFields({
      userCreateOne: UserTC.mongooseResolvers.createOne(),
      userCreateMany: UserTC.mongooseResolvers.createMany(),
      userUpdateById: UserTC.mongooseResolvers.updateById(),
      userUpdateOne: UserTC.mongooseResolvers.updateOne(),
      userUpdateMany: UserTC.mongooseResolvers.updateMany(),
      userRemoveById: UserTC.mongooseResolvers.removeById(),
      userRemoveOne: UserTC.mongooseResolvers.removeOne(),
      userRemoveMany: UserTC.mongooseResolvers.removeMany(),
    });

}

module.exports = {
  addUserGraphqlSchema
}