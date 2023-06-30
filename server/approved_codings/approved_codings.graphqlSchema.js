const { schemaComposer } = require("graphql-compose");
const { composeMongoose } = require("graphql-compose-mongoose");
const { ApprovedCodingsModel } = require("./approved_codings.mongoSchema");
const { v4 } = require("uuid");

function addApprovedCodingsGraphqlSchema() {
  const ApprovedCodingsTC = composeMongoose(ApprovedCodingsModel); //TC from ObjectTypeComposer

  schemaComposer.Query.addFields({
    approved_codingsById: ApprovedCodingsTC.mongooseResolvers.findById(),
    approved_codingsByIds: ApprovedCodingsTC.mongooseResolvers.findByIds(),
    approved_codingsOne: ApprovedCodingsTC.mongooseResolvers.findOne(),
    approved_codingsMany: ApprovedCodingsTC.mongooseResolvers.findMany(),
  });

  schemaComposer.Mutation.addFields({
    approved_codingsCreateOne: ApprovedCodingsTC.mongooseResolvers
      .createOne()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc._id = v4();
          const date = new Date();
          doc.date_created = date;
          doc.date_updated = date;
          doc.is_deleted = false;
          return doc;
        };
        return next(rp);
      }),
    approved_codingsUpdateById: ApprovedCodingsTC.mongooseResolvers
      .updateById()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc.date_updated = new Date();
          return doc;
        };
        return next(rp);
      }),
    approved_codingsRemoveById:
      ApprovedCodingsTC.mongooseResolvers.removeById(),
  });
}

module.exports = {
  addApprovedCodingsGraphqlSchema,
};
