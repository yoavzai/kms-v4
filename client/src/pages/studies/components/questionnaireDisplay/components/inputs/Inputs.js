import { useMutation } from "@apollo/client";
import Input from "./components";
import { UPDATE_QUESTIONNAIRE_BY_ID } from "../../../../../../mutations/questionnaires";

export default function ({ inputs, questionnaireId }) {
  const [updateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE_BY_ID);

  async function updateInputs(newInput) {
    const newInputs = inputs.map((input) => {
      if (input.input_id === newInput.input_id) {
        return newInput;
      }
      return input;
    });

    await updateQuestionnaire({
      variables: { id: questionnaireId, record: { inputs: newInputs } },
    });
  }

  return (
    <div>
      {inputs.map((input, index) => {
        return (
          <Input key={index} input={input} updateInput={updateInputs}></Input>
        );
      })}
    </div>
  );
}
