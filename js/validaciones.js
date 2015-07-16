var userProfileList = [];

function inicializar() {
    var btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener('click',guardaDatosLabel, false);
    var btnEditar = document.getElementById("btnEditar");
    btnEditar.addEventListener('click',habilitaBotonesPerfil, false);
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.setAttribute("style", "display: none;")
}

function habilitaBotonesPerfil(){
    var nombrePerfil = document.getElementById("nombrePerfil");
    nombrePerfil.style.display = 'none';
    var apellidoPerfil = document.getElementById("apellidoPerfil");
    apellidoPerfil.style.display = 'none';
    var carroPerfil = document.getElementById("carroPerfil");
    carroPerfil.display = 'none';
    var placaPerfil = document.getElementById("placaPerfil");
    placaPerfil.style.display = 'none';
    var inputNombre = document.getElementById("inputNombre");
    inputNombre.style.display = 'block';
    var inputApellido = document.getElementById("inputApellido");
    inputApellido.style.display = 'block';
    var inputCarro = document.getElementById("input-Carro");
    inputCarro.style.display = 'block';
    var inputPlaca = document.getElementById("inputPlaca");
    inputPlaca.style.display = 'block';
    var inputPlacaPerfil  = document.getElementById("input-placa-Perfil");
    inputPlacaPerfil.style.display = 'none';
    
}

function guardaDatosLabel(){
    var nombrePerfil = document.getElementById("nombrePerfil");
    var apellidoPerfil = document.getElementById("apellidoPerfil");
    var placaPerfil = document.getElementById("placaPerfil");
    var inputNombre = document.getElementById("inputNombre");
    var inputApellido = document.getElementById("inputApellido");
    var inputCarro = document.getElementById("input-Carro");
    var inputPlaca = document.getElementById("inputPlaca");
    var inputPlacaPerfil  = document.getElementById("input-placa-Perfil");

    var msmErrorNombre;
    var msmErrorApellido;
    msmErrorNombre = document.getElementById("msmErrorNombre");
    msmErrorApellido = document.getElementById("msmErrorApellido");

    if(inputNombre.value == "" && inputApellido.value == "" && inputPlaca.value == ""){
        
        msmErrorNombre.innerHTML = "Campos no puede estar vacio";
        msmErrorNombre.style.color = "red";
        
        msmErrorApellido.innerHTML = "Campos no puede estar vacio";
        msmErrorApellido.style.color = "red";
    }
    else if(inputApellido.value == ""){
        msmErrorApellido.innerHTML = "Campos no puede estar vacio";
        msmErrorApellido.style.color = "red";
        //msmErrorNombre = document.getElementById("msmErrorNombre");
        msmErrorNombre.innerHTML = "";
        msmErrorNombre.style.color = "red"
    }
    else if(inputNombre.value == ""){
        //msmErrorNombre = document.getElementById("msmErrorNombre");
        msmErrorNombre.innerHTML = "Campos no puede estar vacio";
        msmErrorNombre.style.color = "red";
        //msmErrorApellido = document.getElementById("msmErrorApellido");
        msmErrorApellido.innerHTML = "";
        msmErrorApellido.style.color = "red"
    }

    else if (inputNombre.value != "" && inputApellido.value != "" && inputPlaca.value != ""){
        nombrePerfil.setAttribute("style", "font-weight: bold;");
        nombrePerfil.style.display = 'inline';
        apellidoPerfil.style.display = 'inline';
        inputPlacaPerfil.style.display = 'inline';
        placaPerfil.style.display = 'inline';
        inputNombre.style.display = 'none';
        inputApellido.style.display = 'none';
        inputCarro.style.display = 'none';
        inputPlaca.style.display = 'none';
        nombrePerfil.innerHTML = inputNombre.value;
        apellidoPerfil.innerHTML = inputApellido.value;
        
        inputPlacaPerfil.innerHTML = inputPlaca.value;
        msmErrorApellido.innerHTML = "";
        msmErrorNombre.innerHTML = "";
        var btnGuardar = document.getElementById("guardar");
        btnGuardar.setAttribute("style", "display: none;");
    }



}

function validarNoTengoCarro(){
    var divPlaca = document.getElementById("input-Placa");
    divPlaca.setAttribute("style","display: none;");
    var inputPlaca = document.getElementById("carroPerfil");
    inputPlaca.innerHTML = "Carro : No";
}

function validarTengoCarro(){
    var divPlaca = document.getElementById("input-Placa");
    divPlaca.setAttribute("style","display: block;");
    var inputPlaca = document.getElementById("carroPerfil");
    inputPlaca.innerHTML = "Carro : Si";
    
}

function validarPlaca() {
    var placa = document.getElementById("inputPlaca").value;
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

function ocultaBoton(){
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.setAttribute("style", "display: inline;")
}

function ocultaCancelar(){
    var nombrePerfil = document.getElementById("nombrePerfil");
    var apellidoPerfil = document.getElementById("apellidoPerfil");
    var placaPerfil = document.getElementById("placaPerfil");
    var inputNombre = document.getElementById("inputNombre");
    var inputApellido = document.getElementById("inputApellido");
    var inputCarro = document.getElementById("input-Carro");
    var inputPlaca = document.getElementById("inputPlaca");
    var inputPlacaPerfil  = document.getElementById("input-placa-Perfil");
    nombrePerfil.setAttribute("style", "font-weight: bold;");
    nombrePerfil.style.display = 'inline';
    apellidoPerfil.style.display = 'inline';
    inputPlacaPerfil.style.display = 'inline';
    placaPerfil.style.display = 'inline';
    inputNombre.style.display = 'none';
    inputApellido.style.display = 'none';
    inputCarro.style.display = 'none';
    inputPlaca.style.display = 'none';
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.setAttribute("style", "display: none;");
    msmError.innerHTML = "";
    msmErrorApellido.innerHTML = "";
    msmErrorNombre.innerHTML = "";
    inputNombre.innerHTML = 'none';
    inputApellido.innerHTML = 'none';
    inputCarro.innerHTML = 'none';
    inputPlaca.innerHTML = 'none';
}

function obtenerDatosPerfil(){
    var id,nombre,apellido,imagenSrc,seguidores,seguidos,tieneCarro,placa;
    nombre = document.getElementById("labelNombre");
    apellido = document.getElementById("apellidoPerfil");
    seguidores = document.getElementById("labelSeguidores");
    seguidos = document.getElementById("labelSiguiendo");
    tieneCarro = document.getElementById("carroPerfil");
    placa = document.getElementById("input-placa-Perfil");
    imagenSrc = document.getElementById("imaUser");
    
    nombre.innerHTML = userProfileList[0];
    apellido.innerHTML = userProfileList[1];
    seguidores.innerHTML = userProfileList[2];
    seguidos.innerHTML = userProfileList[3];
    imagenSrc.setAttribute("src", userProfileList[5]);
    if(userProfileList[4]=="si" || userProfileList[4]=="Si"){
        placa.innerHTML = userProfileList[6];
    }
}

function perfil() {
    location.href = "perfil.html";
}

function seguidores() { 
    location.href = "main_seguidores.html";
}

window.addEventListener('load', inicializar, false);