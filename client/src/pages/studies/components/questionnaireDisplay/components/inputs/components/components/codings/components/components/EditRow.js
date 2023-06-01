import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { FormRenderer } from "../../../../../../../../../../../components";

export default function ({ row, finish, cancel, codingsFields }) {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    const form = codingsFields.map((field) => {
      return { ...field, value: row[field.key] };
    });
    setFormFields(form);
  }, []);

  function handleSubmit() {
    const newRow = {};
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
  };

  return (
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
  );
}
