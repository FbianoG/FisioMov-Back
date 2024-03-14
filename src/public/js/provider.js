// Variáveis
let userData, allPacients
let pacientList = document.querySelectorAll('.pacientList')[0]
let dataAtual = new Date()
let pacientActivity = document.querySelectorAll('.pacientList')[0]


const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('id')



// Eventos


pacientActivity.addEventListener('click', activeAct)




// Funções

async function getUser() { // Get dos dados do usuário
    localStorage.setItem('token', token)
    const user = await fetch(`/getUser?id=${token}`)
    const data = await user.json()
    userData = data.user
}

async function getPacients() { // Get dos dados de todos os pacientes cadastrados
    const token = localStorage.getItem('token')
    const user = await fetch(`/getAllUsers?id=${token}`)
    const data = await user.json()
    // console.log(data)
    allPacients = data.allPacients.sort((a, b) => { // Ordena por ordem alfabética
        return a.name.localeCompare(b.name)
    })
    createCards(allPacients)  // Cria card de cada paciente cadastrado
}

function createCards(e) { // Cria card de cada paciente cadastrado
    pacientList.innerHTML = ''
    e.forEach(element => {
        let newPacient = document.createElement('div')
        newPacient.classList = 'pacientCard'
        newPacient.innerHTML = pacientCardHtml(element) // Cria HTML do card do paciente
        pacientList.appendChild(newPacient)
    })
    createActivity()
}

function pacientCardHtml(e) { // Cria HTML do card do paciente
    const html = `
    <form action="/updateActivity?id=${token}" method="post" class="pacientCardForm">
        <div class="pacientData">
            <input name="_id" style="display: none;" value="${e._id}"></input>
            <input name="by" style="display: none;" value="${userData.name}"></input>
            <h4 >${e.name}</h4>
            <span>${dataAtual.getFullYear() - Number(e.nasc.slice(0, 4))} anos</span>
            <span>${e.email}</span>
            <span>${e.tel}</span>
        </div>
        <div class="pacientActivity">
            <div class="activityMember">
                <h4>Superiores</h4>
                <ul class="activityList higher">
                </ul>
            </div>
            <div class="activityMember">
                <h4>Inferiores</h4>
                <ul class="activityList lower">
                </ul>
            </div>
            <div class="pacienteHistoric">
                <textarea name="menssage" placeholder="Enviar mensagem..."></textarea>
                <input type="submit" class="btnSubmit" value="Enviar Atividades">
            </div>
        </div>
    </form>
    `
    return html
}

async function createActivity() { // Cria HTML do "input" de cada atividade cadastrada pelo "DataBase"
    let getAct = await fetch(`/getAllActivity?id=${token}`)  // Get de dados de todos as atividades cadastrados
    let data = await getAct.json()
    let ulHg = document.querySelectorAll('.higher')
    let ulLw = document.querySelectorAll('.lower')
    ulHg.forEach(e => {
        data.allAct.forEach(element => {
            if (element.category == 'lw') {
                return
            }
            let newAct = document.createElement('li')
            newAct.innerHTML = `
        <input type="checkbox" value="${element._id}" id="name" name="${element.category}">
        <label>${element.name}</label>
        <input type="number" placeholder="Repetições" class="number" name="rpth" disabled required>
        <input type="number" placeholder="Séries" class="number" name="serh" disabled required>
        `
            // document.querySelectorAll('.higher')[0].appendChild(newAct)
            e.appendChild(newAct)
        });
    });

    ulLw.forEach(e => {
        data.allAct.forEach(element => {
            if (element.category == 'hg') {
                return
            }
            let newAct = document.createElement('li')
            newAct.innerHTML = `
            <input type="checkbox" value="${element._id}" id="name" name="${element.category}">
            <label>${element.name}</label>
            <input type="number" placeholder="Repetições" class="number" name="rptl" disabled required>
            <input type="number" placeholder="Séries" class="number" name="serl" disabled required>`
            // document.querySelectorAll('.higher')[0].appendChild(newAct)
            e.appendChild(newAct)
        });
    });
}

function activeAct(e) { // Habilita ou Desabilita "input das series e repetições" ao selecionar atividade
    if (e.target.name == "hg" || e.target.name == "lw") {
        let target = e.target.parentElement
        if (e.target.checked == true) {
            target.querySelectorAll('input[type="number"]').forEach(element => {
                element.removeAttribute("disabled")
            })
        } else {
            target.querySelectorAll('input[type="number"]').forEach(element => {
                element.setAttribute("disabled", "true")
            });
        }
    }

}




// Chamadas

getUser() // Get dos dados do usuário

getPacients() // Get dos dados de todos os pacientes cadastrados














