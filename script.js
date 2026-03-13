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