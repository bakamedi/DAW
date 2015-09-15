function inicializar() {

}

function ponerImagen(){
    var onixfile = document.getElementById("onixfile").value;
    var imaUser = document.getElementById("imaUser");
    imaUser.setAttribute("src",onixfile);
}

function validarTengoCarro(){
    var divPlaca = document.getElementById("formInPlaca");
    var inPlaca = document.getElementById("inPlaca").value="";
    divPlaca.setAttribute("style","display:normal;");
}

function validarNoTengoCarro(){
    var divPlaca = document.getElementById("formInPlaca");
    var inPlaca = document.getElementById("inPlaca").value="XXX0000";
    var inCapacidad = document.getElementById("inCapacidad").value=0;
    divPlaca.setAttribute("style","display: none;");

}

function justNumbers(e){
    var keynum = window.event ? window.event.keyCode : e.which;
    if((keynum == 8) || (keynum==46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

function validarPlaca() {
    var placa = document.getElementById("inPlaca").value;
    var conNum = 0;
    var conLetras = 0;

    var estadoNombre = document.getElementById("msmError");

    if(placa.length == 8) {
        for(i=0; i<8; i++) {
            if(placa[i]>="0" && placa[i]<= "9"){
                conNum++;
            }
            if(placa[i]>="A" && placa[i]<= "Z"){
                conLetras++;
            }
        }
        var verificarPrimerasSonLetras = 0;
        for(i=0;i<3;i++){
            if(placa[i]>="A" && placa[i]<= "Z"){
                verificarPrimerasSonLetras++;
            }
        }
        var verificarUltimosNumeros = 0;
        for(i=4;i<8;i++){
            if(placa[i]>="0" && placa[i]<= "9"){
                verificarUltimosNumeros++;
            }
        }
    }

    if ((conLetras + conNum == 7) && conLetras == 3 && conNum == 4 && verificarUltimosNumeros==4 && verificarPrimerasSonLetras==3) {
        estadoNombre.innerHTML = "";
        //estadoNombre.style.color = "red";
    }
    else {
        estadoNombre.innerHTML = "Placa incorrecta";
        estadoNombre.style.color = "red";
    }
}


function validarPlacaDetener() {
    var placa = document.getElementById("inPlaca").value;
    var conNum = 0;
    var conLetras = 0;

    var estadoNombre = document.getElementById("msmError");

    if(placa.length == 7) {
        for(i=0; i<7; i++) {
            if(placa[i]>="0" && placa[i]<= "9"){
                conNum++;
            }
            if(placa[i]>="A" && placa[i]<= "Z"){
                conLetras++;
            }
        }
    }

    if (conLetras + conNum == 7 && conLetras == 3 && conNum == 4) {
        return true;
    }
    else {
        return false;
    }
}

function validarPalabraNombre() {
    var palabra      = document.getElementById("nombrePerfil").value;
    var estadoNombre = document.getElementById("msmErrorNombre");

    if(palabra.length != 0) {
        for(i=0; i<palabra.length; i++) {
            if(palabra[i]>="0" && palabra[i]<= palabra.length){
                estadoNombre.innerHTML = "El Nombre debe de tener Numeros";
                estadoNombre.style.color = "red";
            }
            if((palabra[i]>="A" && palabra[i]<= "Z") || (palabra[i]>="a" && palabra[i]<= "z")){
                estadoNombre.innerHTML = "";
            }
        }
    }
    else {
        estadoNombre.innerHTML = "El Nombre no debe estar Vacio";
        estadoNombre.style.color = "red";
    }
}

function validarPalabraApellido() {
    var palabra      = document.getElementById("apellidoPerfil").value;
    var estadoNombre = document.getElementById("msmErrorApellido");

    if(palabra.length != 0) {
        for(i=0; i<palabra.length; i++) {
            if(palabra[i]>="0" && palabra[i]<= palabra.length){
                estadoNombre.innerHTML = "El Nombre debe de tener Numeros";
                estadoNombre.style.color = "red";
            }
            if((palabra[i]>="A" && palabra[i]<= "Z") || (palabra[i]>="a" && palabra[i]<= "z")){
                estadoNombre.innerHTML = "";
            }
        }
    }
    else {
        estadoNombre.innerHTML = "El Nombre no debe estar Vacio";
        estadoNombre.style.color = "red";
    }
}

function validarPlaca() {
    var placa = document.getElementById("inPlaca").value;
    var conNum = 0;
    var conLetras = 0;

    var estadoNombre = document.getElementById("msmError");

    if(placa.length == 7) {
        for(i=0; i<7; i++) {
            if(placa[i]>="0" && placa[i]<= "9"){
                conNum++;
            }
            if(placa[i]>="A" && placa[i]<= "Z"){
                conLetras++;
            }
        }
    }

    if (conLetras + conNum == 7 && conLetras == 3 && conNum == 4) {
        estadoNombre.innerHTML = "";
        //estadoNombre.style.color = "red";
    }
    else {
        estadoNombre.innerHTML = "Placa incorrecta";
        estadoNombre.style.color = "red";
    }
}

function justNumbers(e){
    var keynum = window.event ? window.event.keyCode : e.which;
    if((keynum == 8) || (keynum==46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

window.addEventListener('load', inicializar, false);
