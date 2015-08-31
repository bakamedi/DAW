var myRoutes = [];
var myDest = []
function handleJSON(url, callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		//console.log("ready " + xmlhttp.status);
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //console.log(xmlhttp.responseText);
    	var myArr = JSON.parse(xmlhttp.responseText);
//			console.log("200");
    	callback(myArr);
  	}
	}
  xmlhttp.overrideMimeType("application/json");
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function processFollowersNotifications(jArray){
	var i;
	var start = '<div class="near-container"><dt>';
        var preDist = '</dt><dd>';
	var end = '</dd><div><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent notif-button ">Llevar</button></div><hr></div>';
	var out = "";
	for (i=0; i<jArray.length; i++){
	    out += start + jArray[i].name + preDist  + 'A ' + jArray[i].dist + 'm del punto de partida' + end;
	}
	console.log(out);
	document.getElementById('active-follower-list').innerHTML = out;
}

function processFollowingsNotifications(jArray){
	var i;
	var start = '<div class="near-container"><span class="time-text">en ';
	var mid1 = '</span><dt>';
        var preDist = '</dt><dd>';
	var end = '</dd><div><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent notif-button ">Llevame</button><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent notif-button">Ver Ruta</button></div><hr></div>';
	var out = "";
	for (i=0; i<jArray.length; i++){
	    out += start + jArray[i].time + mid1 + jArray[i].name + preDist  + 'A ' + jArray[i].dist + 'm del destino' + end;
	}
	console.log(out);
	document.getElementById('active-follower-list').innerHTML = out;
}
function getDias(binary){
	var out = "";
	if(binary === "0000000")
		return "N/A";
	if(binary === "1111111")
		return "Todos";
	else if(binary === "1111100")
		return "Lunes a Viernes";
	else{
		if(binary.charAt(0) === '1')
			out += "Lunes, ";
		if(binary.charAt(1) === '1')
			out += "Martes, ";		
		if(binary.charAt(2) === '1')
			out += "Miercoles, ";
		if(binary.charAt(3) === '1')
			out += "Jueves, ";
		if(binary.charAt(4) === '1')
			out += "Viernes, ";
		if(binary.charAt(5) === '1')
			out += "Sabado, ";
		if(binary.charAt(6) === '1')
			out += "Domingo, ";
		return out.substring(0, out.length-2);
	}
	return null;
}

function processMyDestinations(jArray){
	var i;
	var start = '<li class="misRutas" data-name="';
	var preName = '"><a href="#"><span style="font-size:28px">';	
	var end = '</span></a></li>';
	var out = "";
	for (i=0; i<jArray.length; i++){
		var jObject = jArray[i];
		myDest[jObject.name] = new google.maps.LatLng(jObject.endX, jObject.endY);
		out += start + jObject.name + preName + jObject.name + end;

	}
	//console.log(out);
	document.getElementById('rutasUL').innerHTML += out;
}

function addDest(jObject){
	var i;
	var start = '<li class="misRutas" data-name="';
	var preName = '"><a href="#"><span style="font-size:28px">';	
	var end = '</span></a></li>';
	var out = "";
        out += start + jObject.name + preName + jObject.name + end;


	//console.log(out);
	document.getElementById('rutasUL').innerHTML += out;
}

function processMyRoutes(jArray){
	var i;
	var start = '<li class="misRutas" data-name="';
	var preName = '"><a href="#"><span style="font-size:28px">';	
	var preHora = '</span><dd><span class="column-text" style="font-size:16px;">Hora de Partida:</span><span class="column-text" style="font-weight:lighter;font-size:14px;">';
	var preDias = '</span></dd><dd><span class="column-text" style="font-size:16px;">Dias:</span><span class="column-text" style="font-weight:lighter;font-size:14px;">';
	var end = '</span></dd></a></li>';
	var out = "";
	for (i=0; i<jArray.length; i++){
		var jObject = jArray[i];
		myRoutes[jObject.name] = [new google.maps.LatLng(jObject.startX, jObject.startY), new google.maps.LatLng(jObject.endX, jObject.endY)];
		out += start + jObject.name + preName + jObject.name + preHora + jObject.hora + preDias + getDias(jObject.dias) + end;
	}
	//console.log(out);
	document.getElementById('rutasUL').innerHTML += out;
}

function addRoute(jObject){
	var i;
	var start = '<li class="misRutas" data-name="';
	var preName = '"><a href="#"><span style="font-size:28px">';	
	var preHora = '</span><dd><span class="column-text" style="font-size:16px;">Hora de Partida:</span><span class="column-text" style="font-weight:lighter;font-size:14px;">';
	var preDias = '</span></dd><dd><span class="column-text" style="font-size:16px;">Dias:</span><span class="column-text" style="font-weight:lighter;font-size:14px;">';
	var end = '</span></dd></a></li>';
	var out = "";
//	myRoutes[jObject.name] = [new google.maps.LatLng(jObject.startX, jObject.startY), new google.maps.LatLng(jObject.endX, jObject.endY)];
	out = start + jObject.name + preName + jObject.name + preHora + jObject.hora + preDias + getDias(jObject.dias) + end;
	
	console.log(" new : " + out);
	document.getElementById('rutasUL').innerHTML += out;
}

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


function getMyRoutes(){
	handleJSON('json/myRoutes.json', processMyRoutes);
}

function getMyDestinations(){
	handleJSON('json/myDest.json', processMyDestinations);
}

function getFollowersNotifications(){
	handleJSON('json/followersNotifications.json', processFollowersNotifications);
}

function getFollowingsNotifications(){
	handleJSON('json/followingsNotifications.json', processFollowingsNotifications);
}
function getMyFollowers(){
	handleJSON('json/followers.json', processMyFollowers);
}

function clearFollowersNotification(){
	document.getElementById('active-follower-list').innerHTML = "";
}

function clearRutasColumn(){
	//document.getElementById('rutasUL').innerHTML = "";
        $("#newRouteForm").toggleClass("invisible");
        $("#rutasUL").toggleClass("invisible");
}

