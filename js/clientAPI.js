var myRoutes = []
function handleJSON(url, callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		console.log("ready " + xmlhttp.status);
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var myArr = JSON.parse(xmlhttp.responseText);
			console.log("200");
    	callback(myArr);
  	}
	}
  xmlhttp.overrideMimeType("application/json");
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function processFollowersNotifications(jArray){
	var i;
	var start = '<div class="near-container"><div class="nearby-fllwr"><li><dt>';
	var mid1 = '</dt><dd>';
	var end = '</dd></li></div></div>';
	var end_ready = '</dd></li></div><span class="label label-success ">Listo</span></div>';
	var out = "";
	for (i=0; i<jArray.length; i++){
		if(jArray[i].ready == "1")
			out += start + jArray[i].name + mid1 + 'A ' + jArray[i].dist + 'm de la ruta'	+ end_ready + '<hr>';
		else
			out += start + jArray[i].name + mid1 + 'A ' + jArray[i].dist + 'm de la ruta'	+ end + '<hr>';
	}
	console.log(out);
	document.getElementById('active-follower-list').innerHTML = out;
}

function getDias(binary){
	var out = "";
	if(binary == "0000000")
		return "N/A";
	if(binary == "1111111")
		return "Todos";
	else if(binary == "1111100")
		return "Lunes a Viernes";
	else{
		if(binary.charAt(0) == '1')
			out += "Lunes, ";
		if(binary.charAt(1) == '1')
			out += "Martes, ";		
		if(binary.charAt(2) == '1')
			out += "Miercoles, ";
		if(binary.charAt(3) == '1')
			out += "Jueves, ";
		if(binary.charAt(4) == '1')
			out += "Viernes, ";
		if(binary.charAt(5) == '1')
			out += "Sabado, ";
		if(binary.charAt(6) == '1')
			out += "Domingo, ";
		return out.substring(0, out.length-2);
	}
	return null;
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
	var start = '<div onmouseover="this.style.backgroundColor="#CEF6F5"" onmouseout="this.style.backgroundColor="#FFFFFF"" id="Usu_seguidos_sub" class="col-md-3"><img src="';
	var preName = '" id="imagen_seguidos"/><p>';
	var preFollowers = '</p><h5><strong>Seguidores:</strong> ';
	var preFollowing = '</h5><h5><strong>Siguiendo:</strong> ';
	var end = '</h5></div>';
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


function getFollowersNotifications(){
	handleJSON('json/followersNotifications.json', processFollowersNotifications);
}

function getMyFollowers(){
	handleJSON('json/followers.json', processMyFollowers);
}

function clearFollowersNotification(){
	document.getElementById('active-follower-list').innerHTML = "";
}

function clearRutasColumn(){
	document.getElementById('rutasUL').innerHTML = "";
}

