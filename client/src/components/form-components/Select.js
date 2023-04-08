import { Select } from '../elements';

export default function({id, label, value, onChange, options}) {
	return <Select id={id} label={label} value={value || ""} onChange={onChange} options={options} />
};
