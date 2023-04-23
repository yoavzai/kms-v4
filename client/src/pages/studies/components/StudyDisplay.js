import { useLocation } from "react-router-dom"

export default function() {

	const location = useLocation()

	return (
		<div>
			<h3>StudyDisplay component</h3>
			<h4>creator ID: {location.state.studyData.creator_id}</h4>
			<h4>study details</h4>
			{location.state.studyData.study_details.map(field => {
				return(
					<div key={field.key}>
						<span>{field.key} - {field.value}</span>
					</div>
				)
			})}
			<h4>individual details</h4>
			{location.state.studyData.individual_details.map(field => {
				return(
					<div key={field.key}>
						<span>{field.key} - {field.value}</span>
					</div>
				)
			})}
			<h4>questionnaire details</h4>
			{location.state.studyData.questionnaire_details.map(field => {
				return(
					<div key={field.key}>
						<span>{field.key} - {field.value}</span>
					</div>
				)
			})}
		</div>
	)
};
