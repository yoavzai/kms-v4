import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InteractiveList from './InteractiveList';
import { TextInput } from '../../../components/form-components';

const steps = ['Base template', 'Inputs', 'Template name'];

export default function({templates, createNewTemplate, cancelNewTemplate}) {
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState([])
  const [name, setName] = useState("")

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setInputs([])
    }
    else if (activeStep === 2)
    {
      setName("")
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    cancelNewTemplate()
  }

  function handleCreate() {
    createNewTemplate(name, inputs)
  }

  function handleBaseTemplateChosen(inputs) {
    setInputs(inputs)
    handleNext()
  }

  function handleSetInputs(inputs) {
    setInputs(inputs)
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
          {activeStep === 0 &&
          <div>
            <h3>Choose a base template</h3>
            {templates.map(t => <Button key={t._id} onClick={() => handleBaseTemplateChosen(t.inputs)}>{t.name}</Button>)}
            <Button onClick={() => handleBaseTemplateChosen([])}>Empty</Button>
          </div>
          }
          {activeStep === 1 &&
          <InteractiveList inputs={inputs} setInputs={handleSetInputs}></InteractiveList>
          }
          {activeStep === 2 &&
          <TextInput value={name} label={"Template Name"} onChange={(e) => setName(e.target.value)}></TextInput>
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
          {activeStep === 1 &&
            <Button onClick={handleNext}>
              Next
            </Button>
          }
          {activeStep === 2 &&          
            <Button onClick={handleCreate}>
              Create
            </Button>
          }
        </Box>
      </Fragment>
    </Box>
  );
}
