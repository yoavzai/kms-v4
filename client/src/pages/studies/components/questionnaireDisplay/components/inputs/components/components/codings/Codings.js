import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GET_CODINGS_FIELDS } from "../../../../../../../../../queries/fields";
import { useState } from "react";
import { cleanPayload } from "../../../../../../../../../utils";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditCodings from "./components";
import CodingsRow from "./components/CodingsRow";
import {
  CREATE_APPROVED_CODING,
  DELETE_APPROVED_CODING_BY_ID,
} from "../../../../../../../../../mutations/codings";

export default function ({ input, close, save }) {
  useQuery(GET_CODINGS_FIELDS, { onCompleted: handleSetCodingsFields });
  const [createApprovedCoding] = useMutation(CREATE_APPROVED_CODING);
  const [deleteApprovedCoding] = useMutation(DELETE_APPROVED_CODING_BY_ID);
  const [codingsFields, setCodingsFields] = useState([]);
  const [isEditCodings, setIsEditCodings] = useState(false);

  function handleSetCodingsFields(data) {
    const payload = cleanPayload(data.fieldsOne.fields);
    setCodingsFields(payload);
  }

  function handleSave(newCodings) {
    const newInput = {
      ...input,
      answer: { ...input.answer, codings: newCodings },
    };
    save(newInput, null);
    setIsEditCodings(false);
  }

  function handleCancelEdit() {
    setIsEditCodings(false);
  }

  async function changeApprovedCodingStatus(newRow, newRowIndex) {
    if (newRow.status === "Yes") {
      const newApprovedCodingData = { ...newRow };
      delete newApprovedCodingData["approved_coding_id"];
      const res = await createApprovedCoding({
        variables: { record: newApprovedCodingData },
      });
      newRow.approved_coding_id = res.data.approved_codingsCreateOne.recordId;
      const newCodings = input.answer.codings.map((row, index) =>
        index === newRowIndex ? newRow : row
      );
      handleSave(newCodings);
      // update all questionnaires
    } else {
      deleteApprovedCoding({ variables: { id: newRow.approved_coding_id } });
      newRow.approved_coding_id = "";
      const newCodings = input.answer.codings.map((row, index) =>
        index === newRowIndex ? newRow : row
      );
      handleSave(newCodings);
      // update all questionnaires
    }
  }

  return (
    <>
      <Dialog open fullWidth maxWidth="lg">
        <DialogTitle>{input.name}</DialogTitle>
        <DialogContent>
          {isEditCodings ? (
            <EditCodings
              save={handleSave}
              cancel={handleCancelEdit}
              codingsFields={codingsFields}
              codings={input.answer.codings}
            ></EditCodings>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {codingsFields.map((code, index) => {
                        return <TableCell key={index}>{code.key}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {input.answer.codings.map((row, index) => (
                      <CodingsRow
                        key={index}
                        row={row}
                        index={index}
                        save={changeApprovedCodingStatus}
                      ></CodingsRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <DialogActions>
                <Button onClick={close}>Close</Button>
                <Button onClick={() => setIsEditCodings(true)}>Edit</Button>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
