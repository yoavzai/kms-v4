import { TextInput } from '../elements';

export default function({id, label, value, onChange}) {
	return <TextInput id={id} label={label} value={value || ""} onChange={onChange} />
};
