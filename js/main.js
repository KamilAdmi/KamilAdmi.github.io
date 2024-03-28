import {DynamicBox} from "../../MyPlugins/DynamicBox.js"
import {Get} from "../../MyPlugins/EasyFetch.js"

let Main = new DynamicBox(document.querySelector("main"));

Main.Replace(await Get("Pages/LangSelect.html"));
