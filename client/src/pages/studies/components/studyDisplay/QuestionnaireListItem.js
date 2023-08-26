import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditQuestionnaireWizard from "./EditQuestionnaireWizard";
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmationDialog } from "../../../../components";

export default function ({
  studyId,
  questionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
}) {
  const navigate = useNavigate();
  const [
    isDeleteQuestionnaireConfirmation,
    setIsDeleteQuestionnaireConfirmation,
  ] = useState(false);
  const [isEditQuestionnaire, setIsEditQuestionnaire] = useState(false);

  async function handleFinishEditQuestionnaire(newQuestionnaireData) {
    await updateQuestionnaire(questionnaire._id, newQuestionnaireData);
    setIsEditQuestionnaire(false);
    navigate("/studies/" + studyId + "/questionnaires/" + questionnaire._id);
  }

  function getUpdatedDate() {
    const date = new Date(questionnaire.date_updated);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return "" + day + "/" + month + "/" + year;
  }

  return (
    <>
      <ListItemButton>
        <ListItemText
          onClick={async () => navigate("/studies/" + studyId + "/questionnaires/" + questionnaire._id)}
          primary={getUpdatedDate()}
        />
        <IconButton onClick={() => setIsDeleteQuestionnaireConfirmation(true)}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => setIsEditQuestionnaire(true)}>
          <Edit />
        </IconButton>
      </ListItemButton>
      {isEditQuestionnaire && (
        <Dialog open>
          <DialogContent>
            <EditQuestionnaireWizard
              questionnaire={questionnaire}
              cancelEditQuestionnaire={() => setIsEditQuestionnaire(false)}
              finishEditQuestionnaire={handleFinishEditQuestionnaire}
            ></EditQuestionnaireWizard>
          </DialogContent>
        </Dialog>
      )}
      {isDeleteQuestionnaireConfirmation && (
        <ConfirmationDialog
          handleCancel={() => setIsDeleteQuestionnaireConfirmation(false)}
          handleOk={async () => await deleteQuestionnaire(questionnaire._id)}
          message={"Are you sure you want to delete this questionnaire?"}
        ></ConfirmationDialog>
      )}
    </>
  );
}
