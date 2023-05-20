import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function({id, label, value, onChange, options}) {
  return (
    <>
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          label={label}
          value={value}
          onChange={onChange}
        >
          {options.map(({ label, value }, index) => (<MenuItem key={index} value={value}>{label}</MenuItem>))}
        </Select>
    </>
  );
};
