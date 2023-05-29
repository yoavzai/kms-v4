const { schemaComposer } = require("graphql-compose");
const { composeMongoose } = require("graphql-compose-mongoose");
const { ImageModel } = require("./images.mongoSchema");
const { v4 } = require("uuid");

function addImageGraphqlSchema() {
  const ImageTC = composeMongoose(ImageModel); //TC from ObjectTypeComposer

  schemaComposer.Query.addFields({
    imageById: ImageTC.mongooseResolvers.findById(),
    imageByIds: ImageTC.mongooseResolvers.findByIds(),
    imageOne: ImageTC.mongooseResolvers.findOne(),
    imageMany: ImageTC.mongooseResolvers.findMany(),
  });

  schemaComposer.Mutation.addFields({
    imageCreateOne: ImageTC.mongooseResolvers
      .createOne()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc._id = v4();
          return doc;
        };
        return next(rp);
      }),
    imageCreateMany: ImageTC.mongooseResolvers
      .createMany()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc._id = v4();
          return doc;
        };
        return next(rp);
      }),
    imageUpdateById: ImageTC.mongooseResolvers.updateById(),
    imageRemoveById: ImageTC.mongooseResolvers.removeById(),
  });
}

module.exports = {
  addImageGraphqlSchema,
};
