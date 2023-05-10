import { useQuery } from "@apollo/client";
import { QUESTIONNAIRES_BY_STUDY_ID } from "../../../queries/questionnaires";
import { cleanPayload } from "../../../utils";
import { useState } from "react";
import QuestionnaireBasicDisplay from "./QuestionnaireBasicDisplay";


export default function({studyId}) {
	useQuery(QUESTIONNAIRES_BY_STUDY_ID, {variables:{study_id: studyId}, onCompleted: handleSetQuestionnaires});
	const [questionnaires, setQuestionnaires] = useState([])


    function handleSetQuestionnaires(data) {
		const payload = cleanPayload(data.questionnaireMany)
		setQuestionnaires(payload)
	}


    return (
        <div>
        {questionnaires.map(q => <QuestionnaireBasicDisplay key={q._id} questionnaire={q}></QuestionnaireBasicDisplay>)}
        </div>
    )

}