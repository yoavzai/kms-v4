import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function({id, label, value, onChange}) {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={id}
        value={value}
        onChange={onChange}
        variant="standard"
      />
    </>
	);
};
