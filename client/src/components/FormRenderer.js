import { InputLabel, TextField, Slider, Select, MenuItem } from "@mui/material";

function renderField(field, handleValueChange) {
  const { type, key, mandatory, value, min_num, max_num, dropdown_options } =
    field;
  switch (type) {
    case "text":
      return (
        <div>
          <InputLabel>{key}</InputLabel>
          <TextField
            key={key}
            value={value}
            onChange={({ target: { value: newValue } }) =>
              handleValueChange(newValue, key)
            }
          />
        </div>
      );
    case "slider":
      const intValue = parseInt(value) || 0;
      return (
        <div>
          <InputLabel>{key}</InputLabel>
          <Slider
            key={key}
            value={intValue}
            onChange={({ target: { value: newValue } }) =>
              handleValueChange(newValue, key)
            }
          />
        </div>
      );
    case "date":
      return (
        <div>
          <InputLabel>{key}</InputLabel>
          <TextField
            value={value}
            type="date"
            onChange={({ target: { value: newValue } }) =>
              handleValueChange(newValue, key)
            }
          />
        </div>
      );
    case "number":
      return (
        <div>
          <InputLabel>{key}</InputLabel>
          <TextField
            value={value}
            type="number"
            onChange={({ target: { value: newValue } }) =>
              handleValueChange(newValue, key)
            }
            inputProps={{ min: min_num, max: max_num }}
          />
        </div>
      );
    case "dropdown":
      const options = mandatory ? dropdown_options : ["", ...dropdown_options];
      return (
        <div>
          <InputLabel>{key}</InputLabel>
          <Select
            value={value}
            onChange={({ target: { value: newValue } }) =>
              handleValueChange(newValue, key)
            }
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      );
  }
}

export default function ({
  isCheckbox,
  fields,
  handleValueChange,
  handleCheckboxChange,
}) {
  return (
    <>
      {fields.map((field, index) => {
        const field_data = isCheckbox ? field.data : field;
        return (
          <div key={index}>
            {isCheckbox && (
              <input
                disabled={field_data.mandatory}
                type="checkbox"
                checked={field.checked}
                onChange={({ target: { checked } }) =>
                  handleCheckboxChange(checked, field_data.key)
                }
              />
            )}
            {renderField(field_data, handleValueChange)}
          </div>
        );
      })}
    </>
  );
}
