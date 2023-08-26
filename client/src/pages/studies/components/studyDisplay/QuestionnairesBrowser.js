import { useMutation, useQuery } from "@apollo/client";
import { QUESTIONNAIRES_BY_STUDY_ID } from "../../../../queries/questionnaires";
import { cleanPayload } from "../../../../utils";
import { useState } from "react";
import {
  DELETE_QUESTIONNAIRE_BY_ID,
  UPDATE_QUESTIONNAIRE_BY_ID,
} from "../../../../mutations/questionnaires";
import { List } from "@mui/material";
import QuestionnaireListItem from "./QuestionnaireListItem";

export default function ({ studyId }) {
  useQuery(QUESTIONNAIRES_BY_STUDY_ID, {
    variables: { study_id: studyId },
    onCompleted: handleSetQuestionnaires,
  });
  const [questionnaires, setQuestionnaires] = useState([]);
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID);
  const [deleteQuestionnaire] = useMutation(DELETE_QUESTIONNAIRE_BY_ID);

  function handleSetQuestionnaires(data) {
    const payload = cleanPayload(data.questionnaireMany);
    setQuestionnaires(payload);
  }

  async function handleUpdateQuestionnaire(
    questionnaireId,
    newQuestionnaireData
  ) {
    await updateQuestionnaire({
      variables: { id: questionnaireId, record: newQuestionnaireData },
    });
    const newQuestionnaires = questionnaires.map((questionnaire) => {
      if (questionnaire._id === questionnaireId) {
        return { ...questionnaire, ...newQuestionnaireData };
      }
      return questionnaire;
    });
    setQuestionnaires(newQuestionnaires);
  }

  async function handleDeleteQuestionnaire(questionnaireId) {
    await deleteQuestionnaire({
      variables: { id: questionnaireId, record: {} },
    });
    setQuestionnaires(questionnaires.filter((q) => q._id !== questionnaireId));
  }

  return (
    <div>
      <List>
        {questionnaires.map((q) => (
          <QuestionnaireListItem
            key={q._id}
            studyId={studyId}
            questionnaire={q}
            updateQuestionnaire={handleUpdateQuestionnaire}
            deleteQuestionnaire={handleDeleteQuestionnaire}
          ></QuestionnaireListItem>
        ))}
      </List>
    </div>
  );
}
