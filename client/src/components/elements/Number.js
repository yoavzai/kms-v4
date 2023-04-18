import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function({id, label, value, onChange, min, max}) {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        value={value}
        onChange={onChange}
        variant="standard"
        type='number'
        inputProps={{min: min, max: max}}
      />
    </>
	);
};
