
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function(props) {
    const questionnaire = props.questionnaire
    const navigate = useNavigate()
	const [displayQuestionaireDetails, setDisplayQuestionnaireDetails] = useState(false)


	function handleMouseEnter() {
		setDisplayQuestionnaireDetails(true)
	}
	function handleMouseLeave() {
		setDisplayQuestionnaireDetails(false)
	}
    async function handleClick() {
        // navigate("/studies/" + study._id)
    }

	return (
		<div>
            <Button id={questionnaire._id} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{questionnaire.date_updated}</Button>
            {displayQuestionaireDetails && questionnaire.questionnaire_details.map((field, index) => {
                return (
                    <div key={index}>
                        <span>{field.key} - {field.value}</span>
                    </div>
                )
            })}
		</div>
	)
};
