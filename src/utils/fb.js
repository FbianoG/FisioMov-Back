const { storage } = require("../../firebase")
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage")
require("dotenv").config()

async function uploadImage(photo, userEmail) {

    if (photo.mimetype !== 'image/jpeg' && photo.mimetype !== 'image/png' && photo.mimetype !== 'image/jpg') throw new Error('Somente arquivos "Png" e "Jpg" são permitidos.')
    if (photo.size > 4 * 1024 * 1024) throw new Error('Máximo de 4mb por arquivo.')
    try {
        const auth = getAuth()
        const user = await signInWithEmailAndPassword(auth, process.env.EMAIL, process.env.PASSWORD)
        const storageRef = ref(storage, `fisioMov/${(new Date().getTime())}.webp`) // pode mudar o valor do arquivo
        const snapshot = await uploadBytes(storageRef, photo.buffer)
        const downloadURL = await getDownloadURL(snapshot.ref) // cria o link do arquivo para visualizar
        return downloadURL
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = { uploadImage }