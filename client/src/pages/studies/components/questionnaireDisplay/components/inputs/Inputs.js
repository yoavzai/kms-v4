import { useMutation } from "@apollo/client";
import Input from "./components";
import {
  UPDATE_QUESTIONNAIRES_NEW_APPROVED_CODING,
  UPDATE_QUESTIONNAIRES_REMOVE_APPROVED_CODING,
  UPDATE_QUESTIONNAIRE_BY_ID,
} from "../../../../../../mutations/questionnaires";
import {
  CREATE_APPROVED_CODING,
  DELETE_APPROVED_CODING_BY_ID,
} from "../../../../../../mutations/codings";
import { useState } from "react";

export default function ({ inputs, questionnaireId }) {
  const [localInputs, setLocalInputs] = useState([...inputs]);
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID);
  const [createNewApprovedCoding] = useMutation(CREATE_APPROVED_CODING);
  const [deleteApprovedCoding] = useMutation(DELETE_APPROVED_CODING_BY_ID);
  const [updateQuestionnairesNewApprovedCoding] = useMutation(
    UPDATE_QUESTIONNAIRES_NEW_APPROVED_CODING
  );
  const [updateQuestionnairesRemoveApprovedCoding] = useMutation(
    UPDATE_QUESTIONNAIRES_REMOVE_APPROVED_CODING
  );

  function updateInputs(newInput) {
    const newInputs = localInputs.map((input) => {
      if (input.input_id === newInput.input_id) {
        return newInput;
      }
      return input;
    });
    setLocalInputs(newInputs);
    updateQuestionnaire({
      variables: { id: questionnaireId, record: { inputs: newInputs } },
    });
  }

  async function createApprovedCoding(approvedCoding) {
    const res = await createNewApprovedCoding({
      variables: { record: approvedCoding },
    });
    const approved_coding_id = res.data.approved_codingsCreateOne.recordId;
    const newCoding = {
      ...approvedCoding,
      approved_coding_id: approved_coding_id,
    };
    updateQuestionnairesNewApprovedCoding({
      variables: { newCoding: newCoding },
    });
    const newInputs = localInputs.map((input) => {
      const newCodings = input.answer.codings.map((coding) => {
        if (
          coding.referent === newCoding.referent &&
          coding.meaning_value === newCoding.meaning_value
        ) {
          return newCoding;
        }
        return coding;
      });
      return { ...input, answer: { ...input.answer, codings: newCodings } };
    });
    console.log(newInputs);
    setLocalInputs(newInputs);
  }

  function removeApprovedCoding(id) {
    deleteApprovedCoding({
      variables: { id: id },
    });
    updateQuestionnairesRemoveApprovedCoding({
      variables: { id: id },
    });
    const newInputs = localInputs.map((input) => {
      const newCodings = input.answer.codings.map((coding) => {
        if (coding.approved_coding_id === id) {
          return { ...coding, approved_coding_id: "", status: "No" };
        }
        return coding;
      });
      return { ...input, answer: { ...input.answer, codings: newCodings } };
    });
    console.log(newInputs);
    setLocalInputs(newInputs);
  }

  return (
    <div>
      {localInputs.map((input, index) => {
        return (
          <Input
            key={index}
            input={input}
            updateInput={updateInputs}
            createApprovedCoding={createApprovedCoding}
            removeApprovedCoding={removeApprovedCoding}
          ></Input>
        );
      })}
    </div>
  );
}
