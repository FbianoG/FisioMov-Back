// Variáveis

let userData
let activityList = document.querySelectorAll(".listActivity")
let access = document.querySelectorAll('.access')[0]
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get("id")
let btnHiddenAccess = document.querySelector('#btcHiddenAccess')




btnHiddenAccess.addEventListener('click', hiddenAccess)






// Funções

async function getUser() { // GET dados do "Usuário"
	localStorage.setItem("token", token)
	const user = await fetch(`/getUser?id=${token}`)
	const data = await user.json()
	loadingData(data.user)
}

async function loadingData(e) { // Gera HTML da página com os dados do "Usuário"
	let getAct = await fetch(`/getAllActivity?id=${token}`)
	if (getAct.status === 204) {
		return console.log({ status: 204, menssage: "DataBase não possui atividades cadastradas!" })
	}
	let data = await getAct.json()
	let allActivity = data.allAct
	document.querySelectorAll('.content h1')[0].textContent = `Bem vindo, ${e.name.split(" ").slice(0, 2).join(" ")}`
	document.querySelectorAll('.perfilHeader img')[0].src = `../uploads/${e.src}`
	createActivity(allActivity, e)
}

function createActivity(atividadeApi, userData) { // Cria e filtra as atividades que foram enviadas ao "Usuário" 
	activityList[0].innerHTML = ""
	let listHg = document.querySelectorAll(".higher")[0]
	let listLw = document.querySelectorAll(".lower")[0]
	for (let i = 0; i < userData.hg.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.hg[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rpth[i], userData.serh[i], userData)
				listHg.appendChild(newActivity)
			}
		});
	}
	for (let i = 0; i < userData.lw.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.lw[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rptl[i], userData.serl[i], userData)
				listLw.appendChild(newActivity)
			}
		});
	}
}

function createActivityHtml(e, rpt, ser, userData) { // Cria o HTML de cada atividade 
	const html = `
        <div class="cardData">
            <span style="display:none;">${e._id}</span>
			<img src="../uploads/${e.src}" alt="foto da atividade" class="actImg">
			<div>
				<h4>${e.name}</h4>
				<label>${rpt} - repetições</label>
				<br>
				<label>${ser} - séries</label>
				<br>
				<label style="font-size: 11px;">Enviado por: ${userData.by}</label>
			</div>
        </div>
        <div class="statusActivity">
			<a href="/activity?act=${e.web}&id=${token}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" id="acessActivityBtn"></i></a>
            <p>Acessar Atividade</p>
        </div>
    `
	return html
}

function hiddenAccess() {
	access.style.right = "-350px"
}

function showAccess() {
	access.style.transition = "300ms"
	access.style.right = "30px"
}



// Chamadas

setTimeout(showAccess, 3000)

getUser()  // GET dados do "Usuário"