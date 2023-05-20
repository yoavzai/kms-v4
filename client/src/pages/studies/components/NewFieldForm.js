import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Number, Select, TextInput, TextInputAutoSize } from '../../../components/form-components';

export default function NewFieldForm({create, cancel}) {

  const dropdown_options = [{label: "text", value: "text"},{label: "number", value: "number"},{label: "dropdown", value: "dropdown"},{label: "date", value: "date"},{label: "slider", value: "slider"}]

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

  const handleTypeChange = ({target: {value}}) => {
    setFormData({...formData, type: value})
  };
  const handleKeyChange = ({target: {value}}) => {
    setFormData({...formData, key: value})
  };
  const handleMinNumChange = ({target: {value}}) => {
    setFormData({...formData, min_num: value})
  };
  const handleMaxNumChange = ({target: {value}}) => {
    setFormData({...formData, max_num: value})
  };
  const handleDropdownChange = ({target: {value}}) => {
    const dropdown_options = value.split(",").map((option) => option.trim());
    setFormData({...formData, dropdown_options: dropdown_options});
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>New Field</DialogTitle>
        <DialogContent>
          <Select required={true} value={formData.type} label={"type"} options={dropdown_options} onChange={handleTypeChange}></Select>
          <TextInput required={true} value={formData.key} label={"name"} onChange={handleKeyChange}></TextInput>
          {formData.type === "number" &&
          <div>
            <Number value={formData.min_num} label={"min"} onChange={handleMinNumChange}></Number>
            <Number value={formData.max_num} label={"max"} onChange={handleMaxNumChange}></Number>
          </div>
          }
          {formData.type === "dropdown" &&
          <TextInputAutoSize value={formData.dropdown_options.join(",")} label={"options"} onChange={handleDropdownChange}></TextInputAutoSize>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
