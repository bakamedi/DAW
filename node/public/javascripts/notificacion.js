var socket = io();
$(document).ready(function(){
    var name = document.getElementById("TempUsuario").value;
    //console.log(name);
    socket.emit("inicioSesion",name);
});

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
		socket.emit("notificacion",de,para,mensaje,tipo)
	});

	socket.on("notificarMensajePrivado", function (mensaje,tipo,de){
		alert(tipo);
		alert(mensaje);

		var ul = document.getElementById("notificaExtension");
		var li = $(document.createElement('li'));
		var p = document.createElement("p");

		li.attr("class","mdl-menu__item ");

		if(tipo==1){
			var text = de+" te envio un mensaje.";
			console.log(text);
		}
		if(tipo==0){
			var text = de+" quiere que lo lleves.";
		}

		p.innerHTML = text;
		li.append(p);
		$("#notificaExtension").append(li);


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
