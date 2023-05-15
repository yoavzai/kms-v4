import { useState } from 'react';
import { Button, List, ListItemText, IconButton, ListItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TextInput } from '../../../components/form-components';


export default function({inputs, setInputs}) {

  const [isNewInput, setIsNewInput] = useState(false)
  const [newInputName, setNewInputName] = useState("")

  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    const inputsIds = inputs.map(input => input.input_id)
    const maxInputId = Math.max(...inputsIds)
    setInputs([...inputs, {input_id: maxInputId + 1, name: newInputName}])
    setNewInputName("")
    setIsNewInput(false)
  };

  return (
    <div>
      <h3>Inputs</h3>
      <List>
        {inputs.map((input, index) => (
          <ListItem key={index}>
            <ListItemText primary={input.name} />
            <IconButton onClick={() => handleDeleteInput(index)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={() => setIsNewInput(true)}>
        Add Item
      </Button>
      {isNewInput &&
        <Dialog open={true}>
          <DialogTitle>New Input</DialogTitle>
          <DialogContent>
            <TextInput required={true} value={newInputName} label={"name"} onChange={(e) => setNewInputName(e.target.value)}></TextInput>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsNewInput(false)}>Cancel</Button>
            <Button onClick={handleAddInput}>Add</Button>
          </DialogActions>
        </Dialog>}
    </div>
  );
};