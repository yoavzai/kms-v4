import React, { useState, Fragment, useReducer } from "react";
import { FormRenderer, NewFieldForm } from "../../../../components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  GET_INDIVIDUAL_DETAILS_FIELDS,
  GET_QUESTIONNAIRE_DETAILS_FIELDS,
  GET_STUDY_DETAILS_FIELDS,
} from "../../../../queries/fields";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_STUDY } from "../../../../mutations/studies";
import { cleanPayload } from "../../../../utils";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import Add from '@mui/icons-material/Add';
import Alert from './Alert';
import Summary from './summary';

const steps = [
  "Study details",
  "Individual details",
  "Questionnaire details",
  "Summary",
];

export default function NewStudyWizard({ isOpen, cancelNewStudy }) {
  // const [state, setState] = useReducer(reducer, { 
  const [state, setState] = useState({ 
    ["Study details"]: [],
    ["Individual details"]: [],
    ["Questionnaire details"]: [],
  });
  const userId = window.sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [studyDetails, setStudyDetails] = useState([]);
  const [individualDetails, setIndividualDetails] = useState([]);
  const [questionnaireDetails, setQuestionnaireDetails] = useState([]);
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  const [createStudy] = useMutation(CREATE_STUDY);
  //useQuery(GET_STUDY_DETAILS_FIELDS, { onCompleted: setState("Study details") });
  useQuery(GET_STUDY_DETAILS_FIELDS, { onCompleted: handleSetStudyDetails });
  useQuery(GET_INDIVIDUAL_DETAILS_FIELDS, { onCompleted: handleSetIndividualDetails });
  useQuery(GET_QUESTIONNAIRE_DETAILS_FIELDS, { onCompleted: handleSetQuestionnaireDetails });

  const [alertState, setAlertState] = useState({ message: '', severity: '', open: false })

  function getName() {
    const field = studyDetails.find((f) => f.data.key === "name");
    return field.data.value;
  }

  function handleSetStudyDetails(data) {
    setStudyDetails(cleanPayload(data.fieldsOne.fields).map(field => ({
      checked: !!field.mandatory,
      data: field,
    })));
  }

  function handleSetIndividualDetails(data) {
    setIndividualDetails(cleanPayload(data.fieldsOne.fields).map((field) => ({
        checked: !!field.mandatory,
        data: field,
    })));
  }

  function handleSetQuestionnaireDetails(data) {
    setQuestionnaireDetails(cleanPayload(data.fieldsOne.fields).map((field) => ({
      checked: !!field.mandatory,
      data: field,
    })));
  }

  const handleFinish = async () => {
    const getCheckedFields = (fields) => {
      const checkedFields = [];
      for (const field of fields) {
        if (field.checked) {
          checkedFields.push(field.data);
        }
      }
      return checkedFields;
    };

    const newStudyData = {
      creator_id: userId,
      study_details: getCheckedFields(studyDetails),
      individual_details: getCheckedFields(individualDetails),
      questionnaire_details: getCheckedFields(questionnaireDetails),
      custom_templates: [],
    };

    const res = await createStudy({ variables: { record: newStudyData } });
    navigate("/studies/" + res.data.studyCreateOne.recordId);
  };

  const handleNext = () => {
    if (activeStep === 0 && getName().length === 0) {
      setAlertState({
        message: "'Study Name' was not set.",
        severity: "error",
        open: true
      });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckboxChange = (isChecked, key) => {
    switch (activeStep) {
      case 0: {
        const newStudyDetails = studyDetails.map((field) => {
          if (field.data.key === key && !field.data.mandatory) {
            return { checked: isChecked, data: field.data };
          }
          return field;
        });
        setStudyDetails(newStudyDetails);
        break;
      }
      case 1: {
        const newIndividualDetails = individualDetails.map((field) => {
          if (field.data.key === key && !field.data.mandatory) {
            return { checked: isChecked, data: field.data };
          }
          return field;
        });
        setIndividualDetails(newIndividualDetails);
        break;
      }
      case 2: {
        const newQuestionnaireDetails = questionnaireDetails.map((field) => {
          if (field.data.key === key && !field.data.mandatory) {
            return { checked: isChecked, data: field.data };
          }
          return field;
        });
        setQuestionnaireDetails(newQuestionnaireDetails);
        break;
      }
    }
  };

  const handleValueChange = (newValue, key) => {
    newValue = newValue.toString();
    switch (activeStep) {
      case 0: {
        const newStudyDetails = studyDetails.map((field) => {
          if (field.data.key === key) {
            return { ...field, data: { ...field.data, value: newValue } };
          }
          return field;
        });
        setStudyDetails(newStudyDetails);
        break;
      }
      case 1: {
        const newIndividualDetails = individualDetails.map((field) => {
          if (field.data.key === key) {
            return { ...field, data: { ...field.data, value: newValue } };
          }
          return field;
        });
        setIndividualDetails(newIndividualDetails);
        break;
      }
      case 2: {
        const newQuestionnaireDetails = questionnaireDetails.map((field) => {
          if (field.data.key === key) {
            return { ...field, data: { ...field.data, value: newValue } };
          }
          return field;
        });
        setQuestionnaireDetails(newQuestionnaireDetails);
        break;
      }
    }
  };

  function cancelNewField() {
    setShowNewFieldForm(false);
  }

  function createNewField(field) {
    switch (activeStep) {
      case 0: {
        setStudyDetails([...studyDetails, { checked: true, data: field }]);
        break;
      }
      case 1: {
        setIndividualDetails([
          ...individualDetails,
          { checked: true, data: field },
        ]);
        break;
      }
      case 2: {
        setQuestionnaireDetails([
          ...questionnaireDetails,
          { checked: true, data: field },
        ]);
        break;
      }
    }
    setShowNewFieldForm(false);
  }

  function handleNewFieldFormClick() {
    setShowNewFieldForm(true);
  }

  return (
    <Dialog scroll='paper' open={isOpen}>
      <DialogTitle>
      <Stepper activeStep={activeStep}>
        {steps.map((label) =>
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )}
      </Stepper>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Dialog
            open={isNameError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Must select a Name"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setIsNameError(false)}>Ok</Button>
            </DialogActions>
          </Dialog>
          <Fragment>
            <Typography component={"div"} sx={{ mt: 2, mb: 1 }}>
              {steps[activeStep] === "Summary" ? (
                <Summary
                  studyDetails={studyDetails}
                  individualDetails={individualDetails}
                  questionnaireDetails={questionnaireDetails}
                />
              ) : (
                <FormRenderer
                  isCheckbox={true}
                  fields={
                    activeStep === 0
                      ? studyDetails
                      : activeStep === 1
                      ? individualDetails
                      : questionnaireDetails
                  }
                  handleValueChange={handleValueChange}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep < (steps.length - 1) && (
                <Button
                  color="secondary"
                  startIcon={<Add />}
                  onClick={handleNewFieldFormClick}
                  sx={{ml: 'auto', mr: 'auto'}}
                >
                  {
                  activeStep === 0
                  ? 'Add custom \'Study Details\' field'
                  : activeStep === 1
                  ? 'Add custom \'Individual Details\' field'
                  : 'Add custom \'Questionnaire Details\' field'
                  }
                </Button>
              )}
              {showNewFieldForm && (
                <NewFieldForm create={createNewField} cancel={cancelNewField} />
              )}
            </Box>
          </Fragment>
          <Alert {...alertState} onClose={() => setAlertState({ ...alertState, open: false})} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelNewStudy} sx={{mr: 'auto'}}>Cancel</Button>
        <Button variant='outlined' disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {(activeStep === steps.length - 1)
          ? <Button onClick={handleFinish}>Finish</Button>
          : <Button onClick={handleNext}>Next</Button>
        }
      </DialogActions>
    </Dialog>
  );
}
