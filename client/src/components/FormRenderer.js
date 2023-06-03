import { Fragment } from "react";
import { InputLabel, TextField, Slider, Select, MenuItem } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

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
            sx={{width:'100%'}}
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
            sx={{width:'100%'}}
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
            sx={{width:'100%'}}
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
            sx={{width:'100%'}}
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
            sx={{width:'100%'}}
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
    <Grid container spacing={0}>
      {fields.map((field) => {
        const field_data = isCheckbox ? field.data : field;
        return (
          <Fragment key={field_data.key}>
            <Grid item xs={isCheckbox ? 1 : 0} sx={{mt: 'auto', mb: 'auto'}} >
              {isCheckbox && (
                <Checkbox
                  disabled={field_data.mandatory}
                  checked={field.checked}
                  onChange={({ target: { checked } }) =>
                    handleCheckboxChange(checked, field_data.key)
                  }
                />
              )}
            </Grid>
            <Grid item xs={isCheckbox ? 11 : 12} >
              {renderField(field_data, handleValueChange)}
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}
