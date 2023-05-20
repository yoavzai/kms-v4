import { useQuery } from "@apollo/client";
import { STUDIES_BY_CREATOR_ID } from "../../../queries/studies";
import { cleanPayload } from "../../../utils";
import { useState } from "react";
import StudyBasicDisplay from "./StudyBasicDisplay";


export default function() {
	const userId = window.sessionStorage.getItem("userId")
	const [studies, setStudies] = useState([])
	useQuery(STUDIES_BY_CREATOR_ID, {variables:{creator_id: userId}, onCompleted: handleSetStudies});

	function handleSetStudies(data) {
		const payload = cleanPayload(data.studyMany)
		setStudies(payload)
	}

	return (
		<div>
			<h2>Studies</h2>
			{studies.map(study => <StudyBasicDisplay key={study._id} study={study}></StudyBasicDisplay>)}
			<span>-----------------------------------------</span>
		</div>
	)
};
