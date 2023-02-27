const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({ 
  cloud_name: 'dm4rue7fk', 
  api_key: '882889117265694', 
  api_secret: 'G06uyjrw0LUjpFvQext2l9fe78Q' 
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: cloudStorage });

const generateUrl = (req, res, next) => {
  const imageUrl = `http://localhost:8080/${req.file.filename}`
  req.body.imageUrl = imageUrl;
  next();
}


module.exports = {upload, generateUrl}
  