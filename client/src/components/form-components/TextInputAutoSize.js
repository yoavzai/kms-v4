import { TextInputAutoSize } from '../elements';

export default function({id, label, value, onChange}) {
	return <TextInputAutoSize id={id} label={label} value={value || ""} onChange={onChange} />
};
