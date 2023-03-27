const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { TranslationModel } = require('./translations.mongoSchema')


function addTranslationGraphqlSchema() {
  const TranslationTC = composeMongoose(TranslationModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      translationById: TranslationTC.mongooseResolvers.findById(),
      translationByIds: TranslationTC.mongooseResolvers.findByIds(),
      translationOne: TranslationTC.mongooseResolvers.findOne(),
      translationMany: TranslationTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      translationCreateOne: TranslationTC.mongooseResolvers.createOne(),
      translationCreateMany: TranslationTC.mongooseResolvers.createMany(),
      translationUpdateById: TranslationTC.mongooseResolvers.updateById(),
      translationRemoveById: TranslationTC.mongooseResolvers.removeById(),
    });

}

module.exports = {
  addTranslationGraphqlSchema
}