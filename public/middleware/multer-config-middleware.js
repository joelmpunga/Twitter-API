const multer = require('multer');
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png',
}
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images');
    },
    filename: (req, file, callback) => {
        const name = file;
        const ext = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + ext);
    }
});
const fileFilter = (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
        callback(null, true);
    } else {
        callback(new Error('Type de fichier non valide'), false);
    }
};

module.exports = multer({ storage: storage }).single('image');