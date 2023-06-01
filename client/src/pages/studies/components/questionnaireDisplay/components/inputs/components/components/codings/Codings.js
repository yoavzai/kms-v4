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
import { useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditCodings from "./components";

export default function ({ input, close, save }) {
  useQuery(GET_CODINGS_FIELDS, { onCompleted: handleSetCodingsFields });
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
                      <TableRow key={index}>
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
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.comment}</TableCell>
                      </TableRow>
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
