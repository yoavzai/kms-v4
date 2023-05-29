import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function NewFieldForm({ create, cancel }) {
  const dropdown_options = ["text", "number", "dropdown", "date", "slider"];

  const [formData, setFormData] = useState({
    type: "",
    value: "",
    key: "",
    min_num: "",
    max_num: "",
    mandatory: false,
    dropdown_options: [],
  });

  const handleClose = () => {
    cancel();
  };

  const handleCreate = () => {
    create(formData);
  };

  const handleTypeChange = ({ target: { value } }) => {
    setFormData({ ...formData, type: value });
  };
  const handleKeyChange = ({ target: { value } }) => {
    setFormData({ ...formData, key: value });
  };
  const handleMinNumChange = ({ target: { value } }) => {
    setFormData({ ...formData, min_num: value });
  };
  const handleMaxNumChange = ({ target: { value } }) => {
    setFormData({ ...formData, max_num: value });
  };
  const handleDropdownChange = ({ target: { value } }) => {
    const dropdown_options = value.split(",").map((option) => option.trim());
    setFormData({ ...formData, dropdown_options: dropdown_options });
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>New Field</DialogTitle>
        <DialogContent>
          <InputLabel>type</InputLabel>
          <Select
            required={true}
            value={formData.type}
            onChange={handleTypeChange}
          >
            {dropdown_options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <InputLabel>name</InputLabel>
          <TextField
            required={true}
            value={formData.key}
            onChange={handleKeyChange}
          ></TextField>
          {formData.type === "number" && (
            <div>
              <InputLabel>min</InputLabel>
              <TextField
                value={formData.min_num}
                type="number"
                onChange={handleMinNumChange}
                // inputProps={{min: formData.min_num, max: formData.max_num}}
              />
              <InputLabel>max</InputLabel>
              <TextField
                value={formData.max_num}
                type="number"
                onChange={handleMaxNumChange}
                // inputProps={{min: formData.min_num, max: formData.max_num}}
              />
            </div>
          )}
          {formData.type === "dropdown" && (
            <div>
              <InputLabel>options</InputLabel>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="option 1,option 2,option 3,...,last option"
                style={{ width: 200 }}
                value={formData.dropdown_options.join(",")}
                onChange={handleDropdownChange}
                variant="standard"
              />
              {/* <TextInputAutoSize value={formData.dropdown_options.join(",")} label={"options"} onChange={handleDropdownChange}></TextInputAutoSize> */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
