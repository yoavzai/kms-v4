import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  CREATE_IMAGE,
  DELETE_IMAGE_BY_ID,
} from "../../../../mutations/images";
import { useMutation } from "@apollo/client";
import { MuiFileInput } from "mui-file-input";

export default function ({ input, cancel, save }) {
  const [newText, setNewText] = useState(input.answer.text);
  const [newImageFile, setNewImageFile] = useState(null);
  const [createImage] = useMutation(CREATE_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE_BY_ID);
  const [isFileSizeError, setIsFileSizeError] = useState(false);

  function handleSave() {
    if (newImageFile) {
      if (newImageFile.size > 1000000) {
        setIsFileSizeError(true);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(newImageFile);
      reader.onload = async function (e) {
        const res = await createImage({
          variables: {
            record: { name: newImageFile.name, bindata: e.target.result },
          },
        });
        const newImageId = res.data.imageCreateOne.recordId;
        const newImage = {
          _id: newImageId,
          name: newImageFile.name,
          bindata: e.target.result,
        };
        deleteImage({ variables: { id: input.answer.image_id } });
        const newInput = {
          ...input,
          answer: { ...input.answer, text: newText, image_id: newImageId },
        };
        save(newInput, newImage);
      };
    } else {
      const newInput = { ...input, answer: { ...input.answer, text: newText } };
      save(newInput, null);
    }
  }

  return (
    <Dialog open>
      {isFileSizeError && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"File too big. max size 10mb"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setIsFileSizeError(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
      <DialogContent>
        <DialogTitle>{input.name}</DialogTitle>
        <TextField
          onChange={(e) => setNewText(e.target.value)}
          value={newText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>cancel</Button>
        <MuiFileInput
          label={"upload image"}
          value={newImageFile}
          onChange={(e) => setNewImageFile(e)}
        />
        <Button onClick={handleSave}>save</Button>
      </DialogActions>
    </Dialog>
  );
}