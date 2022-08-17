 //Datos iniciales
 document.getElementById("resultConsulta").innerText = "Si no estás registrado, presiona el botón debajo";
//Cargo fecha

let fecha = new Date().toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
//fecha = fecha.toDateString();
console.log(fecha);
document.getElementById("fecha").innerHTML = fecha.toUpperCase();

//CARGO CLIMA


import { getdata } from "./Timer.js";
//console.log(await getdata(-34.6,-58.3));

let clima = await getdata(-34.6,-58.3);
if(clima != ""){console.log(clima);
document.getElementById("clima").innerHTML = `BUENOS AIRES <p>T°MAX: ${clima[2]}°C <p> T°MIN: ${clima[1]} °C`;
}
class cliente {
    constructor(clienteIn, ventasIn, comprasIn, saldoFavorIn, saldoContraIn, tipoIVAIn, cuit) {
        this.cliente  = clienteIn;
        this.ventas  = ventasIn;
        this.compras = comprasIn;
        this.saldoFavor = saldoFavorIn;
        this.saldoContra = saldoContraIn;
        this.tipoIVA = tipoIVAIn;
        this.CUIT = cuit;
    }
    calculoIVA() {
        this.IVA = (this.ventas-this.compras)*0.01*this.tipoIVA-this.saldoFavor+this.saldoContra;
    alert(this.cliente+" tiene como resultado de IVA a pagar( o a favor de ser negativo): "+this.IVA);
    }
}

class datosPersonales {
    constructor(nombre, apellido, email, cuit) {
        this.nombre  = nombre;
        this.apellido  = apellido;
        this.email = email;
        this.cuit = cuit;
        this.cliente = nombre +" "+apellido;
        


    }
    mostrar() {
        let Datos = `Nombre: ${this.nombre} \n Apellido: ${this.apellido}\n Email: ${this.email}\nCUIT: ${this.cuit}`; 
        return Datos;
    }
}

//Almacenamiento al cierre de sesión en el Storage


function GuardarDatosPersonales(){
    localStorage.setItem("datosPersonalesdb",JSON.stringify(datosPersonalesdb));
    
    }
    
    //Lectura al inicio de sesión
    
function LeerDatosPersonales(){
    if(JSON.parse(localStorage.getItem("datosPersonalesdb")) != null){
    console.log("Se cargó DB Personales")
        datosPersonalesdb = JSON.parse(localStorage.getItem("datosPersonalesdb"))
    
    }
    }

//Generación de base de datos para los datos de los saldos de cada cliente

let clientes = [];
// clientes = [
//     {nombre: "Amalia Gomez",ventas: 12000, compras: 4000, saldoFavor: 0, saldoContra: 0, tipoIVA: 21},
//     {nombre: "Juana Traglia",ventas: 210000, compras: 21000, saldoFavor: 10000, saldoContra: 0, tipoIVA: 10.5},
//     {nombre: "Denis Vico",ventas: 98000, compras: 40000, saldoFavor: 0, saldoContra: 200, tipoIVA: 20},
// ];

clientes.push(new cliente("Amalia Gomez",12000,4000,0,0,21,20121212235));
clientes.push(new cliente("Juana Traglia",21000,12000,2000,0,21,12345678912));
clientes.push(new cliente("Denis Vico",12000,4000,0,100,10.5,21234343544));

//Generacion de base de datos de clientes

let datosPersonalesdb = [];

datosPersonalesdb.push(new datosPersonales("Amalia", "Gomez","ag@hotmail.com",20121212235));
datosPersonalesdb.push(new datosPersonales("Juana", "Traglia","jt@hotmail.com",12345678912));
datosPersonalesdb.push(new datosPersonales("Denis", "Vico","dv@hotmail.com",21234343544));



//Registro Usuarios

function registroUsuario(){
const nombre = document.getElementById("primerNombre").value;
const apellido = document.getElementById("apellido").value;
const email = document.getElementById("email").value;
const cuit = document.getElementById("cuit").value;

if(nombre != "" && apellido != "" && email != "" && cuit != ""){

datosPersonalesdb.push(new datosPersonales(nombre,apellido,email,cuit));

document.getElementById("resultUser").value ="Usuario registrado correctamente!";

Swal.fire({
    icon: 'success',
    title: 'Hecho!',
    text: 'Usuario registrado correctamente'
  })

}

else
{
    document.getElementById("resultUser").value ="Falta completar datos";
    

Toastify({
  text: "Falta completar datos",
  duration: 2500,
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "centert", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #ff1a00, #ff8300)",
  },
  onClick: function(){} // Callback after click
}).showToast();
}

}


const formRegistro = document.getElementById("formRegistro");
formRegistro.addEventListener("submit", (e) => {
e.preventDefault();


registroUsuario();

})


 
LeerDatosPersonales(); 

  

//// Disparadores cálculos de IVA

const formIVA = document.getElementById("formIVA");

formIVA.addEventListener("submit", (e) => {
e.preventDefault();

calculoIVAform();


})

const tipoIVAreg = document.getElementById("tipoIVAIn");

tipoIVAreg.addEventListener("keyup", (e) => {
e.preventDefault();
let keycode = e.keyCode || e.which;
if(keycode == 13){
    alert("ENTER");
calculoIVAform();
}

})

//Logueo y estilos

const consultaUsuario = document.getElementById("consultaUsuario");

consultaUsuario.addEventListener("submit", (e) => {
e.preventDefault();

consultarUsuario();


})
let CUITActual = undefined;
let usuarioActual;




function consultarUsuario(){
           
//console.log(document.getElementById("nombreCliente").value);
let usuarioBuscado = datosPersonalesdb.find(element => (element.cliente == document.getElementById("nombreCliente").value && element.cuit == document.getElementById("CUITingreso").value) );

//console.log(usuarioBuscado);
if(usuarioBuscado != undefined){
usuarioActual = usuarioBuscado;
CUITActual = usuarioActual.cuit;


Toastify({
    text: `Hola ${usuarioActual.cliente}`,
    duration: 2500,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00ff1e, #00f5ff)",
    },
    onClick: function(){} // Callback after click
  }).showToast();


//console.log(CUITActual);
//console.log(usuarioBuscado);
document.getElementById("resultConsulta").innerText = `Nombre: ${usuarioBuscado.nombre} \n Apellido: ${usuarioBuscado.apellido}\n Email: ${usuarioBuscado.email}\nCUIT: ${usuarioBuscado.cuit}`;
document.getElementById("divRegistroUsuario").style.display = 'none';
document.getElementById("divInicioUsuario").style.display='none';
document.getElementById("botonRegistro").style.display='none';
document.getElementById("botonDesloguear").style.display='block';
document.getElementById("cargaFacturas").style.display='block';


Login();
}

else{
 
   document.getElementById("resultConsulta").innerText = "Cliente no encontrado!";    
}


}


// boton Registro
let botonRegistro = document.querySelector("#abrirRegistro");

botonRegistro.addEventListener("click",() => {

    document.getElementById("divRegistroUsuario").style.display='block';
    //botonRegistro.addEventListener("click", alert("click"));

})

//Botón Desloguear

let bDesloguear = document.querySelector("#desloguear");

bDesloguear.addEventListener("click",() => {
//console.log("Boton desloguear");
    GuardarDatos();
    GuardarDatosPersonales();
    let usuarioActual = "";
    CUITActual = undefined;
    document.getElementById("resultConsulta").innerText = "";
    document.getElementById("botonDesloguear").style.display='none';
    document.getElementById("divInicioUsuario").style.display='';
    //document.getElementById("divInicioUsuario").style.='';
    document.getElementById("botonRegistro").style.display='';
    document.getElementById("cargaFacturas").style.display='none';
    mostradorDeFacturas.innerHTML = "";
    document.getElementById("resultConsulta").innerText = "Si no estás registrado, presiona el botón debajo";
    document.getElementById("CalcularTotal").innerHTML =``;
    document.getElementById("calculoIVA").style.display='none';
})



// Portal de usuario
function Login(){
if (usuarioActual != undefined){
    LeerDatos();    
document.getElementById("calculoIVA").style.display='';
console.log("logueeado");
MostrarFacturas();

}
}
 // Calculo de IVA en formulario

 function calculoIVAform() {

    let clienteIn = usuarioActual.cliente;
    let ventasIn = parseFloat(document.getElementById("ventasIn").value);
    let comprasIn = parseFloat(document.getElementById("comprasIn").value);
    let saldoFavorIn = parseFloat(document.getElementById("saldoFavorIn").value);
    let saldoContraIn = parseFloat(document.getElementById("saldoContraIn").value);
    let tipoIVAIn = parseFloat(document.getElementById("tipoIVAIn").value);
    let CUITIn = usuarioActual.cuit;

    let saldoResult = document.getElementById("resultIVA");

//Validación de datos y muestra de resultados

if(ventasIn >=0 && comprasIn >=0 && saldoFavorIn >=0 && saldoContraIn >=0 && tipoIVAIn >=0 && CUITIn > 10000000000)
{
    let saldo3 = ((ventasIn-comprasIn)*tipoIVAIn*0.01-saldoFavorIn+saldoContraIn);

saldoResult.innerText = saldo3;

clientes.push(new cliente(clienteIn,ventasIn,comprasIn,saldoFavorIn,saldoContraIn,tipoIVAIn, CUITIn));
}

else
{
saldoResult.innerText = "Debe ingresar valores iguales o mayores que cero en todos los campos";
}
 }

 //Carga de facturas

//Inicialización

let facturasdb = []

class factura {
    constructor(CUIT,facturaN,tipoFactura,monto,Observacion){
        this.CUIT=CUIT;
        this.FacturaN=facturaN;
        this.tipoFactura=tipoFactura;
        this.Monto=monto;
        this.Observacion=Observacion;

    }


}

//Carga facturas iniciales

facturasdb.push(new factura(20121212235, "0001", "A", 12005, "Mochila"));
facturasdb.push(new factura(20121212235, "0341", "B", 125, "Lapices"));
facturasdb.push(new factura(20121212235, "0455", "B", 905, "NS/NC"));
facturasdb.push(new factura(20121212235, "0431", "A", "4009", "Auto"));
facturasdb.push(new factura(20121212235, 6601, "A", 5000, "Doctor Pancreas"));





let mostradorDeFacturas = document.getElementById("facturas-cargadas");

function MostrarFacturas () {
facturasdb.forEach(factura =>{
    if(factura.CUIT == CUITActual)
    {
    let div = document.createElement('div')
    div.className = 'factura'
    div.innerHTML = `<div>Factura N°: ${factura.FacturaN} </div>
        <div>Tipo de Factura: ${factura.tipoFactura} </div>
        <div>Monto: $${factura.Monto} </div>
        <div>Observación: ${factura.Observacion} </div>
        <div><button class="btn" id="EliminarFactura${factura.FacturaN}" placeholder="Eliminar factura" style="
        border: 1px solid #00a5f1; /*anchura, estilo y color borde*/
        padding: 5px; /*espacio alrededor texto*/
        background-color: #c6e5f1; /*color botón*/
        color: #303030; /*color texto*/
        font-family: 'Arial', sans-serif; /*tipografía texto*/
        border-radius: 50px; /*bordes redondos*/
        :hover: 
          background-color: #f1f4f5;  
      
          
        ">Eliminar factura</button>
            `
    mostradorDeFacturas.appendChild(div)

    let btnEliminar = document.getElementById(`EliminarFactura${factura.FacturaN}`)
    btnEliminar.addEventListener('click', ()=>{

        Toastify({
            text: "Factura borrada",
            duration: 2500,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "centert", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ff1a00, #ff8300)",
            },
            onClick: function(){} // Callback after click
          }).showToast();

    facturasdb = facturasdb.filter(el => el.FacturaN != factura.FacturaN);
    btnEliminar.parentElement.parentElement.remove();    
    } )
    
}
    
    })
}

const agregarFactura = document.getElementById("cargaFactura");

agregarFactura.addEventListener("submit", (e) => {
e.preventDefault();
//console.log("Factura agrega");
CargaDeFacturas();
MostrarFacturas();
})

function CargaDeFacturas() {
    Swal.fire({
        icon: 'success',
        title: 'Bien!',
        text: `Factura N°:${document.getElementById("numeroFacturaCarga").value} agregada`,
      })
    facturasdb.push(new factura(CUITActual, parseInt(document.getElementById("numeroFacturaCarga").value), document.getElementById("tipoFacturaCarga").value, parseFloat(document.getElementById("montoFacturaCarga").value), document.getElementById("observacionFacturaCarga").value))

    mostradorDeFacturas.innerHTML = "";
    

}

//Almacenamiento al cierre de sesión en el Storage


function GuardarDatos(){
localStorage.setItem("FacturasDB",JSON.stringify(facturasdb));

}

//Lectura al inicio de sesión

function LeerDatos(){
if(JSON.parse(localStorage.getItem("FacturasDB")) != null){
console.log("Se cargó DB")
    facturasdb = JSON.parse(localStorage.getItem("FacturasDB"))

}
}
MostrarFacturas ()


//Calcular total de facturas

let btnCalcTotal = document.getElementById("btnCalcularTotal");

btnCalcTotal.addEventListener('click',() =>{
    let tipoA=0,tipoB=0,tipoC=0,tipoT=0;
    facturasdb.forEach(factura =>{
        
        if(factura.CUIT == CUITActual)
        {
        switch(factura.tipoFactura){
        case "A":
        tipoA += factura.Monto;
        break;
        case "B":
        tipoB += factura.Monto;
        break;
        case "C":
        tipoC += factura.Monto;
        break;
        };
        tipoT +=factura.Monto;
    }})
        let div1 = document.getElementById("CalcularTotal");
        div1.innerHTML =`<table>
        <tr>
        <th>Tipo</th>
        <th>Total</th>
        </tr>
        <tr>
        <td>A</td>
        <td>${tipoA}</td>
        </tr>
        <tr>
        <td>B</td>
        <td>${tipoB}</td>
        </tr>
        <tr>
        <td>C</td>
        <td>${tipoC}</td>
        </tr>
        <tr>
        <td><strong>Total</strong></td>
        <td>${tipoT}</td>
        </tr>
       
        
        
        </table>
        `    
            
        
        
        

})

