import React, { useState } from "react";
import PropTypes from "prop-types";

const AddDetails = ({ handleDetails, productDetails }) => {
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
  };

  // ADD / REMOVE INPUT FIELDS
  const handleAddInput = e => {
    e.preventDefault();
    details = [...details];
    details.push({
      title: "",
      text: ""
    });
    setDetails(details);
  };

  const handleRemoveInput = (idx, e) => {
    e.preventDefault();
    details = [...details];
    details.splice(idx, 1);
    setDetails(details);
  };

  // PASS DETAILS TO PARENT FORM
  const handleAddDetails = e => {
    e.preventDefault();
    handleDetails(details);
  };

  return (
    <div className="details-input-grid">
      {details.map((detail, idx) => (
        <div key={`detail-${idx}`} className={`details-input-item`}>
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

          <button className="btn btn-primary" onClick={handleAddInput}>
            Add Detail <i className="fas fa-plus-square"></i>
          </button>

          <button
            className="btn btn-secondary"
            onClick={e => handleRemoveInput(idx, e)}
          >
            Remove Detail <i className="fas fa-minus-square"></i>
          </button>
        </div>
      ))}

      <button className="btn btn-gold" onClick={handleAddDetails}>
        Add All Details <i className="fas fa-plus-square"></i>
      </button>
    </div>
  );
};

AddDetails.propTypes = {
  handleDetails: PropTypes.func.isRequired
};

export default AddDetails;
