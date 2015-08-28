
function inicializar() {
    //var btnIngresar = document.getElementById("btnIngresar");
    //btnIngresar.addEventListener('click',validar, false);
    //var btnIngresar = document.getElementById("btnIngresar");
    //btnIngresar.addEventListener('click',validar, false);
    var url = document.URL;
    var array = url.split("=");
    var formUsuario = document.getElementById("formUsuario");
    var formPassword = document.getElementById("formPassword");
    var div = document.createElement("div");
    var label = document.createElement("label");
    var btn = document.createElement("button");
    var spa = document.createElement("span");
    var divInicio = document.getElementById("inicio");

    if(array[1]==1){
        spa.setAttribute("aria-hidden","true");
        spa.innerHTML = "x";
        spa.setAttribute("style","font-size: 15px;");

        btn.setAttribute("class","close");
        btn.setAttribute("data-dismiss","alert");
        btn.setAttribute("aria-label","Close");
        
        label.setAttribute("style","font-size: 10px;");
        label.innerHTML = "Usuario y/o contraseña incorrecta";

        btn.appendChild(spa);

        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertaIngreso");
        div.setAttribute("style", "padding-top: 7px;");
        div.setAttribute("style", "padding-bottom: 2px;");
        div.setAttribute("class", "alert alert-warning alert-dismissible");

        formPassword.setAttribute("class","has-error");
        formUsuario.setAttribute("class","has-error");

        div.appendChild(btn);
        div.appendChild(label);
        divInicio.appendChild(div);
    }
}
/*
$("form").submit(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    var $this = $(this); // `this` refers to the current form element
    $.post(
        $this.attr("action"), // Gets the URL to sent the post to
        $this.serialize(), // Serializes form data in standard format
        function(data) { /** code to handle response  },
        "json" // The format the response should be in
    );
});
*/
function closewindow() {    
    /*
    confirm('Usuario Registrado');
    $('#myModal').modal('toggle');
    */

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

/*
function validarTengoCarro(){
    var divPlaca = document.getElementById("formPlaca");
    var divCapacidad = document.getElementById("formCapacidad");
    divPlaca.setAttribute("style","display:normal;");
    divCapacidad.setAttribute("style","display:normal;");
    var inPlaca = document.getElementById("inPlaca").value="";
    var inCapacidad = document.getElementById("inCapacidad").value="";
}

function validarNoTengoCarro(){
    var divPlaca = document.getElementById("formPlaca");
    var inPlaca = document.getElementById("inPlaca").value=" ";
    var inCapacidad = document.getElementById("inCapacidad").value="0";
    var divCapacidad = document.getElementById("formCapacidad");
    divPlaca.setAttribute("style","display: none;");
    divCapacidad.setAttribute("style","display: none;");
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

*/
function limpiarCampos() { 
    var inUsuario = document.getElementById("inUsuario").value = "";
    var inContraseña = document.getElementById("inContraseña").value = "";
    //var inNombre = document.getElementById("inNombre");
    //var inApellido = document.getElementById("inApellido");

    //inNombre.setAttribute("placeholder","Nombre");
    //inApellido.setAttribute("placeholder","Apellido");

    //var inNewContraseña = document.getElementById("inNewContraseña").value = "";
    //var inConNewContraseña = document.getElementById("inConNewContraseña").value = "";
    var rb1 = document.getElementById("rbTengo").checked = true;
    var inPlaca = document.getElementById("inPlaca").value = "";
    var inCapacidad = document.getElementById("inCapacidad").value="";

    var divPlaca = document.getElementById("formPlaca");
    var estadoNombre = document.getElementById("msmError");


    estadoNombre.innerHTML = "";
    
    divPlaca.setAttribute("style","display: normal;");

}

function cargarUsuarios(){
    server.h();
    /*
    var request = new XMLHttpRequest;
    request.addEventListener('load',ingresar,false);
    request.open('GET',"xml/login.xml",true);
    request.send(null);
    */
}

function ingresar(evt) {
    var usuario = document.getElementById("Email").value;
    var contraseña = document.getElementById("Password").value;

    var response = evt.target.responseXML;
    var rest = response.getElementsByTagName("usuario");

    var usu,cont,bandera=0;
    //alert(usuario + " "+contraseña);
    for (i = 0; i<rest.length;i++){
        usu = rest[i].getElementsByTagName("nick")[0].firstChild.nodeValue;
        cont = rest[i].getElementsByTagName("contraseña")[0].firstChild.nodeValue;
        //alert(usuario==usu);
        //alert(contraseña == cont);
        if(usuario == usu && contraseña == cont){
            bandera = 1;
            var tempNombre = usu;
        }
    }

    if(bandera==1){
        location.href = "perfil.html?"+"nombre="+tempNombre;
        
    }
    else{
        //location.href = "login.html";
    }

}

function nuevapagina() {
    xmlDoc=loadXMLDoc("xml/login.xml");
    x=xmlDoc.getElementsByTagName("usuario")[0].childNodes[0];
    x.nodeValue="Easy Cooking";
}

function loadXMLDoc(filename){
    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }
    else {  // code for IE5 and IE6
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseXML;
}

function cargarDatosUsuario(){
    var request = new XMLHttpRequest;
    request.addEventListener('load',datos,false);
    request.open('GET',"xml/login.xml",true);
    request.send(null);
}


function datos(evt) {
    var usuario = document.getElementById("inUsuario").value;
    var contraseña = document.getElementById("inContraseña").value;

    var response = evt.target.responseXML;
    var rest = response.getElementsByTagName("usuario");

    var usu,cont,bandera=0;

    var nombre, apellido;
    //alert(usuario + " "+contraseña);
    for (i = 0; i<rest.length;i++){
        usu = rest[i].getElementsByTagName("nick")[0].firstChild.nodeValue;
        cont = rest[i].getElementsByTagName("contraseña")[0].firstChild.nodeValue;
        nombre = rest[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
        apellido = rest[i].getElementsByTagName("apellido")[0].firstChild.nodeValue;



        //alert(usuario==usu);
        //alert(contraseña==cont);
        //alert(contraseña == cont + " "+);
        if(usuario == usu && contraseña == cont){                                               
            var tNombre = document.getElementById("inNombre");
            var tApellido = document.getElementById("inApellido");
            //alert(nombre+" "+apellido);
            tNombre.setAttribute("placeholder",nombre);
            tApellido.setAttribute("placeholder",apellido);
            //tNombre.innerHTML = "asdasdasdas";
            //tApellido.innnerHTML = apellido;
        }
    }
}

function horizontalBounce() {
  // The bounce animation will return to the original state
  // In this case, it will go from 0deg to -45deg to 0deg
  dynamics.animate(pin, {
    rotateZ: -45
  }, {
    type: dynamics.bounce,
    duration: 1800,
    complete: verticalBounce
  })
}

function verticalBounce() {
  // We animate the two elements (svg, pin) independently
  dynamics.animate(svg, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 0
  })

  // Use the delay option to delay your animations
  dynamics.animate(pin, {
    translateY: -60
  }, {
    type: dynamics.forceWithGravity,
    bounciness: 0,
    duration: 500,
    delay: 150
  })

  dynamics.animate(svg, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 600,
    delay: 650,
    complete: horizontalBounce
  })
}

function justNumbers(e){
    var keynum = window.event ? window.event.keyCode : e.which;
    if((keynum == 8) || (keynum==46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

window.addEventListener('load', inicializar, false);