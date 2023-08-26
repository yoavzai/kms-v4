import { useMutation, useQuery } from "@apollo/client";
import { STUDIES_BY_CREATOR_ID } from "../../../../queries/studies";
import { cleanPayload } from "../../../../utils";
import { useState } from "react";
import {
  DELETE_STUDY_BY_ID,
  UPDATE_STUDY_BY_ID,
} from "../../../../mutations/studies";
import { List } from "@mui/material";
import StudyListItem from "./StudyListItem";

export default function () {
  const [studies, setStudies] = useState([]);

  const userId = window.sessionStorage.getItem("userId");

  useQuery(STUDIES_BY_CREATOR_ID, {
    variables: { creator_id: userId },
    onCompleted: ({ studyMany }) => setStudies(cleanPayload(studyMany)),
  });
  const [updateStudy] = useMutation(UPDATE_STUDY_BY_ID);
  const [deleteStudy] = useMutation(DELETE_STUDY_BY_ID);

  async function handleUpdateStudy(studyId, studyNewData) {
    await updateStudy({ variables: { id: studyId, record: studyNewData } });
    const newStudies = studies.map((study) => {
      if (study._id === studyId) {
        return { ...study, ...studyNewData };
      }
      return study;
    });
    setStudies(newStudies);
  }

  async function handleDeleteStudy(studyId) {
    await deleteStudy({ variables: { id: studyId, record: {} } });
    setStudies(studies.filter((study) => study._id !== studyId));
  }

  return (
    <div>
      <List>
        {studies.map((study) => (
          <StudyListItem
            key={study._id}
            study={study}
            updateStudy={handleUpdateStudy}
            deleteStudy={handleDeleteStudy}
          ></StudyListItem>
        ))}
      </List>
    </div>
  );
}
