import { useMutation } from "@apollo/client";
import Input from "./components";
import { useDispatch } from "react-redux";
import { UPDATE_QUESTIONNAIRE_BY_ID } from "../../../../../../mutations/questionnaires";

export default function ({ inputs, questionnaireId }) {
  const dispatch = useDispatch();
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID);

  function updateInputs(newInput) {
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
          <Input key={index} input={input} updateInputs={updateInputs}></Input>
        );
      })}
    </div>
  );
}
