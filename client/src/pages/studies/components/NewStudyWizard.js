import { useState, Fragment } from 'react';
import {
  FormRenderer,
} from '../../../components';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GET_INDIVIDUAL_DETAILS_FIELDS, GET_QUESTIONNAIRE_DETAILS_FIELDS, GET_STUDY_DETAILS_FIELDS } from '../../../queries/fields';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import NewFieldForm from './NewFieldForm'
import { CREATE_STUDY } from '../../../mutations/studies';
import { cleanPayload } from '../../../utils';


const steps = ['Study details', 'Individual details', 'Questionnaire details'];

export default function({cancelNewStudy}) {
  const userId = window.sessionStorage.getItem("userId")
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [studyDetails, setStudyDetails] = useState([]);
  const [individualDetails, setIndividualDetails] = useState([]);
  const [questionnaireDetails, setQuestionnaireDetails] = useState([]);
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);
  useQuery(GET_STUDY_DETAILS_FIELDS, {onCompleted: handleSetStudyDetails});
  useQuery(GET_INDIVIDUAL_DETAILS_FIELDS, {onCompleted: handleSetIndividualDetails});
  useQuery(GET_QUESTIONNAIRE_DETAILS_FIELDS, {onCompleted: handleSetQuestionnaireDetails});
  const [createStudy] = useMutation(CREATE_STUDY)


  function handleSetStudyDetails(data) {
    const payload = cleanPayload(data.fieldsOne.fields)
    const arr = payload.map(field => {
      return (
        {
          checked: field.mandatory ? true : false,
          data: field
        }
      )
    })
    setStudyDetails(arr)
  }

  function handleSetIndividualDetails(data) {
    const payload = cleanPayload(data.fieldsOne.fields)
    const arr = payload.map(field => {
      return (
        {
          checked: field.mandatory ? true : false,
          data: field
        }
      )
    })
    setIndividualDetails(arr)
  }

  function handleSetQuestionnaireDetails(data) {
    const payload = cleanPayload(data.fieldsOne.fields)
    const arr = payload.map(field => {
      return (
        {
          checked: field.mandatory ? true : false,
          data: field
        }
      )
    })
    setQuestionnaireDetails(arr)
  }
  
  const handleFinish = async () => {
    
    const getCheckedFields = (fields) => {
      const checkedFields = []
      for (const field of fields) {
        if (field.checked) {
          checkedFields.push(field.data)
        }
      }
      return checkedFields
    }

    const newStudyData = {
      creator_id: userId,
      study_details: getCheckedFields(studyDetails),
      individual_details: getCheckedFields(individualDetails),
      questionnaire_details: getCheckedFields(questionnaireDetails),
      custom_templates: []
    }

    const res = await createStudy({variables: {record: newStudyData}})
    navigate("/studies/" + res.data.studyCreateOne.recordId)
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    cancelNewStudy()
  }

  const handleCheckboxChange = (isChecked, key) => {
    switch(activeStep) {
      case 0:
        {
          const newStudyDetails = studyDetails.map(field => {
            if (field.data.key === key && !field.data.mandatory) {
              return {checked: isChecked, data: field.data}
            }
            return field
          })
          setStudyDetails(newStudyDetails)
          break;
        }
      case 1:
        {
          const newIndividualDetails = individualDetails.map(field => {
            if (field.data.key === key && !field.data.mandatory) {
              return {checked: isChecked, data: field.data}
            }
            return field
          })
          setIndividualDetails(newIndividualDetails)
          break;
        }
      case 2:
        {
          const newQuestionnaireDetails = questionnaireDetails.map(field => {
            if (field.data.key === key && !field.data.mandatory) {
              return {checked: isChecked, data: field.data}
            }
            return field
          })
          setQuestionnaireDetails(newQuestionnaireDetails)
          break;
        }
      }
 };

  const handleValueChange = (newValue, key) => {
    newValue = newValue.toString()
    switch(activeStep) {
      case 0:
        {
          const newStudyDetails = studyDetails.map(field => {
            if (field.data.key === key) {
              return {...field, data: {...field.data, value: newValue}}
            }
            return field
          })
          setStudyDetails(newStudyDetails)
          break;
        }
      case 1:
        {
          const newIndividualDetails = individualDetails.map(field => {
            if (field.data.key === key) {
              return {...field, data: {...field.data, value: newValue}}
            }
            return field
          })
          setIndividualDetails(newIndividualDetails)
          break;
        }
      case 2:
        {
          const newQuestionnaireDetails = questionnaireDetails.map(field => {
            if (field.data.key === key) {
              return {...field, data: {...field.data, value: newValue}}
            }
            return field
          })
          setQuestionnaireDetails(newQuestionnaireDetails)
          break;
        }
      }
  };

  function cancelNewField() {
    setShowNewFieldForm(false)
  }

  function createNewField(field) {
    switch (activeStep) {
      case 0:
        {
          setStudyDetails([...studyDetails, {checked: true, data: field}])
          break;
        }
      case 1:
        {
          setIndividualDetails([...individualDetails, {checked: true, data: field}])
          break;
        }
      case 2:
        {
          setQuestionnaireDetails([...questionnaireDetails, {checked: true, data: field}])
          break;
        }
    }
    setShowNewFieldForm(false)
  }

  function handleNewFieldFormClick() {
    setShowNewFieldForm(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <Fragment>
          <Typography component={"div"} sx={{ mt: 2, mb: 1 }}>
            <FormRenderer
              isCheckbox={true}
              fields={activeStep === 0 ? studyDetails : activeStep === 1 ? individualDetails : questionnaireDetails}
              handleValueChange={handleValueChange}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            {showNewFieldForm ? 
            <NewFieldForm create={createNewField} cancel={cancelNewField}/>
            : 
            <Button onClick={handleNewFieldFormClick}>Add Field</Button>
            }
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep < steps.length - 1 ?
              <Button onClick={handleNext}>
                Next
              </Button>
            :
              <Button onClick={handleFinish}>
                Finish
              </Button>
            }
            
          </Box>
        </Fragment>
      
    </Box>
  );
}
