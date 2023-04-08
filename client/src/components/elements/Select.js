import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function({id, label, value, onChange, options}) {
  return (
    <Select
      id={id}
      label={label}
      value={value}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
    </Select>
  );
};
