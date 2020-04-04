import React, { useState, useEffect } from "react";

const File = ({ file }) => {
  /* FILE OBJECT & PREVIEW URL */
  const [fileAdded, setFileAdded] = useState({
    selectedFile: file ? file : null,
    previewUrl: null,
  });

  /* CREATE FILE PREVIEW */
  useEffect(() => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setFileAdded({
        ...fileAdded,
        selectedFile: file,
        previewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="form-file">
      <span className="lead">{file.name}</span>

      <div className="file-preview">
        {fileAdded.previewUrl ? (
          <img src={fileAdded.previewUrl} alt="Preview" />
        ) : (
          <p>No preview to display</p>
        )}
      </div>
    </div>
  );
};

export default File;
