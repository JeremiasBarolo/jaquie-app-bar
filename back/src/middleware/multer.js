const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "_" + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: El archivo debe ser una imagen válida');
    }
});

const uploadProduct = upload.single('image');
const uploadCombo = upload.array('images', 12);

module.exports = { uploadProduct, uploadCombo };