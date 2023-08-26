import { useState, Fragment } from "react";
import { FormRenderer } from "../../../../components";
import { cleanPayload } from "../../../../utils";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_QUESTIONNAIRE } from "../../../../mutations/questionnaires";
import { GET_TEMPLATES } from "../../../../queries/templates";
import { UPDATE_STUDY_BY_ID } from "../../../../mutations/studies";
import { GET_TRANSLATIONS } from "../../../../queries/translations";
import InputsSelection from "./InputsSelection";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

const { v4 } = require("uuid");
const steps = [
  "Individual details",
  "Questionnaire details",
  "Inputs",
  "Summary",
];

export default function ({ cancelNewQuestionnaire, study }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [individualDetails, setIndividualDetails] = useState(
    study.individual_details
  );
  const [questionnaireDetails, setQuestionnaireDetails] = useState(
    study.questionnaire_details
  );
  const [globalTemplates, setGlobalTemplates] = useState([]);
  const [studyTemplates, setStudyTemplates] = useState(study.custom_templates);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [chosenTemplate, setChosenTemplate] = useState({});
  const [createQuestionnaire] = useMutation(CREATE_QUESTIONNAIRE);
  useQuery(GET_TEMPLATES, { onCompleted: handleSetGlobalTemplates });
  const [loadTranslations] = useLazyQuery(GET_TRANSLATIONS);
  const [updateStudy] = useMutation(UPDATE_STUDY_BY_ID);
  const [isLanguageError, setIsLangugeError] = useState(false);
  const [isTemplateError, setIsTemplateError] = useState(false);

  function handleSetGlobalTemplates(data) {
    const templates = cleanPayload(data.templateMany);
    setGlobalTemplates(templates);
  }

  function getLanguage() {
    const field = questionnaireDetails.find((f) => f.key === "language");
    return field.value;
  }

  async function handleSetFilteredTemplates() {
    const language = getLanguage();
    const res = await loadTranslations({
      variables: { filter: { language: language } },
    });
    const translations = cleanPayload(res.data.translationMany);
    const filteredTemplatesTemp = [];
    for (const template of globalTemplates) {
      const inputs = [];
      for (const inputId of template.inputs_ids) {
        const input = translations.find((t) => t.input_id === inputId);
        inputs.push({ input_id: input.input_id, name: input.value });
      }
      filteredTemplatesTemp.push({
        _id: template._id,
        name: template.name,
        language: language,
        inputs: inputs,
      });
    }

    setFilteredTemplates([...filteredTemplatesTemp, ...studyTemplates]);
  }

  const handleCreateNewTemplate = async (name, inputs) => {
    const newTemplate = {
      _id: v4(),
      name: name,
      language: getLanguage(),
      inputs: inputs,
    };
    await updateStudy({
      variables: {
        id: study._id,
        record: { custom_templates: [...study.custom_templates, newTemplate] },
      },
    });
    setFilteredTemplates([...filteredTemplates, newTemplate]);
    setStudyTemplates([...studyTemplates, newTemplate]);
    setChosenTemplate(newTemplate);
  };

  const handleSetChosenTemplate = (template) => {
    setChosenTemplate(template);
  };

  const handleFinish = async () => {
    const newQuestionnaireData = {
      study_id: study._id,
      individual_details: individualDetails,
      questionnaire_details: questionnaireDetails,
      inputs: chosenTemplate.inputs.map((input) => {
        return { ...input, answer: { text: "", image_id: "", codings: [] } };
      }),
    };

    const res = await createQuestionnaire({
      variables: { record: newQuestionnaireData },
    });
    navigate(
      "/studies/" +
        study._id +
        "/questionnaires/" +
        res.data.questionnaireCreateOne.recordId
    );
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      const language = getLanguage();
      if (language.length === 0) {
        setIsLangugeError(true);
        return;
      }
      await handleSetFilteredTemplates();
    } else if (activeStep === 2 && Object.keys(chosenTemplate).length === 0) {
      setIsTemplateError(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setChosenTemplate({});
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    cancelNewQuestionnaire();
  };

  const handleValueChange = (newValue, key) => {
    newValue = newValue.toString();
    switch (activeStep) {
      case 0: {
        const newIndividualDetails = individualDetails.map((field) => {
          if (field.key === key) {
            return { ...field, value: newValue };
          }
          return field;
        });
        setIndividualDetails(newIndividualDetails);
        break;
      }
      case 1: {
        const newQuestionnaireDetails = questionnaireDetails.map((field) => {
          if (field.key === key) {
            return { ...field, value: newValue };
          }
          return field;
        });
        setQuestionnaireDetails(newQuestionnaireDetails);
        break;
      }
    }
  };

  function Summary() {
    return (
      <div>
        <h3>Individual Details</h3>
        {individualDetails.map((field) => {
          return (
            <div key={field.key}>
              <span>
                {field.key} - {field.value}
              </span>
            </div>
          );
        })}
        <h3>Questionnaire Details</h3>
        {questionnaireDetails.map((field) => {
          return (
            <div key={field.key}>
              <span>
                {field.key} - {field.value}
              </span>
            </div>
          );
        })}
        <h3>Inputs</h3>
        {chosenTemplate.inputs.map((input) => {
          return (
            <div key={input.input_id}>
              <span>{input.name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {isLanguageError && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Must select a Language"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setIsLangugeError(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
      {isTemplateError && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Must select a Template"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setIsTemplateError(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
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
          {activeStep === 2 ? (
            <InputsSelection
              templates={filteredTemplates}
              chosenTemplate={chosenTemplate}
              setChosenTemplate={handleSetChosenTemplate}
              createNewTemplate={handleCreateNewTemplate}
            ></InputsSelection>
          ) : activeStep === 3 ? (
            <Summary />
          ) : (
            <FormRenderer
              isCheckbox={false}
              fields={
                activeStep === 0 ? individualDetails : questionnaireDetails
              }
              handleValueChange={handleValueChange}
            />
          )}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </Box>
      </Fragment>
    </Box>
  );
}
