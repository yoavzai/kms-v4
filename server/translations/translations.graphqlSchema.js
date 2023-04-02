const { schemaComposer } = require('graphql-compose')
const { composeMongoose } = require('graphql-compose-mongoose')
const { TranslationModel } = require('./translations.mongoSchema')
const { v4 } = require('uuid');


function addTranslationGraphqlSchema() {
  const TranslationTC = composeMongoose(TranslationModel); //TC from ObjectTypeComposer
  
  schemaComposer.Query.addFields({
      translationById: TranslationTC.mongooseResolvers.findById(),
      translationByIds: TranslationTC.mongooseResolvers.findByIds(),
      translationOne: TranslationTC.mongooseResolvers.findOne(),
      translationMany: TranslationTC.mongooseResolvers.findMany(),
    });
    
    schemaComposer.Mutation.addFields({
      translationCreateOne: TranslationTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc._id = v4()
          return doc;
        }
        return next(rp);
      }),
      translationCreateMany: TranslationTC.mongooseResolvers.createMany().wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function(doc) {
          doc._id = v4()
          return doc;
        }
        return next(rp);
      }),
      translationUpdateById: TranslationTC.mongooseResolvers.updateById(),
      translationRemoveById: TranslationTC.mongooseResolvers.removeById(),
    });

}

module.exports = {
  addTranslationGraphqlSchema
}