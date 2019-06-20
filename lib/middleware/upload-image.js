const uploadImage = require('../service/cloudinary');
const shortId = require('shortid');

module.exports = async (req, res, next) => {
  const path = req.url.slice(1);
  const pattern = /^data:image\//;
  const images = Object.entries(req.body).filter(([, value]) => pattern.test(value) && value.length > 50);
  if(images.length) {
    await Promise.all(images.map(async ([key, value]) => {
      const { secure_url } = await uploadImage(value, `${path}/${key}/${shortId.generate()}`);
      req.body[key] = secure_url;
    }));
  }
  next();
};
