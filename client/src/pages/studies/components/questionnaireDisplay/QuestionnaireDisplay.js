import { useParams } from "react-router-dom";
import { STUDY_BASIC_DETAILS_BY_ID } from "../../../../queries/studies";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { cleanPayload } from "../../../../utils";
import { QUESTIONNAIRE_BY_ID } from "../../../../queries/questionnaires";
import Inputs from "./components";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const { studyId, questionnaireId } = useParams();
  const questionnaire = useSelector((state) => state.questionnaire);
  const dispatch = useDispatch();
  const [study, setStudy] = useState({});
  useQuery(STUDY_BASIC_DETAILS_BY_ID, {
    variables: { id: studyId },
    onCompleted: handleSetStudy,
  });
  useQuery(QUESTIONNAIRE_BY_ID, {
    variables: { id: questionnaireId },
    onCompleted: handleSetQuestionnaire,
  });

  function handleSetStudy(data) {
    const payload = cleanPayload(data.studyById);
    setStudy(payload);
  }

  function handleSetQuestionnaire(data) {
    const payload = cleanPayload(data.questionnaireById);
    dispatch({ type: "questionnaire", payload: payload });
  }

  return (
    <>
      {Object.keys(study).length > 0 &&
        Object.keys(questionnaire).length > 0 && (
          <div>
            <h3>Individual Details</h3>
            {questionnaire.individual_details.map((field) => {
              return (
                <div key={field.key}>
                  <span>
                    {field.key} - {field.value}
                  </span>
                </div>
              );
            })}
            <h3>Questionnaire Details</h3>
            {questionnaire.questionnaire_details.map((field) => {
              return (
                <div key={field.key}>
                  <span>
                    {field.key} - {field.value}
                  </span>
                </div>
              );
            })}
            <h3>Inputs</h3>
            <Inputs
              inputs={questionnaire.inputs}
              questionnaireId={questionnaire._id}
            ></Inputs>
          </div>
        )}
    </>
  );
}
