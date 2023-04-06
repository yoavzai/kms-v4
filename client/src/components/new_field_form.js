import React, { useState } from "react";

const NewFieldForm = (props) => {
  const [formData, setFormData] = useState({
    type: "text",
    value: "",
    key: "",
    min_num: "",
    max_num: "",
    mandatory: false,
    dropdown_options: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    const dropdown_options = value.split(",").map((option) => option.trim());
    setFormData((prevState) => ({
      ...prevState,
      [name]: dropdown_options,
    }));
  };

  const handleSubmit = () => {
    props.create(formData)
  };

  const handleCancel = () => {
    props.cancel()
  }

  return (
    <div>
      <div>
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="dropdown">Dropdown</option>
          <option value="slider">Slider</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="key" name="key" type="text" value={formData.key} onChange={handleInputChange} />
      </div>
      {formData.type === "number" && (
        <>
          <div>
            <label htmlFor="min_num">Minimum Number:</label>
            <input id="min_num" name="min_num" type="number" value={formData.min_num} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="max_num">Maximum Number:</label>
            <input id="max_num" name="max_num" type="number" value={formData.max_num} onChange={handleInputChange} />
          </div>
        </>
      )}
      {formData.type === "dropdown" && (
        <div>
          <label htmlFor="dropdown_options">Dropdown Options:</label>
          <textarea
            id="dropdown_options"
            name="dropdown_options"
            rows="4"
            cols="50"
            value={formData.dropdown_options.join(", ")}
            onChange={handleDropdownChange}
          />
        </div>
      )}
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewFieldForm;
