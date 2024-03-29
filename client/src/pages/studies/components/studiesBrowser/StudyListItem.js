import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditStudyWizard from "./EditStudyWizard";
import { ConfirmationDialog } from "../../../../components";
import { Delete, Edit } from "@mui/icons-material";

export default function ({ study, updateStudy, deleteStudy }) {
  const navigate = useNavigate();
  const [isDeleteStudyConfirmation, setIsDeleteStudyConfirmation] = useState(false);
  const [isEditStudy, setIsEditStudy] = useState(false);

  async function handleFinishEditStudy(newStudyData) {
    await updateStudy(study._id, newStudyData);
    setIsEditStudy(false);
    navigate("/studies/" + study._id);
  }

  return (
    <>
      <ListItemButton>
        <ListItemText
          onClick={async () => navigate("/studies/" + study._id)}
          primary={study.study_details.find((s) => s.key === "name").value}
        />
        <IconButton onClick={() => setIsDeleteStudyConfirmation(true)}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => setIsEditStudy(true)}>
          <Edit />
        </IconButton>
      </ListItemButton>
      {isEditStudy && (
        <Dialog open>
          <DialogContent>
            <EditStudyWizard
              cancelEditStudy={() => setIsEditStudy(false)}
              finishEditStudy={handleFinishEditStudy}
              study={study}
            ></EditStudyWizard>
          </DialogContent>
        </Dialog>
      )}
      {isDeleteStudyConfirmation && (
        <ConfirmationDialog
          handleCancel={() => setIsDeleteStudyConfirmation(false)}
          handleOk={async () => await deleteStudy(study._id)}
          message={"Are you sure you want to delete this study?"}
        ></ConfirmationDialog>
      )}
    </>
  );
}
