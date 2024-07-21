const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rounds de salt - quanto maior, mais seguro, mas também mais lento.

// Exemplo de função para criar um hash de senha
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds); // aleatoriza mais ainda os "salt"
        const hash = await bcrypt.hash(password, salt); // cria o hash - (senhaDigitada, salt)
        return hash;
    } catch (error) {
        throw error;
    }
}

// Exemplo de função para verificar uma senha
async function comparePassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword); // compara a senha (senhaDigitada, senhaNoDataBase)
        return match;
    } catch (error) {
        throw error;
    }
}


module.exports = { comparePassword, hashPassword }