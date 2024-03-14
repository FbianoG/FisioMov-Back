/* eslint-disable no-undef */
let accessForm = document.querySelectorAll(".accessForm")[0]
let btnAccessBar = document.querySelectorAll("button")[0]
let btnRegisterBar = document.querySelectorAll("button")[1]
let btnHiddenForm = accessForm.querySelectorAll(".btnHidden")[0]


btnAccessBar.addEventListener("click", showAcessForm)
btnHiddenForm.addEventListener("click", hiddenAcessForm)
btnRegisterBar.addEventListener("click", () => window.location.href = "/register")



function showAcessForm() {
	accessForm.style.top = "70px"
}

function hiddenAcessForm() {
	accessForm.style.transition = "350ms"
	accessForm.style.top = "-320px"
}


const urlParams = new URLSearchParams(window.location.search)
if (urlParams.size > 0) {
	const error = urlParams.get('error')
	document.querySelectorAll('.accessForm input').forEach(element => {
		element.style.borderColor = "#f47979"
		element.placeholder = "Inválido"
	})
	document.querySelectorAll('.accessForm')[0].style.top = "70px"
}

