var id;

function inicializar() {
    cargarDatosUsuarioPerfil();

    var btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener('click',guardaDatosLabel, false);
    var btnEditar = document.getElementById("btnEditar");
    btnEditar.addEventListener('click',habilitaBotonesPerfil, false);
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.setAttribute("style", "display: none;");
    cargarDatosRutasUsuarioPerfil();
    //alert("XXXXX");
}

function habilitaBotonesPerfil(){
    var nombrePerfil = document.getElementById("nombrePerfil");
    nombrePerfil.style.display = 'none';
    var apellidoPerfil = document.getElementById("apellidoPerfil");
    apellidoPerfil.style.display = 'none';
    var carroPerfil = document.getElementById("carroPerfil");
    carroPerfil.style.display = 'none';
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
    var divCarroPerfil = document.getElementById("divCarroPerfil");
    divCarroPerfil.style.display = 'none';

}

function guardaDatosLabel(){
    var nombrePerfil = document.getElementById("nombrePerfil");
    var apellidoPerfil = document.getElementById("apellidoPerfil");
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
        divCarroPerfil.style.display = 'inline'
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
        var success = document.getElementById("divSuccess");
        success.style.display = "inline";
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
    var inputNombre = document.getElementById("inputNombre");
    var inputApellido = document.getElementById("inputApellido");
    var inputCarro = document.getElementById("input-Carro");
    var inputPlaca = document.getElementById("inputPlaca");
    var inputPlacaPerfil  = document.getElementById("input-placa-Perfil");
    nombrePerfil.setAttribute("style", "font-weight: bold;");
    nombrePerfil.style.display = 'inline';
    apellidoPerfil.style.display = 'inline';
    inputPlacaPerfil.style.display = 'inline';
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

function cargarDatosUsuarioPerfil(){
    var request = new XMLHttpRequest;
    request.addEventListener('load',obtenerDatosPerfil,false);
    request.open('GET',"xml/login.xml",true);
    request.send(null);
}

function obtenerDatosPerfil(evt){

    var response = evt.target.responseXML;
    var usuarios = response.getElementsByTagName("usuario");

    var url = document.URL;
    var array = url.split("=");

    //alert(array[1]);

    for(var i = 0 ; i < usuarios.length ;i++){
        if(usuarios[i].getElementsByTagName("nick")[0].firstChild.nodeValue == array[1]){
            var nombre,apellido,imagenSrc,seguidores,seguidos,tieneCarro,placa;
            var nombreUsu, apellidoUsu, followersUsu, followingUsu, avatarSrcUsu, carroUsu, placaUsu;
            id = usuarios[i].getElementsByTagName("id")[0].firstChild.nodeValue;
            nombreUsu = usuarios[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
            apellidoUsu = usuarios[i].getElementsByTagName("apellido")[0].firstChild.nodeValue;
            followersUsu = usuarios[i].getElementsByTagName("followers")[0].firstChild.nodeValue;
            followingUsu = usuarios[i].getElementsByTagName("following")[0].firstChild.nodeValue;
            avatarSrcUsu = usuarios[i].getElementsByTagName("avatar")[0].firstChild.nodeValue;
            carroUsu = usuarios[i].getElementsByTagName("carro")[0].firstChild.nodeValue;
            placaUsu = usuarios[i].getElementsByTagName("placa")[0].firstChild.nodeValue;

            //alert(nombreUsu+" "+apellidoUsu+" "+followersUsu+" "+followingUsu+" "+carroUsu+" "+placaUsu);

            nombre = document.getElementById("labelNombre");
            apellido = document.getElementById("apellidoPerfil");
            seguidores = document.getElementById("labelSeguidores");
            seguidos = document.getElementById("labelSiguiendo");
            tieneCarro = document.getElementById("carroPerfil");
            placa = document.getElementById("input-placa-Perfil");
            imagenSrc = document.getElementById("imaUser");

            nombre.innerHTML = nombreUsu;
            apellido.innerHTML = apellidoUsu;
            seguidores.innerHTML = "Seguidores :  "+ followersUsu;
            seguidos.innerHTML = "Siguiendo :  "+ followingUsu;
            imagenSrc.setAttribute("src", avatarSrcUsu);
            if(carroUsu=="si" || carroUsu=="Si"){
                placa.innerHTML = "Placa: "+placaUsu;
            }else{
                placa.innerHTML = " ";
            }
        }
    }

}

function cargarDatosRutasUsuarioPerfil(){
    var request = new XMLHttpRequest;
    request.addEventListener('load',creaDivRutasSeguidores,false);
    request.open('GET',"xml/followers.xml",true);
    request.send(null);
}

function creaDivRutasSeguidores(evt){
    var response = evt.target.responseXML;
    var profile = response.getElementsByTagName("profile");
    var nombre, imagenSrc, ruta;
    var ul, li, a, divRow, divIma , ima, spanName, divNameRuta, spanRuta, spanRuta, img, buttonTxtMsg, buttonEliminarSeguidor;
    //alert(profile.length);
    for(var i = 0 ; i < profile.length ; i++){
        var idUsuario = profile[i].getElementsByTagName("id")[0].firstChild.nodeValue;
        //alert(idUsuario==id);
        if(idUsuario == id){
            nombre = profile[i].getElementsByTagName("name")[0].firstChild.nodeValue;
            imagenSrc = profile[i].getElementsByTagName("avatar")[0].firstChild.nodeValue;
            ruta = profile[i].getElementsByTagName("ruta")[0].firstChild.nodeValue;

            var br = document.createElement("br");
            var hr = document.createElement("hr");

            spanName = document.createElement("span");
            spanName.innerHTML = nombre;
            spanRuta = document.createElement("span");
            spanRuta.innerHTML = ruta;

            divNameRuta = document.createElement("div");
            divNameRuta.setAttribute("class","text-center col-md-9");
            divNameRuta.appendChild(spanName);
            divNameRuta.appendChild(br);
            divNameRuta.appendChild(spanRuta);

            divIma = document.createElement("div");
            divIma.setAttribute("class", "text-left col-md-3");

            ima = document.createElement("img");
            ima.setAttribute("alt", "imagen seguidor");
            ima.setAttribute("class", "img-responsive img-circle");
            ima.setAttribute("src", imagenSrc);

            divIma.appendChild(ima);

            buttonTxtMsg = document.createElement("button");
            buttonTxtMsg.setAttribute("class","mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored");
            buttonTxtMsg.setAttribute("style","background-color: #0094ff;");

            //buttonTxtMsg.setAttribute("id",nombre);
            //---------------------------------
            buttonTxtMsg.setAttribute("data-toggle","modal");
            buttonTxtMsg.setAttribute("data-target","#cdf");
            buttonTxtMsg.setAttribute("onclick", "atraparValores()");

            var spanTxtMsg = document.createElement("span");
            spanTxtMsg.setAttribute("class", "glyphicon glyphicon-comment");

            buttonTxtMsg.appendChild(spanTxtMsg);

            buttonEliminarSeguidor = document.createElement("button");
            buttonEliminarSeguidor.setAttribute("class","mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored");
            buttonEliminarSeguidor.setAttribute("style","background-color: #0094ff;");
            buttonEliminarSeguidor.setAttribute("alt", "dejar de seguir");
            //var spanDejarDeSeguir = document.createElement("span");
            //spanDejarDeSeguir.setAttribute("class","glyphicon glyphicon-remove-circle")

            //buttonEliminarSeguidor.appendChild(spanDejarDeSeguir);

            divRow = document.createElement("div");
            divRow.setAttribute("class", "row");
            divRow.setAttribute("id", nombre);
            divRow.appendChild(divIma);
            divRow.appendChild(divNameRuta);
            divRow.appendChild(buttonTxtMsg);
            //divRow.appendChild(buttonEliminarSeguidor);



            a = document.createElement("a");
            a.setAttribute("href", "#");
            a.appendChild(divRow);

            li = document.createElement("li");
            li.setAttribute("class", "misRutas");
            li.setAttribute("data-name", "Casa");
            li.appendChild(a);
            ul = document.getElementById("listaSeguidoresRutas");
            ul.appendChild(li);
            ul.appendChild(hr);
        }
        
    }

}

function atraparValores(){
}

function perfil() {
    location.href = "perfil.html";
}

function seguidores() {
    location.href = "main_seguidores.html";
}




window.addEventListener('load', inicializar, false);
