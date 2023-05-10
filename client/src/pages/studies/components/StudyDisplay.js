
import { STUDY_BY_ID } from "../../../queries/studies";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { cleanPayload } from "../../../utils";
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationDialog from "../../../components/confirmationDialog";
import { Button } from "@mui/material";
import { DELETE_STUDY_BY_ID, UPDATE_STUDY_BY_ID } from "../../../mutations/studies";
import EditStudyWizard from "./EditStudyWizard";
import QuestionnairesBrowser from "./QuestionnairesBrowser";


export default function() {

	const navigate = useNavigate()
	const [isDeleteStudyConfirmation, setIsDeleteStudyConfirmation] = useState(false)
	const [isEditStudy, setIsEditStudy] = useState(false)
	const { studyId } = useParams()
	const [study, setStudy] = useState({})
	useQuery(STUDY_BY_ID, {variables:{id: studyId}, onCompleted: handleSetStudies});
	const [updateStudy] = useMutation(UPDATE_STUDY_BY_ID)
	const [deleteStudy] = useMutation(DELETE_STUDY_BY_ID, {variables: {id: studyId, record: {}}})

	function handleSetStudies(data) {
		const payload = cleanPayload(data.studyById)
		setStudy(payload)
	}

	function handleCancelDeleteStudy() {
		setIsDeleteStudyConfirmation(false)
	}

	async function handleOkDeleteStudy() {
		await deleteStudy()
		navigate("/studies")
	}

	function handleCancelEditStudy() {
		setIsEditStudy(false)
	}

	async function handleFinishEditStudy(newStudyData) {
		await updateStudy({variables: {id: studyId, record: newStudyData}})
		setStudy({...study, ...newStudyData})
		setIsEditStudy(false)
	}

	return (
		<>
			{Object.keys(study).length > 0 &&
			<>
				{isEditStudy ? <EditStudyWizard cancelEditStudy={handleCancelEditStudy} finishEditStudy={handleFinishEditStudy} study={study}></EditStudyWizard> :
				<div>
					<h3>Study Details</h3>
					{study.study_details.map(field => {
						return(
							<div key={field.key}>
								<span>{field.key} - {field.value}</span>
							</div>
						)
					})}
					<Button onClick={() => setIsDeleteStudyConfirmation(true)}>Delete Study</Button>
					<Button onClick={() => setIsEditStudy(true)}>Edit Study</Button>
					<h3>Questionnaires</h3>
					<QuestionnairesBrowser studyId={studyId}></QuestionnairesBrowser>
				</div>
				}
				{isDeleteStudyConfirmation && <ConfirmationDialog handleCancel={handleCancelDeleteStudy} handleOk={handleOkDeleteStudy}></ConfirmationDialog>}
			</>
			}
		</>
	)
};
