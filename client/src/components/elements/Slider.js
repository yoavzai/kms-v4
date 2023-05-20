import { InputLabel } from '@mui/material';
import Slider from '@mui/material/Slider';

export default function({id, label, value, onChange}) {
    value = parseInt(value) || 0
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Slider
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
	);
};
