import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GET_CODINGS_FIELDS } from "../../../../queries/fields";
import { useState } from "react";
import { cleanPayload } from "../../../../utils";
import { useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditCodings from "./EditCodings";
import CodingsRow from "./CodingsRow";

export default function ({ input, close, save }) {
  const [codingsFields, setCodingsFields] = useState([]);
  const [isEditCodings, setIsEditCodings] = useState(false);

  useQuery(
    GET_CODINGS_FIELDS,
    { onCompleted: ({ fieldOne: { fields }}) => setCodingsFields(cleanPayload(fields)) },
  );

  function handleSave(newCodings) {
    const newInput = {
      ...input,
      answer: { ...input.answer, codings: newCodings },
    };
    save(newInput, null);
    setIsEditCodings(false);
  }

  return (
    <>
      <Dialog open fullWidth maxWidth="lg">
        <DialogTitle>{input.name}</DialogTitle>
        <DialogContent>
          {isEditCodings ? (
            <EditCodings
              save={handleSave}
              cancel={() => setIsEditCodings(false)}
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
                      <CodingsRow key={index} row={row}></CodingsRow>
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