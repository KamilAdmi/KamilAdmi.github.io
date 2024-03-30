const box = new dynamicBox(document.querySelector("main"));

setup();

function setup() {
	if(!readCookie("lang")) getText("pages/selectLang.html").then((html) => box.replace(html));
	else if (!readCookie("mode")) getText("pages/selectMode.html").then((html) => box.moveLeft(html));
	else main();
}

function main() {
	alert(document.cookie);
	box.moveUp("<h1>Пока всё :)</h1>");
}