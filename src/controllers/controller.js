const { PacientModel, ActivityModel } = require("../models/model")
const mid = require('../middlewares/jwt')




async function createUser(req, res) { // Cria um novo usuário
	let { name, email, password, nasc, tel } = req.body
	const file = req.file
	console.log(file)
	if (name && email && password && nasc) {
		try {
			name = name.toLowerCase()
			email = email.toLowerCase()
			let newClient = await PacientModel.create({ name, email, password, nasc, tel, menssage: "", isPacient: true, higher: undefined, lower: undefined, src: file.filename })
			res.status(201).redirect("/")
		} catch (error) {
			console.log({ message: "Erro ao criar cadastro", error })
			res.status(500).json({ error: error })
		}
	} else {
		console.log("Preencha todos os campos!")
		res.status(400).json({ message: "Preencha todos os campos!" })
	}
}

async function createAct(req, res) { // Cria uma nova atividade
	let { name, web, category } = req.body
	console.log(req.file)
	const src = req.file
	if (!name || !web || !category || !src) {
		return res.status(401).json({ message: "Preencha todos os campos!" })
	}
	try {
		name = name.toLowerCase()
		let newAct = await ActivityModel.create({ name, web, category, src: src.filename })
		res.status(201).json({ message: "Atividade criada com sucesso!", newAct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Algum erro foi encontrado!" })
	}

}

async function loginUser(req, res) { // Validação de login
	let { email, password } = req.body
	try {
		if (!email || !password) {
			return res.status(400).json({ auth: false, message: "Preencha todos os campos." })
		}
		email.toLowerCase()
		let user = await PacientModel.findOne({ email })
		if (!user || password != user.password) {
			return res.status(400).json({ auth: false, message: "Usuário ou senha inválidos." })
		}
		const token = await mid.createToken(user._id)
		return res.status(200).json({ auth: true, patient: user.isPacient, message: "Logado com sucesso.", token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 500, error: "Erro interno de servidor." })
	}
}

async function getUser(req, res) {
	const user = await PacientModel.findById({ _id: req.userId }, "-password")
	res.status(200).json({ status: 200, auth: true, user }) //  req.userId vem do token codificado 
}

async function getAllUsers(req, res) { // Busca todos os "Usuários" no "DataBase"
	try {
		const user = await PacientModel.findById({ _id: req.userId })
		if (user.isPacient) {
			return res.status(401).json({ auth: false, message: "Acesso não permitido." })
		}
		let allPatients = await PacientModel.find({ isPacient: true, }, "-password")
		return res.status(200).json({ status: 200, auth: true, allPatients })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
	}
}

async function getAllActivity(req, res) { // Busca todas as "Atividades" no "DataBase"
	try {
		let allAct = await ActivityModel.find({})
		if (allAct.length == 0) {
			console.log({ status: 204, menssage: "Não possui atividades cadastradas no DataBase!" })
			return res.status(204).end()
		}
		res.status(200).json({ status: 200, allAct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, menssage: "Ocorreu algum erro!", error })
	}
}

async function updateActivity(req, res) { // Atualiza e envia ao usuário as atividades
	let { patientId, activity } = req.body

	// console.log(activity)
	try {

		const patient = await PacientModel.findById(patientId).select('proced')
		const newProceds = patient.proced.map(element => {
			if (element.id === activity.id) return activity
			return element
		})
		await PacientModel.findByIdAndUpdate(patientId, { proced: newProceds })
		return res.status(201).json({ message: 'Atividade enviada com sucesso!' })

	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Erro interno de servidor!' })
	}
}

async function sendActivity(req, res) { //  Envia ao usuário as atividades
	let { patientId, activity } = req.body
	try {
		const patient = await PacientModel.findById(patientId).select('proced')
		if (patient.proced.some(element => element.id === activity.id)) {
			await PacientModel.updateOne({ _id: patientId, 'proced.id': activity.id }, { $set: { 'proced.$': activity } });
			return res.status(201).json({ message: 'Atividade enviada com sucesso!' });
		}
		await PacientModel.findByIdAndUpdate(patientId, { $push: { 'proced': activity } })
		return res.status(201).json({ message: 'Atividade enviada com sucesso!' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Erro interno de servidor!' })
	}
}

async function deleteActivity(req, res) { //  Envia ao usuário as atividades
	let { patientId, actId } = req.body
	try {
		const deleteAct = await PacientModel.findByIdAndUpdate({ _id: patientId }, { $pull: { 'proced': { id: actId } } })
		if (!deleteAct) return res.status(400).json({ message: 'Atividade não localizada.' })
		return res.status(201).json({ message: 'Atividade excluída com sucesso!' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Erro interno de servidor!' })
	}
}


module.exports = { loginUser, createUser, createAct, sendActivity, updateActivity, deleteActivity, getUser, getAllUsers, getAllActivity, }