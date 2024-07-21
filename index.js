const express = require("express")
const app = express()
const DataBase = require("./src/database/db.js")
const router = require("./src/routes/router.js")
const cors = require('cors')

require('dotenv').config()


const corsOptions = {
	origin: 'https://fisiomov.vercel.app'
}

// const corsOptions = {
// 	origin: 'http://127.0.0.1:5500'
// }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))
app.use(router)



DataBase.connectDataBase()

app.listen(process.env.PORT, () => {
	console.log("Servidor funcionando na porta:", process.env.PORT)
})
