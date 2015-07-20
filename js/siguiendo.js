function processMyFollowers(jArray){
	var i;
	var start = '<div id="followersRow" class="row"><div class="mdl-card mdl-shadow--4dp"><div class="mdl-card__media"><img src="';
	var preName = '" width="120" height="120" border="0"alt="" style="padding:10px;"></div><div class="mdl-card__supporting-text"><a href="#" class="card-title">';
	var preFollowers = '</a></div><p class="card" style="margin-left:16px">Seguidores: ';
	var preFollowing = '<br>Siguiendo: ';
	var end = '</p><div><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored">'
  								+'<i class="material-icons">textsms</i></button></div></div>';
	var out = "";
	for (i=0; i<jArray.length; i++){
		var jObject = jArray[i];
		out += start + jObject.avatar + preName + jObject.name + preFollowers + jObject.followers + preFollowing + jObject.following + end;
	}
	console.log(out);
	document.getElementById('followersRow').innerHTML = out;
}



function getMyFollowers(){
	handleJSON('json/siguiendo.json', processMyFollowers);
}



window.addEventListener("load", getMyFollowers, false);