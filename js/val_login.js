function inicializar() {
    var btnIngresar = document.getElementById("btnIngresar");
    btnIngresar.addEventListener('click',validar, false);
    
}

function validar() {

    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    var divInicio = document.getElementById("inicio");

    var formUsuario = document.getElementById("formUsuario");
    var formPassword = document.getElementById("formPassword");

    var div = document.createElement("div");
    var label = document.createElement("label");
    var btn = document.createElement("button");
    var spa = document.createElement("span");

    spa.setAttribute("aria-hidden","true");
    spa.innerHTML = "x";
    spa.setAttribute("style","font-size: 15px;");

    btn.setAttribute("class","close");
    btn.setAttribute("data-dismiss","alert");
    btn.setAttribute("aria-label","Close");
    
    label.setAttribute("style","font-size: 10px;");
    label.innerHTML = "Email y/o contraseña incorrecta";

    btn.appendChild(spa);

    div.setAttribute("role", "alert");
    div.setAttribute("id", "alertaIngreso");
    div.setAttribute("style", "padding-top: 7px;");
    div.setAttribute("style", "padding-bottom: 2px;");
    div.setAttribute("class", "alert alert-warning alert-dismissible");

    if (password == "" && email == "" && document.getElementById("alertaIngreso") == null) {
        formPassword.setAttribute("class","has-error");
        formUsuario.setAttribute("class","has-error");
        formUsuario.setAttribute("style","margin-bottom: 15px;");
        formPassword.setAttribute("style","margin-bottom: 15px;");
        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);

    }else if(password == "" && document.getElementById("alertaIngreso") == null){
        formPassword.setAttribute("class","has-error");
        formPassword.setAttribute("style","margin-bottom: 15px;");
        formUsuario.setAttribute("class","has-success");
        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);
    }else if(email == "" && document.getElementById("alertaIngreso") == null){
        formUsuario.setAttribute("class","has-error");
        formUsuario.setAttribute("style","margin-bottom: 15px;");
        formPassword.setAttribute("class","has-success");
        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);
    }
}


function validarTengoCarro(){
    var divPlaca = document.getElementById("formPlaca");
    divPlaca.setAttribute("style","display:normal;");

}

function validarNoTengoCarro(){
    var divPlaca = document.getElementById("formPlaca");
    divPlaca.setAttribute("style","display: none;");
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


function limpiarCampos() { 
    var inUsuario = document.getElementById("inUsuario").value = "";
    var inContraseña = document.getElementById("inContraseña").value = "";
    var inNombre = document.getElementById("inNombre").value = "";
    var inApellido = document.getElementById("inApellido").value = "";
    var inNewContraseña = document.getElementById("inNewContraseña").value = "";
    var inConNewContraseña = document.getElementById("inConNewContraseña").value = "";
    var rb1 = document.getElementById("rbTengo").checked = true;
    var inPlaca = document.getElementById("inPlaca").value = "";

    var divPlaca = document.getElementById("formPlaca");
    var estadoNombre = document.getElementById("msmError");


    estadoNombre.innerHTML = "";
    
    divPlaca.setAttribute("style","display: normal;");

}


window.addEventListener('load', inicializar, false);