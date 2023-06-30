import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

export default function ({ row, index, save }) {
  const [rowData, setRowData] = useState({ ...row });

  function handleStatusChange(e) {
    const checked = e.target.checked;
    const newRow = { ...rowData, status: checked ? "Yes" : "No", comment: "" };
    save(newRow, index);
    setRowData(newRow);
  }

  return (
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
          checked={rowData.status === "Yes"}
          onChange={handleStatusChange}
        ></Checkbox>
      </TableCell>
    </TableRow>
  );
}
