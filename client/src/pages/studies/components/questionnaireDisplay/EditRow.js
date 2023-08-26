import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  fabClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ConfirmationDialog,
  FormRenderer,
} from "../../../../components";
import { useQuery } from "@apollo/client";
import { GET_APPROVED_CODINGS } from "../../../../queries/codings";
import { cleanPayload } from "../../../../utils";

export default function ({ row, finish, cancel, codingsFields }) {
  const [formFields, setFormFields] = useState([]);
  const [approvedCodings, setApprovedCodings] = useState([]);
  useQuery(GET_APPROVED_CODINGS, {
    onCompleted: handleSetApprovedCodings,
  });
  const [isApproved, setIsApproved] = useState(false);
  const [isCodingNotValid, setIsCodingNotValid] = useState(false);

  useEffect(() => {
    const form = codingsFields
      .filter(
        (field) => field.key !== "status" && field.key !== "approved_coding_id"
      )
      .map((field) => {
        return { ...field, value: row[field.key] };
      });
    setFormFields(form);
  }, []);

  function handleSetApprovedCodings(data) {
    const approved_coding = cleanPayload(data.approved_codingsMany);
    setApprovedCodings(approved_coding);
  }

  function getReferentFieldValue() {
    return formFields.find((field) => field.key === "referent").value;
  }

  function getMeaningValueFieldValue() {
    return formFields.find((field) => field.key === "meaning_value").value;
  }

  function handleSubmit() {
    const referent = getReferentFieldValue();
    const meaning_value = getMeaningValueFieldValue();
    if (isApprovedCoding(referent, meaning_value)) {
      setIsCodingNotValid(true);
      return;
    }
    const newRow = {
      status: row.status,
      approved_coding_id: row.approved_coding_id,
    };
    for (const field of formFields) {
      newRow[field.key] = field.value;
    }
    finish(newRow);
  }

  const handleValueChange = (newValue, key) => {
    newValue = newValue.toString();
    const newformFields = formFields.map((field) => {
      if (field.key === key) {
        return { ...field, value: newValue };
      }
      return field;
    });
    setFormFields(newformFields);
    if (key === "referent") {
      const referent = newValue;
      const meaning_value = getMeaningValueFieldValue();
      if (isApprovedCoding(referent, meaning_value)) {
        setIsApproved(true);
      }
    }
    if (key === "meaning_value") {
      const meaning_value = newValue;
      const referent = getReferentFieldValue();
      if (isApprovedCoding(referent, meaning_value)) {
        setIsApproved(true);
      }
    }
  };

  function isApprovedCoding(referent, meaning_value) {
    const isApproved = approvedCodings.find(
      (coding) =>
        coding.referent === referent && coding.meaning_value === meaning_value
    );
    if (isApproved === undefined) {
      return false;
    }
    return true;
  }

  function handleUseApprovedCoding() {
    const referent = getReferentFieldValue();
    const meaning_value = getMeaningValueFieldValue();
    const newRow = approvedCodings.find(
      (coding) =>
        coding.referent === referent && coding.meaning_value === meaning_value
    );
    newRow.approved_coding_id = newRow._id;
    delete newRow._id;
    finish(newRow);
  }

  return (
    <>
      <Dialog open>
        <DialogContent>
          <FormRenderer
            isCheckbox={false}
            fields={formFields}
            handleValueChange={handleValueChange}
          />
          <DialogActions>
            <Button onClick={cancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Finish</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {isApproved && (
        <ConfirmationDialog
          message={
            "this coding is approved. do you want to use the approved one or create a differet coding?"
          }
          handleCancel={() => setIsApproved(false)}
          handleOk={handleUseApprovedCoding}
        ></ConfirmationDialog>
      )}
      {isCodingNotValid && (
        <ConfirmationDialog
          message={
            "this coding is already approved. you cant create a different analisys for that coding. do you want to use the approved one or create a differet coding?"
          }
          handleCancel={() => setIsCodingNotValid(false)}
          handleOk={handleUseApprovedCoding}
        ></ConfirmationDialog>
      )}
    </>
  );
}
