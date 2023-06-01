import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Codings, EditInput } from "./components";
import { useQuery } from "@apollo/client";
import { IMAGE_BY_ID } from "../../../../../../../queries/images";
import { cleanPayload } from "../../../../../../../utils";

export default function ({ input, updateInput }) {
  const [currentInput, setCurrentInput] = useState({ ...input });
  const [isDisplayImage, setIsDisplayImage] = useState(false);
  const [isDisplayCodings, setIsDisplayCodings] = useState(false);
  const [isEditInput, setIsEditInput] = useState(false);
  const [image, setImage] = useState(null);
  useQuery(IMAGE_BY_ID, {
    variables: { id: input.answer.image_id },
    onCompleted: handleSetImage,
  });

  function handleSetImage(data) {
    const payload = cleanPayload(data.imageById);
    setImage(payload);
  }

  function handleCloseCodings() {
    setIsDisplayCodings(false);
  }

  function handleCancelEdit() {
    setIsEditInput(false);
  }

  function handleSave(newInput, newImage) {
    if (newImage) {
      setImage(newImage);
    }
    setCurrentInput(newInput);
    updateInput(newInput);
    setIsEditInput(false);
  }

  return (
    <div>
      <h4>{currentInput.name}</h4>
      <TextField
        inputProps={{ readOnly: true }}
        value={currentInput.answer.text}
      ></TextField>
      <div>
        <Button onClick={() => setIsEditInput(true)}>edit</Button>
        <Button onClick={() => setIsDisplayCodings(true)}>codings</Button>
        {currentInput.answer.image_id.length > 0 && (
          <Button onClick={() => setIsDisplayImage(true)}>image</Button>
        )}
      </div>
      {isDisplayImage && (
        <Dialog open={true}>
          <DialogContent>
            <img src={image.bindata} alt={image.name}></img>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDisplayImage(false)}>close</Button>
          </DialogActions>
        </Dialog>
      )}
      {isDisplayCodings && (
        <Codings
          input={currentInput}
          close={handleCloseCodings}
          save={handleSave}
        ></Codings>
      )}
      {isEditInput && (
        <EditInput
          input={currentInput}
          cancel={handleCancelEdit}
          save={handleSave}
        ></EditInput>
      )}
    </div>
  );
}
