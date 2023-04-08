import { TextInput, Select } from './form-components';

function renderField(currentvalue, stateHandler) {
  return function({
    type,
    key,
    mandatory,
    value,
    min_num,
    max_num,
    dropdown_options,
  }) {
    switch(type) {
      case 'text':
        return (
          <div>
            <TextInput
              key={key}
              label={key}
              value={currentvalue}
              onChange={({ target: { value }}) => stateHandler(state => ({...state, [`${key}`]: value}))}
            />
          </div>
        );
      case 'dropdown':
        return (
          <div>
            <Select
              key={key}
              label={key}
              value={currentvalue}
              onChange={({ target: { value }}) => stateHandler(state => ({...state, [`${key}`]: value}))}
              options={dropdown_options.map(option => ({ label: option, value: option }))}
            />
          </div>
        );
    };
  };
};

export default function({fields, state, stateHandler}) {
  return (
    <>
      <h3>FormRenderer</h3>
      {
        fields.map((field) => (
          <div key={field.key}>
            {renderField(!!state && state[field.key] ? state[field.key] : "", stateHandler)(field)}
          </div>
        ))
      }
    </>
  );
};
