import { Date } from '../elements';

export default function({id, label, value, onChange}) {
	return <Date id={id} label={label} value={value || ""} onChange={onChange} />
};
