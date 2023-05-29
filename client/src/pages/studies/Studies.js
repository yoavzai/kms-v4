import { useState } from "react";
import { StudiesBrowser, NewStudyWizard } from "./components";
import { Button, Dialog, DialogContent } from "@mui/material";

export default function () {
  const [isNewStudy, setIsNewStudy] = useState(false);

  function handleNewStudyBtnClick() {
    setIsNewStudy(true);
  }

  function handleCancelNewStudy() {
    setIsNewStudy(false);
  }

  return (
    <>
      <div>
        <h2>Studies</h2>
        <StudiesBrowser />
        <Button onClick={handleNewStudyBtnClick}>New Study</Button>
      </div>
      {isNewStudy && (
        <div>
          <Dialog open>
            <DialogContent>
              <NewStudyWizard cancelNewStudy={handleCancelNewStudy} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
