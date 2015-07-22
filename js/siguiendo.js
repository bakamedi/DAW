function getMyFollowers(){
	var i;
	var cadenaUsuarios ='[{"name":"Luis Andrade","followers":"9000","following":"0","avatar":"img/user.jpg"},{"name":"Hector Jupiter","followers":"2457","following":"1531","avatar":"img/user.jpg"},{"name":"Carolina Alcivar","followers":"2457","following":"1531","avatar":"img/user.jpg"},{"name":"Bakke Medina","followers":"257","following":"151","avatar":"img/user.jpg"},{"name":"Samuel Murillo","followers":"247","following":"11","avatar":"img/user.jpg"},{"name":"Gabriel Aumala","followers":"24357","following":"15331","avatar":"img/user.jpg"},{"name":"Luis Del Pezo","followers":"2987","following":"31","avatar":"img/user.jpg"}]';
	var start = '<div><div class="col-md-3 mdl-shadow--4dp" style="margin:10px"><div class="mdl-card__media"><img src="';
	var preName = '" width="200" height="200" border="0"alt="" style="padding:10px;" class="img-responsive center-block img-circle text-center"></div><div class="mdl-card__supporting-text"><a href="#" class="card-title">';
	var preFollowers = '</a></div><p class="card text-center" style="margin-left:16px">Seguidores: ';
	var preFollowing = '<br><br>Siguiendo: ';
	var end = '</p><div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" data-toggle="modal" data-target="#cdf">'
  								+'<i class="material-icons">textsms</i></button></div></div>';
	var out = "";
	
	var Usuarios = JSON.parse(cadenaUsuarios);  
	for (i=0; i<Usuarios.length; i++){
		var jObject = Usuarios[i];
		out += start + jObject.avatar + preName + jObject.name + preFollowers + jObject.followers + preFollowing + jObject.following + end;
	}
	console.log(out);
	document.getElementById('followersRow').innerHTML = out;
}




$(document).ready(function(){
	$('#cdf').modal({ show: false});
});
window.addEventListener("load", getMyFollowers, false);
