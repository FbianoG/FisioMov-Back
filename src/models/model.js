const mongoose = require("mongoose")


const Pacient = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: false, },
	nasc: { type: Date, },
	tel: String,
	isPacient: Boolean,
	message: String,
	src: String,
	hg: Array,
	rpth: Array,
	serh: Array,
	lw: Array,
	rptl: Array,
	serl: Array,
	by: String
})

const Activity = new mongoose.Schema({
	name: { type: String, unique: true },
	category: String,
	web: String,
	src: { type: String, unique: true }
})




const PacientModel = mongoose.model("User", Pacient)

const ActivityModel = mongoose.model("Activity", Activity)




module.exports = {
	PacientModel,
	ActivityModel,
}