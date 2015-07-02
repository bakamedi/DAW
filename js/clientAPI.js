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
	document.getElementById('active-follower-list').innerHTML = out;
}

function processMyRoutes(jArray){
	var i;
	var start = '<li class="misRutas"><a href="#">';	
	var end = '</a></li>';
	var out = "";
	for (i=0; i<jArray.length; i++){
		var jObject = jArray[i];
		myRoutes[jObject.name] = [new google.maps.LatLng(jObject.startX, jObject.startY), new google.maps.LatLng(jObject.endX, jObject.endY)];
		out += start + jObject.name + end;
	}
	console.log(out);
	document.getElementById('rutasUL').innerHTML = out;
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


