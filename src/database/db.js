const mongoose = require("mongoose")
require("dotenv").config()

const url = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.p2xagpb.mongodb.net/?retryWrites=true&w=majority`

async function connectDataBase() {
	try {
		await mongoose.connect(url)
		console.log("Conectado ao DataBase")
	} catch (error) {
		console.log("Erro ao conectar o DataBase")
	}
}

module.exports = {
	connectDataBase,
}