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

const steps = ['Individual details', 'Questionnaire details', 'Summary'];

export default function({questionnaire, cancelEditQuestionnaire, finishEditQuestionnaire}) {

  const [activeStep, setActiveStep] = useState(0);
  const [individualDetails, setIndividualDetails] = useState(questionnaire.individual_details);
  const [questionnaireDetails, setQuestionnaireDetails] = useState(questionnaire.questionnaire_details.filter(field => field.key != "language"));


  const handleFinish = async () => {
    const newQuestionnaireData = {
      individual_details: individualDetails,
      questionnaire_details: questionnaireDetails,
    }

    finishEditQuestionnaire(newQuestionnaireData)
  };
  
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    cancelEditQuestionnaire()
  }

  const handleValueChange = (newValue, key) => {
    newValue = newValue.toString()
    switch(activeStep) {
      case 0:
        {
          const newIndividualDetails = individualDetails.map(field => {
            if (field.key === key) {
              return {...field, value: newValue}
            }
            return field
          })
          setIndividualDetails(newIndividualDetails)
          break;
        }
      case 1:
        {
          const newQuestionnaireDetails = questionnaireDetails.map(field => {
            if (field.key === key) {
              return {...field, value: newValue}
            }
            return field
          })
          setQuestionnaireDetails(newQuestionnaireDetails)
          break;
        }
      }
  };


  function Summary() {
    return (
      <div>
        <h3>Individual Details</h3>
        {individualDetails.map(field => {
						return(
							<div key={field.key}>
								<span>{field.key} - {field.value}</span>
							</div>
						)
					})}
        <h3>Questionnaire Details</h3>
        {questionnaireDetails.map(field => {
						return(
							<div key={field.key}>
								<span>{field.key} - {field.value}</span>
							</div>
						)
					})}
      </div>
    )
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
            {activeStep === 2 ? <Summary/>:
            <FormRenderer
              isCheckbox={false}
              fields={activeStep === 0 ? individualDetails : questionnaireDetails}
              handleValueChange={handleValueChange}
            />
            }
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
