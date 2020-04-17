import React from "react";
import PropTypes from "prop-types";

const AddDetails = ({ handleDetails, details }) => {
  // UPDATE EACH DETAIL FIELD USING THE INDEX PASSED
  const handleChange = (idx, e) => {
    details = [...details]; // ARRAY
    details[idx][e.target.name] = e.target.value;
    handleDetails(details);
  };

  // ADD BLANK DETAIL INPUT FIELD
  const handleAddInput = (e) => {
    e.preventDefault();
    details = [...details];
    details.push({
      title: "",
      text: "",
    });
    handleDetails(details);
  };

  // REMOVE DETAIL INPUT FIELDS
  const handleRemoveInput = (idx, e) => {
    e.preventDefault();
    details = [...details];
    details.splice(idx, 1);
    handleDetails(details);
  };

  return (
    <fieldset className="form-group fieldset">
      <legend>Details</legend>

      {details.map((detail, idx) => (
        <div key={`detail-${idx}`} className={`field-item`}>
          <div className="form-group">
            <label htmlFor={`title`}>Title</label>
            <input
              type="text"
              name="title"
              value={detail.title}
              onChange={(e) => handleChange(idx, e)}
              placeholder="Color"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`text`}>Text</label>
            <input
              type="text"
              name="text"
              value={detail.text}
              onChange={(e) => handleChange(idx, e)}
              placeholder="A dark shade of lavender"
              required
            />
          </div>

          <div className="form-actions">
            <button
              className="btn btn-danger"
              onClick={(e) => handleRemoveInput(idx, e)}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}

      <div className="form-actions center">
        <button className="btn btn-primary" onClick={handleAddInput}>
          <i className="far fa-plus-square"></i> Add More Details
        </button>
      </div>
    </fieldset>
  );
};

AddDetails.propTypes = {
  handleDetails: PropTypes.func.isRequired,
};

export default AddDetails;
