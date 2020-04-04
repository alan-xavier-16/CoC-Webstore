import React, { createRef, useState } from "react";
import PropTypes from "prop-types";

import "./Dropzone.styles.scss";

const Dropzone = ({ onFilesAdded, disabled }) => {
  /* REFERENCE HIDDEN INPUT OF TYPE 'FILE' */
  let fileInputRef = createRef();

  /* OPEN FILE DIALOG EVENT LISTENER ON CLICK */
  const openFileDialog = (e) => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  /* SEND FILES TO PARENT (FILEUPLOAD) */
  const handleFilesAdded = (e) => {
    if (disabled) return;

    const files = e.target.files; // ARRAY

    /* CONVERT FILES TO A JS ARRAY */
    const filesArray = [...files];
    onFilesAdded(filesArray);
  };

  /* DROPZONE EVENT METHODS */
  const [highlight, setHighlight] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = (e) => {
    setHighlight(false);
  };

  /* SEND FILES TO PARENT */
  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;

    const files = e.dataTransfer.files; // ARRAY

    /* CONVERT FILES TO A JS ARRAY */
    const filesArray = [...files];
    onFilesAdded(filesArray);

    setHighlight(false);
  };

  return (
    <div
      className={`dropzone ${disabled && "disabled"} ${
        highlight && "highlight"
      }`}
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <i className="fas fa-file-upload"></i>

      <input
        ref={fileInputRef}
        type="file"
        className="file-input"
        onChange={handleFilesAdded}
        multiple
      />

      <span>Upload Files</span>
    </div>
  );
};

Dropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Dropzone;
