import { InputLabel, TextareaAutosize } from '@mui/material';

export default function({id, label, value, onChange}) {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="option 1,option 2,option 3,...,last option"
        style={{ width: 200 }}
        id={id}
        value={value}
        onChange={onChange}
        variant="standard"
    />
    </>
	);
};
