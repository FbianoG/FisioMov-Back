const mongoose = require("mongoose")

const Pacient = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, },
	nasc: { type: Date, required: true },
	src: String,
	isPatient: Boolean,
	proced: Array,
	message: String,
})

const Activity = new mongoose.Schema({
	name: { type: String, unique: true },
	category: String,
	web: String,
	src: String,
})

const PacientModel = mongoose.model("User", Pacient)
const ActivityModel = mongoose.model("Activity", Activity)

module.exports = { PacientModel, ActivityModel, }