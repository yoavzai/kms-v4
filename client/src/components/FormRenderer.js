import { TextInput, Select, Number, Date, Slider } from './form-components';

function renderField(field, handleValueChange) {

  const {type,key,mandatory,value,min_num,max_num,dropdown_options} = field
    switch(type) {
      case 'text':
        return (
          <div>
            <TextInput
              key={key}
              label={key}
              value={value}
              onChange={({ target: { value : newValue }}) => handleValueChange(newValue, key)}
            />
          </div>
        );
      case 'slider':
        return (
          <div>
            <Slider
              key={key}
              label={key}
              value={value}
              onChange={({ target: { value : newValue }}) => handleValueChange(newValue, key)}
            />
          </div>
        );
      case 'date':
        return (
          <div>
            <Date
              key={key}
              label={key}
              value={value}
              onChange={({ target: { value : newValue }}) => handleValueChange(newValue, key)}
            />
          </div>
        );
      case 'number':
        return (
          <div>
            <Number
              key={key}
              label={key}
              value={value}
              onChange={({ target: { value : newValue }}) => handleValueChange(newValue, key)}
              min={min_num}
              max={max_num}
            />
          </div>
        );
      case 'dropdown':
        return (
          <div>
            <Select
              key={key}
              label={key}
              value={value}
              onChange={({ target: { value : newValue}}) => handleValueChange(newValue, key)}
              options={dropdown_options.map(option => ({ label: option, value: option }))}
              required={mandatory}
            />
          </div>
        );
    };
  };

export default function({isCheckbox, fields, handleValueChange, handleCheckboxChange}) {
  return (
    <>
      {
        fields.map((field, index) => {
          const field_data = isCheckbox ? field.data : field
          return (
            <div key={index}>
              {isCheckbox &&  <input type="checkbox" checked={field.checked} onChange={({ target: {checked}}) => handleCheckboxChange(checked, field_data.key)} />}
              {renderField(field_data, handleValueChange)}
            </div>
          )
          })
      }
    </>
  );
};
