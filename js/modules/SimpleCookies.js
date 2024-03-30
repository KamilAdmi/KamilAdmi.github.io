// Библиотека для упрощения работы с Cookies

function readCookie(key, refresh = true) { // Чтение значения в cookie по ключу, принимает флаг обовлять или нет куку
	let value = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)')); // Получаем значение по регулярному выражению
	if(value) { // Если что-то поймали...
		if(refresh) writeCookie(key, value[2]); // То, если флаг обовления задан, обновляем куку
		return value[2]; // И возващаем значение
	}
}

function writeCookie(key, value, maxAge = 10/*2592000*/) { // Принимает ключ, значение, срок годности (Месяц по умолчанию)
	document.cookie = `${key}=${value};max-age=${maxAge}`;
}

function deleteCookie(key) { // Принимает ключ
	document.cookie = `${key}=;max-age=-1`;
}