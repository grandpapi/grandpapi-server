require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

module.exports = (dataUrl, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUrl,
      { public_id: path },
      (error, result) => {
        if(error) reject(error);
        resolve(result);
      }
    );
  });
};
