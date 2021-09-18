const fs = require('fs');
// add multer to manage multipart form
const multer = require('multer');

// storage management for the file
// that will be uploaded
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destPath = './Images/';
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
    cb(null, destPath);
  },
  filename(req, file, callback) {
    const parts = file.originalname.split('.');
    const extension = parts[parts.length - 1];
    let fileName = `${file.fieldname}-${Date.now()}`;
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') fileName += `.${extension}`;

    callback(null, fileName);
  },
});

// management of the storage and the file that will be uploaded
// .single expects the name of the file input field
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
module.exports = upload;
