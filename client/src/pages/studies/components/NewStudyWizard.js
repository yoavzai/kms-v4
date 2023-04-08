import { useState } from 'react';

import {
  FormRenderer,
} from '../../../components';

const response = {
  "fieldsOne": {
    "_id": "76f0eb3c-fca4-4270-99dc-66b6738be816",
    "name": "study_details",
    "fields": [
      {
        "type": "text",
        "key": "name",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": null,
        "__typename": "FieldsFields"
      },
      {
        "type": "text",
        "key": "description",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": null,
        "__typename": "FieldsFields"
      },
      {
        "type": "text",
        "key": "codename",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": null,
        "__typename": "FieldsFields"
      },
      {
        "type": "dropdown",
        "key": "research_variables",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": [
          "Personality traits",
          "Emotions",
          "Cognition",
          "Creativity",
          "Behaviors",
          "Social behaviors",
          "Attitudes & values",
          "Quality of life",
          "Physical health",
          "Mental health",
          "Demographics",
          "Professions",
          "Other"
        ],
        "__typename": "FieldsFields"
      },
      {
        "type": "dropdown",
        "key": "study_population",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": [
          "Adults",
          "Children",
          "Students - University",
          "Students-Secondary school",
          "Students-Primary school",
          "Elderly",
          "Psychopathology",
          "Physical disease"
        ],
        "__typename": "FieldsFields"
      },
      {
        "type": "dropdown",
        "key": "source_material",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": [
          "Meaning Questionnaire",
          "Experimental Text",
          "Free Text"
        ],
        "__typename": "FieldsFields"
      },
      {
        "type": "dropdown",
        "key": "instructions",
        "mandatory": true,
        "value": null,
        "min_num": null,
        "max_num": null,
        "dropdown_options": [
          "General",
          "Interpersonal",
          "Personal"
        ],
        "__typename": "FieldsFields"
      }
    ],
    "__typename": "Fields"
  }
};

export default function() {
  const [data, setData] = useState();

  return (
    <>
      <h3>NewStudyWizard component</h3>
      <FormRenderer
        fields={response.fieldsOne.fields}
        state={data}
        stateHandler={setData}
      />
			<hr />
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
};
