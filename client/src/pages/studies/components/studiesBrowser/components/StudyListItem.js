import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditStudyWizard from "./components";
import { ConfirmationDialog } from "../../../../../components";
import { Delete, Edit } from "@mui/icons-material";

export default function ({ study, updateStudy, deleteStudy }) {
  const navigate = useNavigate();
  const [isDeleteStudyConfirmation, setIsDeleteStudyConfirmation] =
    useState(false);
  const [isEditStudy, setIsEditStudy] = useState(false);

  async function handleClick() {
    navigate("/studies/" + study._id);
  }

  function handleCancelDeleteStudy() {
    setIsDeleteStudyConfirmation(false);
  }

  async function handleOkDeleteStudy() {
    await deleteStudy(study._id);
  }

  function handleCancelEditStudy() {
    setIsEditStudy(false);
  }

  async function handleFinishEditStudy(newStudyData) {
    await updateStudy(study._id, newStudyData);
    setIsEditStudy(false);
    navigate("/studies/" + study._id);
  }

  return (
    <>
      <ListItemButton>
        <ListItemText
          onClick={handleClick}
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
              cancelEditStudy={handleCancelEditStudy}
              finishEditStudy={handleFinishEditStudy}
              study={study}
            ></EditStudyWizard>
          </DialogContent>
        </Dialog>
      )}
      {isDeleteStudyConfirmation && (
        <ConfirmationDialog
          handleCancel={handleCancelDeleteStudy}
          handleOk={handleOkDeleteStudy}
          message={"Are you sure you want to delete this study?"}
        ></ConfirmationDialog>
      )}
    </>
  );
}
