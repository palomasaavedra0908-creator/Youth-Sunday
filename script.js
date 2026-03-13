let versiculos=[

"Porque donde están dos o tres reunidos en mi nombre, allí estoy yo en medio de ellos. – Mateo 18:20",

"Todo lo puedo en Aquel que me fortalece. – Filipenses 4:13",

"Confía en el Señor con todo tu corazón. – Proverbios 3:5",

"El Señor es mi pastor; nada me faltará. – Salmos 23:1",

"Sean fuertes y valientes. – Josué 1:9"

];

function versiculoAleatorio(){

let random=Math.floor(Math.random()*versiculos.length);

document.getElementById("verse").innerText=versiculos[random];

}

versiculoAleatorio();



function agregarNombre(){

let nombre=document.getElementById("nuevoNombre").value.trim();

if(nombre===""){

alert("Escribe tu nombre");
return;

}

let nombres=JSON.parse(localStorage.getItem("listaServidores")) || [];

if(nombres.includes(nombre)){

alert("Ese nombre ya está en la lista");

return;

}

nombres.push(nombre);

localStorage.setItem("listaServidores",JSON.stringify(nombres));

document.getElementById("nuevoNombre").value="";

cargarLista();

}

document.getElementById("nuevoNombre").value="";

cargarLista();





function cargarLista(){

let select=document.getElementById("name");

select.innerHTML='<option value="">Selecciona tu nombre</option>';

let nombres=JSON.parse(localStorage.getItem("listaServidores")) || [];

nombres.sort();

nombres.forEach(nombre=>{

let option=document.createElement("option");

option.textContent=nombre;

option.value=nombre;

select.appendChild(option);

});

}



function registrar(){

let nombre=document.getElementById("name").value;

if(nombre===""){

alert("Selecciona tu nombre");

return;

}

localStorage.setItem("nombreServidor",nombre);

mostrarConfirmacion();

}



function mostrarConfirmacion(){

let nombre=localStorage.getItem("nombreServidor");

if(nombre){

document.getElementById("registro").style.display="none";

document.getElementById("registroNuevo").style.display="none";

document.getElementById("confirmacion").style.display="block";

document.getElementById("saludo").innerText="Hola "+nombre;

}

}



function confirmar(tipo){

let nombre=localStorage.getItem("nombreServidor");

localStorage.setItem("confirmacion_"+nombre,tipo);

actualizarContador();

if(tipo==="asisto"){

window.location.href="confirmacion.html";

}else{

window.location.href="confirmacion_no.html";

}

}





function cambiarNombre(){

localStorage.removeItem("nombreServidor");

location.reload();

}



cargarLista();
mostrarConfirmacion();
actualizarContador();
function actualizarContador(){

let nombres = JSON.parse(localStorage.getItem("listaServidores")) || [];

let asisten = 0;
let noAsisten = 0;

nombres.forEach(nombre=>{

let estado = localStorage.getItem("confirmacion_"+nombre);

if(estado==="asisto"){

asisten++;

}

if(estado==="no"){

noAsisten++;

}

});

let pendientes = nombres.length - (asisten + noAsisten);

document.getElementById("asisten").innerText = "Asisten: "+asisten;

document.getElementById("noAsisten").innerText = "No asisten: "+noAsisten;

document.getElementById("pendientes").innerText = "Pendientes: "+pendientes;

}
function abrirPanelLider(){

let codigo = prompt("Código del líder");

if(codigo === "7777"){

document.getElementById("panelLider").style.display="block";

actualizarPanel();

}else{

alert("Código incorrecto");

}

}
function actualizarPanel(){

db.ref("confirmaciones").once("value",(snapshot)=>{

let asisten = 0;
let noAsisten = 0;

snapshot.forEach((child)=>{

let estado = child.val().estado;

if(estado === "asisto"){

asisten++;

}else{

noAsisten++;

}

});

document.getElementById("totalAsisten").innerText = "Asisten: "+asisten;

document.getElementById("totalNoAsisten").innerText = "No asisten: "+noAsisten;

});

}
function reiniciarConfirmaciones(){

db.ref("confirmaciones").remove();

alert("Asistencias reiniciadas");

location.reload();

}
function cargarAsistentes(){

let lista = document.getElementById("listaAsistentes");

lista.innerHTML="";

db.ref("confirmaciones").once("value",(snapshot)=>{

snapshot.forEach((child)=>{

let datos = child.val();

if(datos.estado==="asisto"){

let li = document.createElement("li");

li.textContent = datos.nombre;

li.className="servidor";

li.draggable=true;

li.id="srv_"+datos.nombre;

li.ondragstart=arrastrar;

lista.appendChild(li);

}

});

});

}
function arrastrar(ev){

ev.dataTransfer.setData("text", ev.target.id);

}

function permitirSoltar(ev){

ev.preventDefault();

}

function soltar(ev){

ev.preventDefault();

let data = ev.dataTransfer.getData("text");

let elemento = document.getElementById(data);

ev.target.appendChild(elemento);

let nombre = elemento.textContent;

let rol = ev.target.dataset.rol;

guardarRol(nombre,rol);

}
function arrastrar(ev){

ev.dataTransfer.setData("text", ev.target.id);

}

function permitirSoltar(ev){

ev.preventDefault();

}

function soltar(ev){

ev.preventDefault();

let data = ev.dataTransfer.getData("text");

let elemento = document.getElementById(data);

ev.target.appendChild(elemento);

let nombre = elemento.textContent;

let rol = ev.target.dataset.rol;

guardarRol(nombre,rol);

}
function escucharRol(){

let nombre = localStorage.getItem("nombreServidor");

db.ref("roles/"+nombre).on("value",(snapshot)=>{

let datos = snapshot.val();

if(datos){

alert("Hola "+datos.nombre+
"\n\nTu líder te asignó el área de:\n\n"+datos.rol);

}

});

}

escucharRol();