const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { CarModel } = require('./cars.mongoSchema')


function addCarsGraphqlSchema() {

  const CarTC = composeMongoose(CarModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      carById: CarTC.mongooseResolvers.findById(),
      carByIds: CarTC.mongooseResolvers.findByIds(),
      carOne: CarTC.mongooseResolvers.findOne(),
      carMany: CarTC.mongooseResolvers.findMany(),
      carDataLoader: CarTC.mongooseResolvers.dataLoader(),
      carDataLoaderMany: CarTC.mongooseResolvers.dataLoaderMany(),
      carCount: CarTC.mongooseResolvers.count(),
      carConnection: CarTC.mongooseResolvers.connection(),
      carPagination: CarTC.mongooseResolvers.pagination(),
    });
    
    schemaComposer.Mutation.addFields({
      carCreateOne: CarTC.mongooseResolvers.createOne(),
      carCreateMany: CarTC.mongooseResolvers.createMany(),
      carUpdateById: CarTC.mongooseResolvers.updateById(),
      carUpdateOne: CarTC.mongooseResolvers.updateOne(),
      carUpdateMany: CarTC.mongooseResolvers.updateMany(),
      carRemoveById: CarTC.mongooseResolvers.removeById(),
      carRemoveOne: CarTC.mongooseResolvers.removeOne(),
      carRemoveMany: CarTC.mongooseResolvers.removeMany(),
    });
}

module.exports = {
  addCarsGraphqlSchema
}