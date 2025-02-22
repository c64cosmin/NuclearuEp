import App from "./app.svelte";
import { mount } from "svelte";

type plm = {x:number,y:number};
let x:plm = {x:1,y:1};
console.log("spoj x", x);

mount(App, { target: document.body });
