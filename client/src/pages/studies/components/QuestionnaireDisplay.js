import { useNavigate, useParams } from "react-router-dom";
import { STUDY_BASIC_DETAILS_BY_ID } from "../../../queries/studies";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { cleanPayload } from "../../../utils";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { Button } from "@mui/material";
import { QUESTIONNAIRE_BY_ID } from "../../../queries/questionnaires";
import { DELETE_QUESTIONNAIRE_BY_ID, UPDATE_QUESTIONNAIRE_BY_ID } from "../../../mutations/questionnaires";
import EditQuestionnaireWizard from "./EditQuestionnaireWizard";
import Inputs from "./Inputs";


export default function() {

  const navigate = useNavigate()
  const {studyId, questionnaireId} = useParams()
	const [isDeleteQuestionnaireConfirmation, setIsDeleteQuestionnaireConfirmation] = useState(false)
	const [isEditQuestionnaire, setIsEditQuestionnaire] = useState(false)
	const [questionnaire, setQuestionnaire] = useState({})
	const [study, setStudy] = useState({})
	useQuery(STUDY_BASIC_DETAILS_BY_ID, {variables:{id: studyId}, onCompleted: handleSetStudy});
	useQuery(QUESTIONNAIRE_BY_ID, {variables:{id: questionnaireId}, onCompleted: handleSetQuestionnaire});
	const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID)
	const [deleteQuestionnaire] = useMutation(DELETE_QUESTIONNAIRE_BY_ID, {variables: {id: questionnaireId, record: {}}})

	function handleSetStudy(data) {
		const payload = cleanPayload(data.studyById)
		setStudy(payload)
	}

  function handleSetQuestionnaire(data) {
		const payload = cleanPayload(data.questionnaireById)
		setQuestionnaire(payload)
	}

	function handleCancelDeleteQuestionnaire() {
		setIsDeleteQuestionnaireConfirmation(false)
	}

	async function handleOkDeleteQuestionnaire() {
		await deleteQuestionnaire()
		navigate("/studies/" + studyId)
	}

	function handleCancelEditQuestionnaire() {
		setIsEditQuestionnaire(false)
	}

	async function handleFinishEditQuestionnaire(newQuestionnaireData) {
		await updateQuestionnaire({variables: {id: questionnaireId, record: newQuestionnaireData}})
		setQuestionnaire({...questionnaire, ...newQuestionnaireData})
		setIsEditQuestionnaire(false)
	}


	return (
		<>
			{Object.keys(study).length > 0 && Object.keys(questionnaire).length > 0 &&
			<>
				{isEditQuestionnaire ? <EditQuestionnaireWizard questionnaire={questionnaire} cancelEditQuestionnaire={handleCancelEditQuestionnaire} finishEditQuestionnaire={handleFinishEditQuestionnaire}></EditQuestionnaireWizard> :
				<div>
					<h3>Individual Details</h3>
					{questionnaire.individual_details.map(field => {
						return(
							<div key={field.key}>
								<span>{field.key} - {field.value}</span>
							</div>
						)
					})}
					<h3>Questionnaire Details</h3>
					{questionnaire.questionnaire_details.map(field => {
						return(
							<div key={field.key}>
								<span>{field.key} - {field.value}</span>
							</div>
						)
					})}
					<Button onClick={() => setIsDeleteQuestionnaireConfirmation(true)}>Delete Questionnaire</Button>
					<Button onClick={() => setIsEditQuestionnaire(true)}>Edit Questionnaire</Button>
					<h3>Inputs</h3>
          <Inputs inputs={questionnaire.inputs}></Inputs>
				</div>
				}
				{isDeleteQuestionnaireConfirmation && <ConfirmationDialog handleCancel={handleCancelDeleteQuestionnaire} handleOk={handleOkDeleteQuestionnaire} message={"Are you sure you want to delete this questionnaire?"}></ConfirmationDialog>}
			</>
			}
		</>
	)
};
  