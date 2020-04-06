import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import Dropzone from "./Dropzone.component";
import File from "./File.component";

import { selectProductItem } from "../../redux/shop/shop.selectors";
import { editProductPhoto } from "../../redux/shop/shop.actions";

const FileUpload = ({ product, editProductPhoto }) => {
  const { _id, name } = product;
  /* LOCATION OBJECT */
  const location = useLocation();
  const history = useHistory();

  /* FILE UPLOAD STATE */
  const [uploads, setUploads] = useState({
    files: [],
    uploading: false,
    successfulUpload: false,
  });

  /* HANDLE FILES FROM DROPZONE */
  const onFilesAdded = (files) => {
    setUploads({
      ...uploads,
      files: [...files],
    });
  };

  /* UPLOAD EACH FILE */
  const uploadFiles = (e) => {
    e.preventDefault();
    setUploads({ uploading: true });
    const formData = new FormData();

    uploads.files.forEach((file, idx) => {
      const fileName = `${idx}.${file.name.split(".")[1]}`;
      formData.append(`file`, file, fileName);
    });

    editProductPhoto(_id, formData, history, location);
    setUploads({ uploading: false, successfulUpload: true, files: [] });
  };

  return (
    <form className="form" onSubmit={uploadFiles}>
      <div className="form-header">
        <h1>Update {name}</h1>
      </div>

      <div className="form-group">
        <Dropzone onFilesAdded={onFilesAdded} disabled={uploads.uploading} />
      </div>

      <div className="form-files">
        {!uploads.uploading &&
          uploads.files &&
          uploads.files.map((file, idx) => (
            <File key={`file-${idx}`} file={file} />
          ))}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-file-upload"></i>
        </button>

        {location.state && location.state.from && (
          <Link className="btn btn-dark" to={location.state.from}>
            <i className="fas fa-angle-left"></i>
          </Link>
        )}
      </div>
    </form>
  );
};

FileUpload.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  product: selectProductItem,
});

const mapDispatchToProps = {
  editProductPhoto: (productId, formData, history, location) =>
    editProductPhoto(productId, formData, history, location),
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
