export function generateFormInput(field, handleValueChange, handleCheckboxChange) {
    console.log("hi")
    let { type, key, mandatory, value, min_num, max_num, dropdown_options } = field.data;
    value = value == null ? undefined : value
  
    switch (type) {
      case "text":
        return (
          <div>
            <input type="checkbox" checked={field.checked} onChange={(event) => handleCheckboxChange(event, key)} />
            <label htmlFor={key}>{key}:</label>
            <input type="text" id={key} name={key} value={value} onChange={(event) => handleValueChange(event, key)}/>
            {mandatory && <span style={{ color: "red" }}>*</span>}
          </div>
        );
      case "number":
        return (
          <div>
            <input type="checkbox" checked={field.checked} onChange={(event) => handleCheckboxChange(event, key)} />
            <label htmlFor={key}>{key}:</label>
            <input type="number" id={key} name={key} value={value} min={min_num} max={max_num} onChange={(event) => handleValueChange(event, key)}/>
            {mandatory && <span style={{ color: "red" }}>*</span>}
          </div>
        );
      case "date":
        return (
          <div>
            <input type="checkbox" checked={field.checked} onChange={(event) => handleCheckboxChange(event, key)} />
            <label htmlFor={key}>{key}:</label>
            <input type="date" id={key} name={key} value={value} onChange={(event) => handleValueChange(event, key)}/>
            {mandatory && <span style={{ color: "red" }}>*</span>}
          </div>
        );
      case "dropdown":
        return (
          <div>
            <input type="checkbox" checked={field.checked} onChange={(event) => handleCheckboxChange(event, key)} />
            <label htmlFor={key}>{key}:</label>
            <select id={key} name={key} value={value} onChange={(event) => handleValueChange(event, key)}>
              <option value=""></option>
              {dropdown_options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {mandatory && <span style={{ color: "red" }}>*</span>}
          </div>
        );
      case "slider":
        return (
          <div>
            <input type="checkbox" checked={field.checked} onChange={(event) => handleCheckboxChange(event, key)} />
            <label htmlFor={key}>{key}:</label>
            <input type="range" id={key} name={key} value={value} min={min_num} max={max_num} onChange={(event) => handleValueChange(event, key)}/>
            {mandatory && <span style={{ color: "red" }}>*</span>}
          </div>
        );
      default:
        return null;
    }
  }