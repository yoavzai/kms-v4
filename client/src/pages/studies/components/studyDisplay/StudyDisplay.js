import { STUDY_BY_ID } from "../../../../queries/studies";
import { useState } from "react";
import { cleanPayload } from "../../../../utils";
import { useParams } from "react-router-dom";
import { Button, Dialog, DialogContent } from "@mui/material";
import QuestionnairesBrowser from "./QuestionnairesBrowser";
import NewQuestionnaireWizard from "./NewQuestionnaireWizard";
import { useQuery } from "@apollo/client";

export default function () {
  const { studyId } = useParams();
  const [isNewQuestionnare, setIsNewQuestionnaire] = useState(false);
  const [study, setStudy] = useState({});
  useQuery(STUDY_BY_ID, {
    variables: { id: studyId },
    onCompleted: ({ studyById }) => setStudy(cleanPayload(studyById)),
  });

  return (
    <>
      {Object.keys(study).length > 0 && (
        <>
          <div>
            <h2>Study Details</h2>
            {study.study_details.map((field) => {
              return (
                <div key={field.key}>
                  <span>
                    {field.key} - {field.value}
                  </span>
                </div>
              );
            })}
            <h2>Questionnaires</h2>
            <QuestionnairesBrowser studyId={studyId}></QuestionnairesBrowser>
            <Button onClick={() => setIsNewQuestionnaire(true)}>
              New Questionnaire
            </Button>
          </div>
          {isNewQuestionnare && (
            <div>
              <Dialog open>
                <DialogContent>
                  <NewQuestionnaireWizard
                    cancelNewQuestionnaire={() => setIsNewQuestionnaire(false)}
                    study={study}
                  ></NewQuestionnaireWizard>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </>
      )}
    </>
  );
}
