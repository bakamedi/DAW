
$(document).ready(function(){
$("select[id=seguidores_select]").change(function(){
	var cadenaUsuarios ='[{"name":"Luis Andrade","followers":"9000","following":"0","avatar":"img/user.jpg"},{"name":"Hector Jupiter","followers":"2457","following":"1531","avatar":"img/user.jpg"},{"name":"Carolina Alcivar","followers":"2457","following":"1531","avatar":"img/user.jpg"},{"name":"Bakke Medina","followers":"257","following":"151","avatar":"img/user.jpg"},{"name":"Samuel Murillo","followers":"247","following":"11","avatar":"img/user.jpg"},{"name":"Gabriel Aumala","followers":"24357","following":"15331","avatar":"img/user.jpg"},{"name":"Luis Del Pezo","followers":"2987","following":"31","avatar":"img/user.jpg"},{"name":"Nancy Loaiza","followers":"2807","following":"931","avatar":"img/user.jpg"},{"name":"Mario Del Pezo","followers":"24990","following":"131","avatar":"img/user.jpg"},{"name":"Mayra Galan","followers":"89997","following":"153251","avatar":"img/user.jpg"}]';
	var start = '<div id="user_perfil" class="row"><div class="mdl-card mdl-shadow--4dp text-center"><div class="mdl-card__media"><img src="';
	var preName = '" width="300" height="300" border="0"alt="" style="padding:10px;" class="img-responsive center-block img-circle text-center"></div><div class="mdl-card__supporting-text"><a href="#" class="card-title">';
	var preFollowers = '</a></div><p class="card" style="margin-left:16px">Seguidores: ';
	var preFollowing = '<br>Siguiendo: ';
	var end = '</p><div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" data-toggle="modal" data-target="#cdf" style="float:none">'
  								+'<i class="material-icons">textsms</i></button></div></div>';
	var out = "";
	
	var Usuarios = JSON.parse(cadenaUsuarios);  
	for (i=0; i<Usuarios.length; i++){
		var jObject = Usuarios[i];
		if($('select[id=seguidores_select]').val() == jObject.name){
			out += start + jObject.avatar + preName + jObject.name + preFollowers + jObject.followers + preFollowing + jObject.following + end;
		}
	}
	console.log(out);
	document.getElementById('user_perfil').innerHTML = out;
	});
	$('#cdf').modal({ show: false});

});


