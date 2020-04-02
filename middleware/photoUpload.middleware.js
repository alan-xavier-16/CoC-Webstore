/*
Handles Requests with File Uploads
  - Accepts a model as an argument
  - Performs file upload with express-fileupload
*/
const path = require("path");
const fs = require("fs");
const tinify = require("tinify");
tinify.key = process.env.TINIFY_KEY;
const ErrorResponse = require("../utils/errorResponse.utils");

const fileUpload = model => async (req, res, next) => {
  let resource = await model.findById(req.params.id);

  // Check Resource Exists
  if (!resource) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Remove 'no-photo.jpg'
  resource = await model.findByIdAndUpdate(req.params.id, {
    photo: resource.photo.filter(photoName => photoName !== "no-photo.jpg")
  });

  // Check Resource Length
  if (resource.photo.length >= 5) {
    return next(
      new ErrorResponse(`${resource.name} already has 5 photos`, 400)
    );
  }

  // Ensure Files is Selected
  if (!req.files) {
    return next(new ErrorResponse(`Please select a file to upload`, 400));
  }

  const file = req.files.file;

  // Check Files is an Image
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image`, 400));
  }

  // Check Image is Less than 1 Mb
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    const fileSize = process.env.MAX_FILE_UPLOAD / 1000000;
    return next(
      new ErrorResponse(`Please upload an image less than ${fileSize} Mb`, 400)
    );
  }

  // Rename File
  file.name = `${resource.slug}-${resource.photo.length}${
    path.parse(file.name).ext
  }`;

  // Delete old file if exists
  fs.access(
    path.join(__dirname, `../public/uploads/${file.name}`),
    fs.constants.F_OK,
    err => {
      if (err) {
        console.error(
          `${path.join(__dirname, `../public/uploads/${file.name}`)} ${
            err ? "does not exist" : "exists"
          }`
        );
      } else {
        // File exists
        fs.unlink(
          path.join(__dirname, `../public/uploads/${file.name}`),
          async err => {
            if (err) {
              console.error(err);
              return next(new ErrorResponse(`Problem with file upload`, 500));
            }
          }
        );
      }
    }
  );

  // Compress Image and Upload
  await tinify
    .fromBuffer(file.data)
    .resize({
      method: "fit",
      width: 600,
      height: 700
    })
    .toFile(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      await model.findByIdAndUpdate(req.params.id, {
        photo: [...resource.photo, file.name]
      });

      res.status(200).json({ success: true, data: file.name });
    });
};

module.exports = fileUpload;
