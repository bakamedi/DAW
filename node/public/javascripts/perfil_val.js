var btnGuardar = document.getElementById("btnGuardar");
var btnCancelar = document.getElementById("btnCancelar");
var inputNombre = document.getElementById("inputNombre");

function inicializar (argument) {
	// body...

    var btnEditar = document.getElementById("btnEditar");
    var btnGuardar = document.getElementById("btnGuardar");
    var btnCancelar = document.getElementById("btnCancelar");
    btnEditar.addEventListener('click',habilitaBotonesEdicionPerfil, false);
    btnCancelar.addEventListener('click',desabilitaEdicionPerfil,false);
}

function habilitaBotonesEdicionPerfil () {
	// body...
	btnGuardar.style.display = 'inline-block';
	btnCancelar.style.display = 'inline-block'
}

function desabilitaEdicionPerfil(){
	btnGuardar.style.display = 'none';
	btnCancelar.style.display = 'none';
}


window.addEventListener('load', inicializar, false);