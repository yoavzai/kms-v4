import { useReducer } from "react";
import { StudiesBrowser, NewStudyWizard } from "./components";
import { Button } from "@mui/material";

export default function () {
  const [open, flip] = useReducer(s => !s, false);

  return (
    <>
      <h2>Studies</h2>
      <StudiesBrowser />
      <Button onClick={flip}>New Study</Button>
      {open && (
        <NewStudyWizard isOpen={true} cancelNewStudy={flip} />
      )}
    </>
  );
}