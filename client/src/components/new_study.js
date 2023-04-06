import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { generateFormInput } from "./utils";
import { GET_INDIVIDUAL_DETAILS_FIELDS, GET_QUESTIONNAIRE_DETAILS_FIELDS, GET_STUDY_DETAILS_FIELDS } from "./queries/fields_query";
import { useLocation, useNavigate } from "react-router-dom";
import NewFieldForm from "./new_field_form";
import { CREATE_STUDY } from "./mutations/studies_mutation";

const NewStudyComp = () => {
  const [formIndex, setFormIndex] = useState(0);
  const [studyDetails, setStudyDetails] = useState([]);
  const [individualDetails, setIndividualDetails] = useState([]);
  const [currentFields, setCurrentFields] = useState([]);
  const [questionnaireDetails, setQuestionnaireDetails] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);
  const [createStudy, {data}] = useMutation(CREATE_STUDY);
  
  useQuery(GET_STUDY_DETAILS_FIELDS, {onCompleted: handleSetStudyDetails});
  useQuery(GET_INDIVIDUAL_DETAILS_FIELDS, {onCompleted: handleSetIndividualDetails});
  useQuery(GET_QUESTIONNAIRE_DETAILS_FIELDS, {onCompleted: handleSetQuestionnaireDetails});


  useEffect(() => {
    if (formIndex === 0) {
      setCurrentFields(studyDetails);
    } else if (formIndex === 1) {
      setCurrentFields(individualDetails);
    } else if (formIndex === 2) {
      setCurrentFields(questionnaireDetails);
    }
  },[studyDetails, individualDetails, questionnaireDetails, formIndex])

  function handleSetStudyDetails(data) {
    const arr = data.fieldsOne.fields.map(field => {
      return (
        {
          checked: false,
          data: field
        }
      )
    })
    setStudyDetails(arr)
  }

  function handleSetIndividualDetails(data) {
    const arr = data.fieldsOne.fields.map(field => {
      return (
        {
          checked: false,
          data: field
        }
      )
    })
    setIndividualDetails(arr)
  }

  function handleSetQuestionnaireDetails(data) {
    const arr = data.fieldsOne.fields.map(field => {
      return (
        {
          checked: false,
          data: field
        }
      )
    })
    setQuestionnaireDetails(arr)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleNext = () => {
    setFormIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setFormIndex((prevIndex) => prevIndex - 1);
  };
  
  const handleCancel = () => {
    navigate(`/users/${user.username}`, { state: { user: user } });
  };

  const handleCheckboxChange = (event, key) => {
    const isChecked = event.target.checked;
    switch(formIndex) {
      case 0:
        {
          const newStudyDetails = studyDetails.map(field => {
            if (field.data.key === key) {
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
            if (field.data.key === key) {
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
            if (field.data.key === key) {
              return {checked: isChecked, data: field.data}
            }
            return field
          })
          setQuestionnaireDetails(newQuestionnaireDetails)
          break;
        }
      }
 };
  const handleValueChange = (event, key) => {
    const newValue = event.target.value
    switch(formIndex) {
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


  function cancelNewFieldCreation() {
    setShowNewFieldForm(false)
  }

  function createNewField(field) {
    switch (formIndex) {
      case 0:
        {
          setStudyDetails([...studyDetails, {checked: false, data: field}])
          break;
        }
      case 1:
        {
          setIndividualDetails([...individualDetails, {checked: false, data: field}])
          break;
        }
      case 2:
        {
          setQuestionnaireDetails([...questionnaireDetails, {checked: false, data: field}])
          break;
        }
    }
    setShowNewFieldForm(false)
  }

  function handleNewFieldFormClick() {
    setShowNewFieldForm(true)
  }

  return (
    <div>
      <h2>New Study</h2>
      <h3>{formIndex === 0 ? "Study Details" : formIndex === 1 ? "Individual Details" : "Questionnaire Details"}</h3>
      <form onSubmit={handleSubmit}>
        {currentFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.data.key}></label>
            {generateFormInput(field, handleValueChange, handleCheckboxChange)}
          </div>
        ))}
        <div>
          {formIndex !== 0 && <button onClick={handleBack}>Back</button>}
          {formIndex !== 2 ? <button onClick={handleNext}>Next</button> : <button type="submit">Finish</button>}
          <button onClick={handleCancel}>Cancel</button>
          {showNewFieldForm ? (
          <NewFieldForm cancel={cancelNewFieldCreation} create={createNewField}/>
            ) : (
              <button onClick={handleNewFieldFormClick}>Add Field</button>
            )}
        </div>
      </form>
    </div>
  );
};

export default NewStudyComp;
