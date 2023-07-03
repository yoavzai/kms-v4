import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

export default function ({
  row,
  index,
  createApprovedCoding,
  removeApprovedCoding,
}) {
  const [rowData, setRowData] = useState({ ...row });

  function handleStatusChange(e) {
    if (e.target.checked) {
      const newRow = { ...rowData, status: "Yes", comment: "" };
      const approvedCoding = { ...newRow };
      delete approvedCoding["approved_coding_id"];
      createApprovedCoding(approvedCoding);
      setRowData(newRow);
    } else {
      removeApprovedCoding(rowData.approved_coding_id);
      const newRow = { ...rowData, approved_coding_id: "", status: "No" };
      setRowData(newRow);
    }
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
