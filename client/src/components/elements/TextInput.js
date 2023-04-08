import TextField from '@mui/material/TextField';

export default function({id, label, value, onChange}) {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      variant="standard"
    />
	);
};
