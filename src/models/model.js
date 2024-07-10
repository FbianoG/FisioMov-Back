const mongoose = require("mongoose")
const { array } = require("../controllers/multer")


const Pacient = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, },
	nasc: { type: Date, required: true },
	src: String,
	isPacient: Boolean,
	proced: Array,
	message: String,
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