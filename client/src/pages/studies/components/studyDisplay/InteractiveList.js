import { useState } from 'react';
import { Button, List, ListItemText, IconButton, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export default function({inputs, setInputs}) {


  const [isNewInput, setIsNewInput] = useState(false)
  const [newInputName, setNewInputName] = useState("")

  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    let newInputId = 0
    if (inputs.length > 0) {
      const inputsIds = inputs.map(input => input.input_id)
      const maxInputId = Math.max(...inputsIds)
      newInputId = maxInputId + 1
    }
    setInputs([...inputs, {input_id: newInputId, name: newInputName}])
    setNewInputName("")
    setIsNewInput(false)
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>Inputs</Typography>
      <List>
        {inputs.map((input, index) => {
          return (
            <ListItem key={index}>
              <ListItemText primary={input.name} />
              <IconButton onClick={() => handleDeleteInput(index)}>
                <Delete />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
      <Button variant="contained" onClick={() => setIsNewInput(true)}>
        Add Item
      </Button>
      {isNewInput &&
        <Dialog open={true}>
          <DialogTitle>New Input</DialogTitle>
          <DialogContent>
            <InputLabel>name</InputLabel>
            <TextField required={true} value={newInputName} onChange={(e) => setNewInputName(e.target.value)}></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsNewInput(false)}>Cancel</Button>
            <Button onClick={handleAddInput}>Add</Button>
          </DialogActions>
        </Dialog>}
    </div>
  );
};