const { schemaComposer } = require("graphql-compose");
const { composeMongoose } = require("graphql-compose-mongoose");
const {
  QuestionnaireModel,
  coding_template,
} = require("./questionnaire.mongoSchema");
const { v4 } = require("uuid");

schemaComposer.createInputTC({
  name: "CodingInput",
  fields: {
    approved_coding_id: "String",
    referent: "String",
    meaning_value: "String",
    sr: "String",
    reflvl: "String",
    dim: "String",
    tr: "String",
    fr: "String",
    fe: "String",
    ss: "String",
    mm: "String",
    comment: "String",
    status: "String",
  },
});

schemaComposer.createObjectTC({
  name: "updateQuestionnairesApprovedCodingPayload",
  fields: {
    recordIds: "[String]",
  },
});

function addQuestionnairesGraphqlSchema() {
  const QuestionnaireTC = composeMongoose(QuestionnaireModel); //TC from ObjectTypeComposer

  schemaComposer.Query.addFields({
    questionnaireById: QuestionnaireTC.mongooseResolvers.findById(),
    questionnaireByIds: QuestionnaireTC.mongooseResolvers.findByIds(),
    questionnaireOne: QuestionnaireTC.mongooseResolvers.findOne(),
    questionnaireMany: QuestionnaireTC.mongooseResolvers
      .findMany()
      .wrap((newResolver) => {
        newResolver
          .getArgTC("sort")
          .addFields({ date_updated: { value: { date_updated: -1 } } }); // -1 is desc, 1 is asc
        return newResolver;
      }),
  });

  schemaComposer.Mutation.addFields({
    questionnaireCreateOne: QuestionnaireTC.mongooseResolvers
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
    questionnaireUpdateById: QuestionnaireTC.mongooseResolvers
      .updateById()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc.date_updated = new Date();
          return doc;
        };
        return next(rp);
      }),
    updateQuestionnairesNewApprovedCoding: {
      type: "updateQuestionnairesApprovedCodingPayload",
      args: {
        newCoding: "CodingInput",
      },
      resolve: async (source, args, context, info) => {
        const date = new Date();
        const bulk = [];
        const recordIds = [];
        const questionnaires = await QuestionnaireModel.find({
          inputs: {
            $elemMatch: {
              codings: {
                $elemMatch: {
                  referent: args.newCoding.referent,
                  meaning_value: args.newCoding.meaning_value,
                },
              },
            },
          },
        });
        for (const q of questionnaires) {
          const newInputs = q.inputs.map((input) => {
            const newCodings = input.answer.codings.map((coding) => {
              if (
                coding.referent === args.newCoding.referent &&
                coding.meaning_value === args.newCoding.meaning_value
              ) {
                return args.newCoding;
              }
              return coding;
            });
            return {
              ...input,
              answer: { ...input.answer, codings: newCodings },
            };
          });
          recordIds.push(q._id);
          const updateOperation = {
            updateOne: {
              filter: { _id: q._id },
              update: { $set: { date_updated: date, inputs: newInputs } },
            },
          };
          bulk.push(updateOperation);
        }
        const res = await QuestionnaireModel.bulkWrite(bulk);
        return { recordIds: recordIds };
      },
    },
    updateQuestionnairesRemoveApprovedCoding: {
      type: "updateQuestionnairesApprovedCodingPayload",
      args: {
        id: "String",
      },
      resolve: async (source, args, context, info) => {
        const date = new Date();
        const bulk = [];
        const recordIds = [];
        const questionnaires = await QuestionnaireModel.find({
          inputs: {
            $elemMatch: {
              codings: {
                $elemMatch: {
                  approved_coding_id: args.id,
                },
              },
            },
          },
        });

        for (const q of questionnaires) {
          const newInputs = q.inputs.map((input) => {
            const newCodings = input.answer.codings.map((coding) => {
              if (coding.approved_coding_id === args.id) {
                return { ...coding, approved_coding_id: "", status: "No" };
              }
              return coding;
            });
            return {
              ...input,
              answer: { ...input.answer, codings: newCodings },
            };
          });
          recordIds.push(q._id);
          const updateOperation = {
            updateOne: {
              filter: { _id: q._id },
              update: { $set: { date_updated: date, inputs: newInputs } },
            },
          };
          bulk.push(updateOperation);
        }
        const res = await QuestionnaireModel.bulkWrite(bulk);
        return { recordIds: recordIds };
      },
    },
    questionnaireRemoveById: QuestionnaireTC.mongooseResolvers
      .updateById()
      .wrapResolve((next) => (rp) => {
        rp.beforeRecordMutate = async function (doc) {
          doc.date_updated = new Date();
          doc.is_deleted = true;
          return doc;
        };
        return next(rp);
      }),
  });
}

module.exports = {
  addQuestionnairesGraphqlSchema,
};
