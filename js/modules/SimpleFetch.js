// Библиотека для упрощения получения данных с сервера

async function getText(url) { // Как текст
	return await fetch(url).then(resp => resp.text());
}

async function getJson(url) { // Как объект
	return await fetch(url).then(resp => resp.json());
}