import { Number } from '../elements';

export default function({id, label, value, onChange, min, max}) {
	return <Number id={id} label={label} value={value || ""} onChange={onChange} min={min} max={max}/>
};
