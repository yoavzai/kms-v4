import { useMutation } from "@apollo/client";
import QuestionnaireInput from "./QuestionnaireInput";
import { useDispatch } from "react-redux";
import { UPDATE_QUESTIONNAIRE_BY_ID } from "../../../../mutations/questionnaires";
import Typography from '@mui/material/Typography';

export default function ({ inputs, questionnaireId }) {
  const dispatch = useDispatch();
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID);

  function updateInput(newInput) {
    const newInputs = inputs.map((input) => {
      if (input.input_id === newInput.input_id) {
        return newInput;
      }
      return input;
    });
    dispatch({ type: "updateInputs", payload: newInputs });
    updateQuestionnaire({
      variables: { id: questionnaireId, record: { inputs: newInputs } },
    });
  }

  return (
    <div>
      {inputs.map((input, index) => {
        return (
          <QuestionnaireInput key={index} input={input} updateInput={updateInput} />
        );
      })}
    </div>
  );
}