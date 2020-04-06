import React, { useState, useEffect } from "react";

const File = ({ file }) => {
  const [preview, setPreview] = useState({
    previewUrl: null,
  });

  useEffect(() => {
    // Set Image Preview
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview({ ...preview, previewUrl: reader.result });
    };
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file, preview]);
  return (
    <div className="form-file">
      <span className="lead">{file.name}</span>

      <div className="file-preview">
        {preview.previewUrl ? (
          <img src={preview.previewUrl} alt="Preview" />
        ) : (
          <p>No preview to display</p>
        )}
      </div>
    </div>
  );
};

export default File;
