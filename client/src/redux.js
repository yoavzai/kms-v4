const initialState = {
  user: {},
  study: {},
  questionnaire: {},
};

export default function (state = initialState, action) {
  const data = action.payload;
  switch (action.type) {
    case "user":
      return { ...state, user: data };
    case "study":
      return { ...state, study: data };
    case "questionnaire":
      return { ...state, questionnaire: data };
    case "updateInputs":
      return {
        ...state,
        questionnaire: { ...state.questionnaire, inputs: data },
      };
    default:
      return state;
  }
}
