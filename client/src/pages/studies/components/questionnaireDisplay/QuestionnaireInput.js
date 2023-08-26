import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import EditInput from "./EditInput";
import Codings from "./Codings";
import { useQuery } from "@apollo/client";
import { IMAGE_BY_ID } from "../../../../queries/images";
import { cleanPayload } from "../../../../utils";
import Typography from '@mui/material/Typography';

export default function ({ input, updateInput }) {
  const [isDisplayImage, setIsDisplayImage] = useState(false);
  const [isDisplayCodings, setIsDisplayCodings] = useState(false);
  const [isEditInput, setIsEditInput] = useState(false);
  const [image, setImage] = useState(null);

  useQuery(IMAGE_BY_ID, {
    variables: { id: input.answer.image_id },
    onCompleted: ({ imageById }) => setImage(cleanPayload(imageById)),
  });

  function handleSave(newInput, newImage) {
    if (newImage) {
      setImage(newImage);
    }
    updateInput(newInput);
    setIsEditInput(false);
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>{input.name}</Typography>
      <TextField
        inputProps={{ readOnly: true }}
        value={input.answer.text}
      ></TextField>
      <div>
        <Button onClick={() => setIsEditInput(true)}>edit</Button>
        <Button onClick={() => setIsDisplayCodings(true)}>codings</Button>
        {input.answer.image_id.length > 0 && (
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
          input={input}
          close={() => setIsDisplayCodings(false)}
          save={handleSave}
        ></Codings>
      )}
      {isEditInput && (
        <EditInput
          input={input}
          cancel={() => setIsEditInput(false)}
          save={handleSave}
        ></EditInput>
      )}
    </div>
  );
}