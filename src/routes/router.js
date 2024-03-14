const router = require("express").Router()
const control = require("../controllers/controller")
const upload = require('../controllers/multer')
const mid = require("../middlewares/jwt")


// Validação de login

router.post("/login", control.loginUser)




router.post("/createUser", upload.single("file"), control.createUser) // Criação de um novo "Usuário"

router.post("/createAct", upload.single("file"), control.createAct) //Criação de uma nova "Atividade"




// Atualizada atividades

router.post("/updateActivity", mid.verifyToken, control.updateActivity)




// Busca dados

router.post("/getUser", mid.verifyToken, control.getUser)

router.post("/getAllUsers", mid.verifyToken, control.getAllUsers)

router.post("/getAllActivity", mid.verifyToken, control.getAllActivity)



// Redirecionamento de página










module.exports = router