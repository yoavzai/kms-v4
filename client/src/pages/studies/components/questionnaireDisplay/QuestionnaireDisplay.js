import { useParams } from "react-router-dom";
import { STUDY_BASIC_DETAILS_BY_ID } from "../../../../queries/studies";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { cleanPayload } from "../../../../utils";
import { QUESTIONNAIRE_BY_ID } from "../../../../queries/questionnaires";
import QuestionnaireInputsList from "./QuestionnaireInputsList";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function () {
  const { studyId, questionnaireId } = useParams();
  const questionnaire = useSelector((state) => state.questionnaire);
  const dispatch = useDispatch();
  const [study, setStudy] = useState({});

  useQuery(STUDY_BASIC_DETAILS_BY_ID, {
    variables: { id: studyId },
    onCompleted: ({ studyById }) => setStudy(cleanPayload(studyById)),
  });

  useQuery(QUESTIONNAIRE_BY_ID, {
    variables: { id: questionnaireId },
    onCompleted: ({ questionnaireById }) => dispatch({ type: "questionnaire", payload: cleanPayload(questionnaireById) }),
  });

  return (
    <>
      {Object.keys(study).length > 0 &&
        Object.keys(questionnaire).length > 0 && (
          <div>
            <Typography variant="h4" gutterBottom>Individual Details</Typography>
            {questionnaire.individual_details.map((field) => {
              return (
                <div key={field.key}>
                  <span>
                    {field.key} - {field.value}
                  </span>
                </div>
              );
            })}
            <Typography variant="h4" gutterBottom>Questionnaire Details</Typography>
            {questionnaire.questionnaire_details.map((field) => {
              return (
                <div key={field.key}>
                  <span>
                    {field.key} - {field.value}
                  </span>
                </div>
              );
            })}
            <Divider />
            <QuestionnaireInputsList
              inputs={questionnaire.inputs}
              questionnaireId={questionnaire._id}
            />
          </div>
        )}
    </>
  );
}
