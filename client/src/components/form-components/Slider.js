import { Slider } from '../elements';

export default function({id, label, value, onChange}) {
	return <Slider id={id} label={label} value={value || ""} onChange={onChange} />
};
