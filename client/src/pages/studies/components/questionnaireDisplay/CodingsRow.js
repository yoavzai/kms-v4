import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { ConfirmationDialog } from "../../../../components";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_APPROVED_CODING,
  DELETE_APPROVED_CODING_BY_ID,
} from "../../../../mutations/codings";
import {
  UPDATE_QUESTIONNAIRES_NEW_APPROVED_CODING,
  UPDATE_QUESTIONNAIRES_REMOVE_APPROVED_CODING,
} from "../../../../mutations/questionnaires";

export default function ({ row }) {
  const dispatch = useDispatch();
  const questionnaire = useSelector((state) => state.questionnaire);
  const [createNewApprovedCoding] = useMutation(CREATE_APPROVED_CODING);
  const [deleteApprovedCoding] = useMutation(DELETE_APPROVED_CODING_BY_ID);
  
  const [updateQuestionnairesNewApprovedCoding] = useMutation(
    UPDATE_QUESTIONNAIRES_NEW_APPROVED_CODING
  );
  const [updateQuestionnairesRemoveApprovedCoding] = useMutation(
    UPDATE_QUESTIONNAIRES_REMOVE_APPROVED_CODING
  );
  const [isNewApproveCodingConfirmation, setIsNewApproveCodingConfirmation] =
    useState(false);
  const [
    isRemoveApproveCodingConfirmation,
    setIsRemoveApproveCodingConfirmation,
  ] = useState(false);

  function newApproveCodingConfirmed() {
    const newRow = { ...row, status: "Yes", comment: "" };
    const approvedCoding = { ...newRow };
    delete approvedCoding["approved_coding_id"];
    createApprovedCoding(approvedCoding);
    setIsNewApproveCodingConfirmation(false);
  }
 
  function removeApproveCodingConfirmed() {
    removeApprovedCoding(row.approved_coding_id);
    setIsRemoveApproveCodingConfirmation(false);
  }

  function handleStatusChange({ target: { checked }}) {
    if (checked) {
      setIsNewApproveCodingConfirmation(true);
    } else {
      setIsRemoveApproveCodingConfirmation(true);
    }
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
    const newInputs = questionnaire.inputs.map((input) => {
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
    dispatch({ type: "updateInputs", payload: newInputs });
  }

  function removeApprovedCoding(id) {
    deleteApprovedCoding({
      variables: { id: id },
    });
    updateQuestionnairesRemoveApprovedCoding({
      variables: { id: id },
    });
    const newInputs = questionnaire.inputs.map((input) => {
      const newCodings = input.answer.codings.map((coding) => {
        if (coding.approved_coding_id === id) {
          return { ...coding, approved_coding_id: "", status: "No" };
        }
        return coding;
      });
      return { ...input, answer: { ...input.answer, codings: newCodings } };
    });
    dispatch({ type: "updateInputs", payload: newInputs });
  }

  return (
    <>
      {isNewApproveCodingConfirmation && (
        <ConfirmationDialog
          handleCancel={() => setIsNewApproveCodingConfirmation(false)}
          handleOk={newApproveCodingConfirmed}
          message={"Approve this coding?"}
        ></ConfirmationDialog>
      )}
      {isRemoveApproveCodingConfirmation && (
        <ConfirmationDialog
          handleCancel={() => setIsRemoveApproveCodingConfirmation(false)}
          handleOk={removeApproveCodingConfirmed}
          message={"Disapprove this coding?"}
        ></ConfirmationDialog>
      )}
      <TableRow>
        <TableCell>{row.referent}</TableCell>
        <TableCell>{row.meaning_value}</TableCell>
        <TableCell>{row.sr}</TableCell>
        <TableCell>{row.reflvl}</TableCell>
        <TableCell>{row.dim}</TableCell>
        <TableCell>{row.tr}</TableCell>
        <TableCell>{row.fr}</TableCell>
        <TableCell>{row.fe}</TableCell>
        <TableCell>{row.ss}</TableCell>
        <TableCell>{row.mm}</TableCell>
        <TableCell>{row.comment}</TableCell>
        <TableCell>
          <Checkbox
            checked={row.status === "Yes"}
            onChange={handleStatusChange}
          ></Checkbox>
        </TableCell>
      </TableRow>
    </>
  );
}
