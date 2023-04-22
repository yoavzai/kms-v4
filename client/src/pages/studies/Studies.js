import { useState } from 'react';
import {
  StudiesBrowser,
  NewStudyWizard,
} from './components';
import { Button } from '@mui/material';
import { CREATE_STUDY } from '../../mutations/studies';
import { useMutation } from '@apollo/client';

export default function() {
  const [createStudy, {newStudy, loading, error}] = useMutation(CREATE_STUDY)
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
          <Button onClick={() => createStudy({ variables:
          {
            "record": {"creator_id": "5cd99685-c55e-470a-b267-6ca24fe6f5c9",
            "study_details":       [
                  {
                    "type": "number",
                    "key": "d",
                    "mandatory": true,
                    "dropdown_options": [],
                    "value": "4.5",
                    "min_num": "3",
                    "max_num": "5",
                  }
                ] }
          } })}>Create</Button>
        </div>
      }
    </>
  );
}
