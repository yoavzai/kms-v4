import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import { CREATE_IMAGE } from "../../../../../../../../mutations/images";
import { useMutation } from "@apollo/client";

export default function ({ input, cancel, save }) {
  const [newText, setNewText] = useState(input.answer.text);
  const [newImageFile, setNewImageFile] = useState(null);
  const [createImage] = useMutation(CREATE_IMAGE);

  function handleUploadImage(e) {
    setNewImageFile(e.target.files[0]);
  }

  function handleSave() {
    if (newImageFile) {
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
        //delete old image from db if exists
        const newInput = {
          ...input,
          answer: { ...input.answer, text: newText, image_id: newImageId },
        };
        save(newInput, newImage);
      };
    }
    const newInput = { ...input, answer: { ...input.answer, text: newText } };
    save(newInput, null);
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogTitle>{input.name}</DialogTitle>
        <TextField
          onChange={(e) => setNewText(e.target.value)}
          value={newText}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>cancel</Button>
        <Input onChange={handleUploadImage} type="file" />
        <Button onClick={handleSave}>save</Button>
      </DialogActions>
    </Dialog>
  );
}
