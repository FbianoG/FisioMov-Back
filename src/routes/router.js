const router = require("express").Router()
const control = require("../controllers/controller")
const mid = require("../middlewares/jwt")

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Validação de login

router.post("/login", control.loginUser)




router.post("/createUser", upload.single('src'), control.createUser) // Criação de um novo "Usuário"

router.post("/createAct", mid.verifyToken, control.createAct) //Criação de uma nova "Atividade"

router.post("/deleteAct", mid.verifyToken, control.deleteAct) //Exclusão de uma "Atividade"




// Atualizada atividades

router.post("/updateActivity", mid.verifyToken, control.updateActivity)


router.post("/sendActivity", mid.verifyToken, control.sendActivity)

router.post("/deleteActivity", mid.verifyToken, control.deleteActivity)




// Busca dados

router.post("/getUser", mid.verifyToken, control.getUser)

router.post("/getAllUsers", mid.verifyToken, control.getAllUsers)

router.post("/getAllActivity", mid.verifyToken, control.getAllActivity)



// Redirecionamento de página










module.exports = router