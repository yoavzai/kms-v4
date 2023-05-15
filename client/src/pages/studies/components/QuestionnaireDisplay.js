import { useParams } from "react-router-dom";

  export default function() {

    const {studyId, questionnaireId} = useParams()
    return (
      <>
        <h1>Questionnaire Display</h1>
      </>
    );
  }
  