const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public/uploads/") // diretório parte do root até à pasta alvo (tem que criar a pasta antes para funcionar)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 3MB em bytes
    }
});



module.exports = upload