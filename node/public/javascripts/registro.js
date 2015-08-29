function inicializar() {
    //var btnIngresar = document.getElementById("btnIngresar");
    //btnIngresar.addEventListener('click',validar, false);
    //var btnIngresar = document.getElementById("btnIngresar");
    //btnIngresar.addEventListener('click',validar, false);
    var url = document.URL;
    var array = url.split("=");

    var div = document.createElement("div");
    var label = document.createElement("label");
    var btn = document.createElement("button");
    var spa = document.createElement("span");
    var divInicio = document.getElementById("Registrate");

    if(array[1]==1){
        spa.setAttribute("aria-hidden","true");
        spa.innerHTML = "x";
        spa.setAttribute("style","font-size: 15px;");

        btn.setAttribute("class","close");
        btn.setAttribute("data-dismiss","alert");
        btn.setAttribute("aria-label","Close");
        
        label.setAttribute("style","font-size: 10px;");
        label.innerHTML = "Usuario No encontrado";

        btn.appendChild(spa);

        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertaIngreso");
        div.setAttribute("style", "padding-top: 7px;");
        div.setAttribute("style", "padding-bottom: 2px;");
        div.setAttribute("class", "alert alert-warning alert-dismissible");


        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);
    }
    if(array[1]==2){
        spa.setAttribute("aria-hidden","true");
        spa.innerHTML = "x";
        spa.setAttribute("style","font-size: 15px;");

        btn.setAttribute("class","close");
        btn.setAttribute("data-dismiss","alert");
        btn.setAttribute("aria-label","Close");
        
        label.setAttribute("style","font-size: 10px;");
        label.innerHTML = "Usuario ya Registrado";

        btn.appendChild(spa);

        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertaIngreso");
        div.setAttribute("style", "padding-top: 7px;");
        div.setAttribute("style", "padding-bottom: 2px;");
        div.setAttribute("class", "alert alert-warning alert-dismissible");


        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);
    }
}


function validarTengoCarro(){
    var divPlaca = document.getElementById("formInPlaca");
    var divCapacidad = document.getElementById("formInCapacidad");
    divPlaca.setAttribute("style","display:normal;");
    divCapacidad.setAttribute("style","display:normal;");
    var inPlaca = document.getElementById("inPlaca").value="";
    var inCapacidad = document.getElementById("inCapacidad").value="";
}

function validarNoTengoCarro(){
    var divPlaca = document.getElementById("formInPlaca");
    var inPlaca = document.getElementById("inPlaca").value="XXX-0000";
    var inCapacidad = document.getElementById("inCapacidad").value="0";
    var divCapacidad = document.getElementById("formInCapacidad");
    divPlaca.setAttribute("style","display: none;");
    divCapacidad.setAttribute("style","display: none;");
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

    if ((conLetras + conNum == 7) && conLetras == 3 && conNum == 4 && verificarUltimosNumeros==4 && verificarPrimerasSonLetras==3 && placa[3]=="-") {
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

    if ((conLetras + conNum == 7) && conLetras == 3 && conNum == 4 && verificarUltimosNumeros==4 && verificarPrimerasSonLetras==3 && placa[3]=="-") {
        return true;
    }
    else {
        return false;
    }
}

window.addEventListener('load', inicializar, false);