var socket = io();
$(document).ready(function(){
    var name = document.getElementById("TempUsuario").value;
    //console.log(name);
    socket.emit("inicioSesion",name);
});
var badge_num = 0;
function addBadge(){
   badge_num++;
   $("#notifica").attr("data-badge", badge_num);

}
function removeBadge(){
   badge_num = 0;
   $("#notifica").attr("data-badge", 0);

}
$(function(){
	$(".sendMsg").on("click", function(){
		var de = document.getElementById("perfilUsuario").innerHTML;
		var para = $("input#para").val();
		var mensaje = $("input#msg").val();
		var tipo = 1;
		console.log(para);
		console.log(mensaje);
		socket.emit("notificacion",de,para,mensaje,tipo);
	});

	$(".sendNotificacion").on("click", function(){
		var de = document.getElementById("perfilUsuario").innerHTML;
		var para = $("input#para").val();
		var mensaje = $("input#msg").val();
		var tipo = 0;
		console.log(para);
		console.log(mensaje);
		socket.emit("notificacion",de,para,mensaje,tipo);
	});

	socket.on("notificarMensajePrivado", function (mensaje,tipo,de){
		alert(tipo);
		alert(mensaje);

		var ul = document.getElementById("notificaExtension");
		var li = $(document.createElement('li'));
		var p = document.createElement("p");

		li.attr("class","mdl-menu__item ");
                var text;

		if(tipo==1){//NUEVO MENSAJE
			text = de+" te envio un mensaje.";
			console.log(text);
		}
		if(tipo===0){//PETICION
			text = de+" quiere que lo lleves.";
		}
		if(tipo===2){//CONFIRMACION
			text = de+" te va a llevar.";
		}


		p.innerHTML = text;
		li.append(p);
		$("#notificaExtension").append(li);

                addBadge();

		/*
		//var not = document.getElementsBy("not").setAttribute("class","glyphicon glyphicon-info-sign");;
		$("#not").attr("class","glyphicon glyphicon-info-sign");  
		console.log(mensaje);
		$("#chat").append("<p class='col-md-12 alert-info'>"+mensaje+"</p>");
		//not.setAttribute("class","glyphicon glyphicon-info-sign");
		console.log("++++++++++++++++++");
		*/
		alert("tiene un mensaje");
	});
});
