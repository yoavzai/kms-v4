
import { useState } from "react";
import { Button } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { STUDY_BY_ID } from "../../../queries/studies";
import { useNavigate } from "react-router-dom";


export default function(props) {
    const study = props.study
    const navigate = useNavigate()
	const [displayStudyDetails, setDisplayStudyDetails] = useState(false)
    const [StudyById, { loading, error, data }] = useLazyQuery(STUDY_BY_ID, {variables: {id: study._id}})


	function handleMouseEnter() {
		setDisplayStudyDetails(true)
	}
	function handleMouseLeave() {
		setDisplayStudyDetails(false)
	}
    async function handleClick() {
        const res = await StudyById()
        navigate("/studies/" + study._id, {state: {studyData: res.data.studyById}})
    }

	return (
		<div>
            <Button id={study._id} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{study.study_details.find(s => s.key === "name")?.value}</Button>
            {displayStudyDetails && study.study_details.map((field, index) => {
                return (
                    <div key={index}>
                        <span>{field.key} - {field.value}</span>
                    </div>
                )
            })}
		</div>
	)
};
