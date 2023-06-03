import { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NewTemplateWizard from "./components";

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

  function handleCancelNewTemplate() {
    setIsNewTemplate(false);
  }

  return (
    <div>
      <h2>Choose a template or create a new one</h2>
      <FormControl>
        <RadioGroup
          aria-labelledby="global-templates-radio-buttons-group"
          name="global-templates-radio-buttons-group"
          onChange={(e) =>
            setChosenTemplate(templates.find((t) => t._id === e.target.value))
          }
        >
          {templates.map((t) => (
            <FormControlLabel
              checked={t._id === chosenTemplate._id}
              key={t._id}
              value={t._id}
              control={<Radio />}
              label={t.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <h3>Inputs</h3>
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
              cancelNewTemplate={handleCancelNewTemplate}
            ></NewTemplateWizard>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
