import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Button, DialogActions } from "@mui/material";
import { EditCodingsRow, EditRow } from "./components";

const emptyRow = {
  approved_coding_id: "",
  referent: "",
  meaning_value: "",
  sr: "",
  reflvl: "",
  dim: "",
  tr: "",
  fr: "",
  fe: "",
  ss: "",
  mm: "",
  comment: "",
  status: "No",
};

export default function ({ save, cancel, codingsFields, codings }) {
  const [newCodings, setNewCodings] = useState([...codings]);
  const [isNewRow, setIsNewRow] = useState(false);

  function handleSave() {
    save(newCodings);
  }

  function handleCancel() {
    cancel();
  }

  function handleAddRow(newRow) {
    setNewCodings([...newCodings, newRow]);
    setIsNewRow(false);
  }

  function handleRemoveRow(indexToRemove) {
    setNewCodings(newCodings.filter((row, index) => index != indexToRemove));
  }

  function handleEditRow(newRow, newRowIndex) {
    setNewCodings(
      newCodings.map((row, index) => (index === newRowIndex ? newRow : row))
    );
  }

  return (
    <>
      {isNewRow && (
        <EditRow
          row={emptyRow}
          finish={handleAddRow}
          cancel={() => setIsNewRow(false)}
          codingsFields={codingsFields}
        ></EditRow>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {codingsFields.map((code, index) => {
                return <TableCell key={index}>{code.key}</TableCell>;
              })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newCodings.map((row, index) => (
              <EditCodingsRow
                key={index}
                row={row}
                index={index}
                remove={handleRemoveRow}
                save={handleEditRow}
                codingsFields={codingsFields}
              ></EditCodingsRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogActions>
        <Button onClick={() => setIsNewRow(true)}>Add Row</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  );
}
