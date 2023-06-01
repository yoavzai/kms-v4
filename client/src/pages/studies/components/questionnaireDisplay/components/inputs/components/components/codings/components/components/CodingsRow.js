import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import EditRow from "./EditRow";

export default function ({ row, index, remove, save, codingsFields }) {
  const [isEditRow, setIsEditRow] = useState(false);

  function handleDeleteRow() {
    remove(index);
  }

  function handleUpdateRow(newRow) {
    save(newRow, index);
    setIsEditRow(false);
  }

  return (
    <>
      {isEditRow && (
        <EditRow
          row={row}
          finish={handleUpdateRow}
          cancel={() => setIsEditRow(false)}
          codingsFields={codingsFields}
        ></EditRow>
      )}
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
        <TableCell>
          <IconButton onClick={handleDeleteRow}>
            <Delete />
          </IconButton>
          <IconButton onClick={() => setIsEditRow(true)}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
