var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var matrizPalabrasAleatorias = ["ARBOL", "MARTILLO","CHAPA","ALFAJOR","NEUTRON",
"ASNO","VIENTO","CIELO","CINTA","ARROZ","CASTILLO","PAYASO","GRILLO"];
var palabraSecreta = "";
var letraIngresada = "";
let expReg = /[A-Za-z]/;
var letrasErradas = [];
var contador;
var errada;
var cantidadLetrasErradas = 0;

function pintarPantalla() {
    pincel.fillStyle = "#FADBD8";
    pincel.fillRect(0,0,800,380);
}
function dibujarHorca() {
    pincel.strokeStyle = "black";
    pincel.lineWidth = 4;
    pincel.beginPath();
    pincel.moveTo(200,90);
    pincel.lineTo(200,60);
    pincel.lineTo(60,60);
    pincel.lineTo(60,300);
    pincel.moveTo(30,300);
    pincel.lineTo(150,300);
    pincel.moveTo(90,60);
    pincel.lineTo(60,90);
    pincel.stroke();
    pincel.closePath();
    pincel.lineWidth = 2;
    pincel.beginPath();
    pincel.moveTo(40,300);
    pincel.lineTo(30,315);
    pincel.moveTo(55,300);
    pincel.lineTo(45,315);
    pincel.moveTo(70,300);
    pincel.lineTo(60,315);
    pincel.moveTo(85,300);
    pincel.lineTo(75,315);
    pincel.moveTo(100,300);
    pincel.lineTo(90,315);
    pincel.moveTo(115,300);
    pincel.lineTo(105,315);
    pincel.moveTo(130,300);
    pincel.lineTo(120,315);
    pincel.moveTo(145,300);
    pincel.lineTo(135,315);
    pincel.stroke();
    pincel.closePath();
}
function seleccionarPalabraSecreta() {
    var index = Math.floor(Math.random() * matrizPalabrasAleatorias.length);
    palabraSecreta = matrizPalabrasAleatorias[index];
    return palabraSecreta;
}
function dibujarLineas() {
    var cantidadLetras = palabraSecreta.length;
    var i = 0;
    while (i < cantidadLetras) {
        pincel.strokeStyle = "blue";
        pincel.lineWidth = 1.5;
        pincel.beginPath();
        pincel.moveTo(350 + 50*i,310);
        pincel.lineTo((350 + 50*i)+40,310);
        pincel.stroke();
        i++;
    }
}
function validarLetraIngresada() {
    if ((expReg.test(letraIngresada) == true && letraIngresada.length == 1) || letraIngresada == "Ñ" || letraIngresada == "ñ") {
        letraIngresada = letraIngresada.toUpperCase();
    } else if (expReg.test(letraIngresada) == true && letraIngresada.length > 1) {
        letraIngresada = null;
    } else {
        letraIngresada = null;
        alert("Por favor, ingrese sólo letras y sin acentos!. No se admiten caracteres especiales."); 
    }
}
function chequearErrada() {
    errada = false;
    letrasErradas.forEach(element => {
        if (letraIngresada == element) {
            errada = true;
        }
    });
}
function anotarLetra() {
    if (letraIngresada != null) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (letraIngresada == palabraSecreta[i]) {
                pincel.fillStyle = "black";
                pincel.font = '50px serif';
                pincel.fillText(palabraSecreta[i],350 + 50*i,300);
            } else {
                contador++;
                if (contador == palabraSecreta.length) {
                    chequearErrada();
                    if (errada == false) { 
                        pincel.fillStyle = "black";
                        pincel.font = '35px serif';
                        pincel.fillText(letraIngresada,350 + 50*cantidadLetrasErradas,200);
                        letrasErradas.push(letraIngresada);
                        cantidadLetrasErradas++;
                    }
                }
            }
        }
    }
}
function verificarLetraIngresada(evento) {
    contador = 0;
    letraIngresada = evento.key;
    validarLetraIngresada();
    anotarLetra();
}
function escribirPalabra(palabra) {
    pincel.fillStyle = "black";
    pincel.font = '50px serif';
    pincel.fillText(palabra,380,100);
}

pintarPantalla();
dibujarHorca();
palabraSecreta = seleccionarPalabraSecreta();
dibujarLineas();
document.onkeydown = verificarLetraIngresada;
escribirPalabra(palabraSecreta);









