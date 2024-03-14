const express = require("express")
const app = express()
const DataBase = require("./src/database/db")
const router = require("./src/routes/router")
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))
app.use(router)



DataBase.connectDataBase()

app.listen(port, () => {
	console.log("Servidor funcionando na porta:", port)
})
