// Модуль для облегчения создания и управления "умными" контейнерами

// Главный экспортируемый класс
class dynamicBox { // Экспортируем класс для работы с контейнерами
	// [Конструктор, вызывается только при создании объекта]
	constructor(base) { // Принимает сам элемент контейнера
		// Если у базы position по умолчанию, меняем, чтоб все работало
		if(getComputedStyle(base).position == "static") base.style.position = "relative";

		base.style.overflow = "hidden"; // Скроем лишнее вылазящее содержимое базы

		[base.innerHTML, this.box] = ["", this.#makeBox(base.innerHTML)]; // Очистим нашу базу и создадим первый динамичный контейнер
		base.appendChild(this.box); // Закидываем контейнер в пустую базу
	}


	// Главная функция переходов
	transform(html, startNewStyles, endOldStyles, duration = 0.8) { // Принимает новый html, стили для подготовки элементов и время преобразования
		let box = this.#makeBox(html); // Для начала создадим новый блок
		this.box.before(box); // Вставим его до старого

		for(let style in startNewStyles) { // И применим  к нему стили подготовки
			box.style[style] = startNewStyles[style];
		}
		
		box.style.transition = `${duration}s`; // И новому и старому зададим время перехода
		this.box.style.transition = `${duration}s`;

		box.offsetHeight; // Хак из прошлой версии))) Чтобы браузер остановился и призадумался. Без этого transition не применится.

		for(let style in endOldStyles) { // Зададим стили ухода старого контейнера
			this.box.style[style] = endOldStyles[style];
		}
		for(let style in startNewStyles) { // Новому же всё удалим, чтобы он тихонько нормализовался
			box.style.removeProperty(style);
		}

		box.addEventListener("transitionend", () => { // После завершения анимации...
			box.style.removeProperty("transition"); // Новому удаляем transition
			this.box.remove(); // Старый совсем удаляем
			this.box = box; // Передаём жезл новому
		}, {once : true}); // Укажем, что событие одиночное, оно автосатически удалится
	}

	// [Готовые анимации переходов]
	// Замена
	replace(html, duration) {
		this.transform(html, {opacity: 0}, {opacity: 0}, duration);
	}

	// Уезжаем вверх
	moveUp(html, duration) {
		this.transform(html, {translate: "0% 100%"}, {translate: "0% -100%"}, duration);
	}

	// Уезжаем вниз
	moveDown(html, duration) {
		this.transform(html, {translate: "0% -100%"}, {translate: "0% 100%"}, duration);
	}

	// Уезжаем вправо
	moveRight(html, duration) {
		this.transform(html, {translate: "-100% 0%"}, {translate: "100% 0%"}, duration);
	}

	// Уезжаем влево
	moveLeft(html, duration) {
		this.transform(html, {translate: "100% 0%"}, {translate: "-100% 0%"}, duration);
	}


	// Приватная функция создания динамичного контейнера
	#makeBox(html) { // Принимает html код
		let box = document.createElement("section"); // Создаём котейнер
		box.appendChild(document.createRange().createContextualFragment(html)); // И закидываем в него преобразованный в DOM элементы код
		box.style = "height:100%;width:100%;position:absolute;" // Задаём главные стили
		return box; // Возвращаем наш контейнер
	}
}