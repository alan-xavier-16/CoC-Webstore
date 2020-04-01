import React, { useState } from "react";
import PropTypes from "prop-types";

const AddDetails = ({ handleDetails, productDetails }) => {
  // USER INTERFACE WARNING
  const [isModified, setIsModified] = useState(false);

  // PRODUCT DETAILS STATE
  let [details, setDetails] = useState(
    productDetails
      ? productDetails
      : [
          {
            title: "",
            text: ""
          }
        ]
  );

  // UPDATE EACH DETAIL FIELD USING THE INDEX PASSED
  const handleChange = (idx, e) => {
    details = [...details]; // ARRAY
    details[idx][e.target.name] = e.target.value;
    setDetails(details);
    setIsModified(true);
  };

  // ADD BLANK DETAIL INPUT FIELD
  const handleAddInput = e => {
    e.preventDefault();
    details = [...details];
    details.push({
      title: "",
      text: ""
    });
    setDetails(details);
  };

  // REMOVE DETAIL INPUT FIELDS
  const handleRemoveInput = (idx, e) => {
    e.preventDefault();
    details = [...details];
    details.splice(idx, 1);
    setDetails(details);
    setIsModified(true);
  };

  // PASS DETAILS TO PARENT
  const handleAddDetails = e => {
    e.preventDefault();
    handleDetails(details);
    setIsModified(false);
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
              onChange={e => handleChange(idx, e)}
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
              onChange={e => handleChange(idx, e)}
              placeholder="A dark shade of lavender"
              required
            />
          </div>

          <div className="form-actions">
            <button
              className="btn btn-danger"
              onClick={e => handleRemoveInput(idx, e)}
            >
              <i className="fas fa-minus-square"></i>
            </button>

            <button className="btn btn-primary" onClick={handleAddInput}>
              <i className="fas fa-chevron-circle-down"></i>
            </button>
          </div>
        </div>
      ))}

      <div className="form-actions center">
        {isModified && (
          <button className="btn btn-success" onClick={handleAddDetails}>
            <i className="fas fa-check-circle"></i>
          </button>
        )}
      </div>
    </fieldset>
  );
};

AddDetails.propTypes = {
  handleDetails: PropTypes.func.isRequired
};

export default AddDetails;
