export default function({
    studyDetails,
    individualDetails,
    questionnaireDetails,
}) {
    return (
      <div>
        <h3>Study Details</h3>
        {studyDetails
          .filter((f) => f.checked)
          .map((field) => {
            return (
              <div key={field.data.key}>
                <span>
                  {field.data.key} - {field.data.value}
                </span>
              </div>
            );
          })}
        <h3>Individual Details</h3>
        {individualDetails
          .filter((f) => f.checked)
          .map((field) => {
            return (
              <div key={field.data.key}>
                <span>
                  {field.data.key} - {field.data.value}
                </span>
              </div>
            );
          })}
        <h3>Questionnaire Details</h3>
        {questionnaireDetails
          .filter((f) => f.checked)
          .map((field) => {
            return (
              <div key={field.data.key}>
                <span>
                  {field.data.key} - {field.data.value}
                </span>
              </div>
            );
          })}
      </div>
    );
  }