import { useState } from 'react';
import {
  StudiesBrowser,
  NewStudyWizard,
} from './components';
import { Button } from '@mui/material';

export default function() {

  const [isNewStudy, setIsNewStudy] = useState(false)

  function handleNewStudyBtnClick() {
    setIsNewStudy(true)
  }

  function handleCancelNewStudy() {
    setIsNewStudy(false)
  }

  return (
    <>
      <h1>Studies page</h1>
      {isNewStudy ?
        <NewStudyWizard cancelNewStudy={handleCancelNewStudy}/>
        :
        <div>
          <StudiesBrowser />
          <Button onClick={handleNewStudyBtnClick}>New Study</Button>
        </div>
      }
    </>
  );
}
