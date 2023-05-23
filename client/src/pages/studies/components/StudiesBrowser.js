import { useQuery } from "@apollo/client";
import { STUDIES_BY_CREATOR_ID } from "../../../queries/studies";
import { cleanPayload } from "../../../utils";
import { useState } from "react";
import StudyBasicDisplay from "./StudyBasicDisplay";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";


export default function() {
	const userId = window.sessionStorage.getItem("userId")
	const [studies, setStudies] = useState([])
	const navigate = useNavigate()
    
	useQuery(STUDIES_BY_CREATOR_ID, {variables:{creator_id: userId}, onCompleted: handleSetStudies});

	function handleSetStudies(data) {
		const payload = cleanPayload(data.studyMany)
		setStudies(payload)
	}

	return (
		<div>
			<h2>Studies</h2>
			<List>
				{studies.map(study => (
					<ListItem disablePadding onClick={() => navigate("/studies/" + study._id)}>
					<ListItemButton >
					<ListItemText primary={study.study_details.find(s => s.key === "name")?.value} />
					</ListItemButton>
					</ListItem>
					))}
			</List>
		</div>
	)
};
