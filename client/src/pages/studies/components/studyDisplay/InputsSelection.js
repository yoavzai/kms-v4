import { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NewTemplateWizard from "./NewTemplateWizard";
import Typography from '@mui/material/Typography';

export default function ({
  templates,
  chosenTemplate,
  setChosenTemplate,
  createNewTemplate,
}) {
  const [isNewTemplate, setIsNewTemplate] = useState(false);

  function handleCreateNewTemplate(name, inputs) {
    createNewTemplate(name, inputs);
    setIsNewTemplate(false);
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>Choose a template or create a new one</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="global-templates-radio-buttons-group"
          name="global-templates-radio-buttons-group"
          onChange={(e) =>
            setChosenTemplate(templates.find((t) => t._id === e.target.value))
          }
        >
          {templates.map(({ _id, name }) => (
            <FormControlLabel
              checked={_id === chosenTemplate._id}
              key={_id}
              value={_id}
              control={<Radio />}
              label={name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography variant="h4" gutterBottom>Inputs</Typography>
      <List>
        {chosenTemplate?.inputs?.map((input) => {
          return (
            <ListItem key={input.input_id}>
              <ListItemText primary={input.name} />
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => setIsNewTemplate(true)}>New Template</Button>
      {isNewTemplate && (
        <Dialog open={true}>
          <DialogContent>
            <NewTemplateWizard
              templates={templates}
              createNewTemplate={handleCreateNewTemplate}
              cancelNewTemplate={() => setIsNewTemplate(false)}
            ></NewTemplateWizard>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
