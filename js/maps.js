var map;
var waypts = [];
var locations = [];
var whitespace = "NbSp1";
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var agregandoRuta = false;
var message;
/*
function addDefaultRoutes(){
		myRoutes["Home"] = [new google.maps.LatLng(-2.1445351790, -79.96751056), new google.maps.LatLng(-2.140574, -79.864637)];
		myRoutes["Trabajo"] = [new google.maps.LatLng(-2.1445351790, -79.96751056), new google.maps.LatLng(-2.160446, -79.899795)];
}*/
function initializeMap(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition(function (position) {
			 
        var espol = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
	 			//Opciones del mapa
				var mapOptions = {
	    			zoom: 17,
	    			center: espol
				}

        //Muestra el mapa
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				directionsDisplay.setMap(map);
 				//Agrega un manejador del evento click sobre el mapa
				//google.maps.event.addListener(map, 'click', addLatLng);
				navigator.geolocation.getCurrentPosition(marksFromCurrentPos);
	});	   
}

function isValidAlphaNumericName(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58 && i > 0) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

function placeForm(){
	var res = '<form style="margin:6px" onsubmit="return false"><h3 class="form-text">Nueva Ruta</h3><span class="form-text">Nombre:</span><br><input type="text" style="width:100%" id="routename"><br><span class="form-text">Hora de partida:</span><br><input type="text"style="width:100%" id="routetime"><br>';
	res += '<input type="checkbox" id="checkLunes" name="Lunes"><span class="form-text"> Lunes</span><br>';
	res += '<input type="checkbox" id="checkMartes" name="Martes"><span class="form-text"> Martes</span><br>';
	res += '<input type="checkbox" id="checkMiercoles" name="Miércoles"><span class="form-text"> Mi&eacutercoles</span><br>';
	res += '<input type="checkbox" id="checkJueves" name="Jueves"><span class="form-text"> Jueves</span><br>';
	res += '<input type="checkbox" id="checkViernes" name="Viernes"><span class="form-text"> Viernes</span><br>';
	res += '<input type="checkbox" id="checkSabado" name="Sábado"><span class="form-text"> S&aacutebado</span><br>';
	res += '<input type="checkbox" id="checkDomingo" name="Domingo"><span class="form-text"> Domingo</span><br>';
	res += '<input type="submit" class="form-text" id="submitRoute" style="margin:8px" value="Submit"></form>';
	document.getElementById('rutasUL').innerHTML = res;
}	

function finishNewRoute(){
	console.log("finish");
	google.maps.event.clearListeners(map, 'click');
	$('.mensaje').fadeOut(function(){
		$('.mensaje').remove();
		placeForm();
	});
}

function replaceWhitespace(name){
		return name.replace(' ', whitespace);
}

function returnWhitespace(name){
		return name.replace(whitespace, " ");
}
function addLatLng(event){
    //Agrega un nuevo marcador en el mapa
		//
    var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(event.latLng.A, event.latLng.F),
				title: '#',
				draggable:true,
				map: map
    });

    if(start == null){
				start = marker;
				message.innerHTML = "Selecciona el destino de la nueva ruta";
				return;
    }
    else if (end == null){
			end = marker;
			finishNewRoute();
		}
    else {
				waypts.push(marker);
				locations.push(marker.position);
				end = marker;
		}

    var request = {
	origin: start.position,
	destination: end.position,
	waypoints: waypts,
	optimizeWaypoints: true,
	travelMode: google.maps.TravelMode.DRIVING
    };

		directionsService.route(request, function (response, status) {
        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);
				}
		});


    
}

function clearRuta(){
	if(start != null)
		start.setMap(null);
		if(end != null)
		end.setMap(null);
	start = null;
	end = null;
	waypts = []
}

function addRouteMarkers(pos1, pos2){
    //Agrega un nuevo marcador en el mapa
		//
    var marker1 = new google.maps.Marker({
    		position: pos1,
				title: '#',
				draggable:true,
				map: map
    });
    var marker2 = new google.maps.Marker({
    		position: pos2,
				title: '#',
				draggable:true,
				map: map
    });
		start = marker1;
		end = marker2;
    var request = {
			origin: pos1,
			destination: pos2,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING
    };

		directionsService.route(request, function (response, status) {
        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);
				}
		});

}


function marksFromCurrentPos(position){
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    console.log('latitude :' + x);
    console.log('longitude :' + y);
    var marker1 = new google.maps.Marker({
	    	position: new google.maps.LatLng(x,y),
	    	title: '#',
	    	draggable:true,
	    	map: map
    });
		start = marker1;

}

function escogerInicio(){
	agregandoRuta = true;
	message = document.createElement("h3");	
	message.innerHTML = "Selecciona el inicio de la nueva ruta."
	message.setAttribute("class", "mensaje");
	$("#navbar-left").append(message);
}

function guardarRuta(){
	var name = $('#formName').val()	;
	console.log("valor: " + name);
	var keyname = replaceWhitespace(name);
	//Si el nombre es valido, agrego la ruta
	if (name.length > 0 && isValidAlphaNumericName(keyname))
		$('.bar-item').fadeOut(function(){
			$('.bar-item').remove();
			console.log("guardandoruta");
			var a = document.createElement("a");
			a.setAttribute("href", "#");
			a.innerHTML = name;
			var li = document.createElement("li");
			li.setAttribute("class", "misRutas");
			li.appendChild(a);
			$("#rutasUL").append(li);
			//guardar posiciones
			myRoutes[keyname] = [start.position, end.position];

		});
}
function nombrarRuta(){
	console.log("nombrarRuta");
	var form = document.createElement("form");
	form.setAttribute("class", "navbar-form navbar-left bar-item");
	form.setAttribute("role", "search");
	form.setAttribute("onsubmit", "return false"); //Estupido hack para que no se reinice la ventana
	var div = document.createElement("div");	
	div.setAttribute("class", "input-group");
	var input = document.createElement("input");	
	input.setAttribute("type", "text");
	input.setAttribute("class", "form-control");
	input.setAttribute("id", "formName");
	input.setAttribute("placeholder", "Nombre para esta ruta");
	var button = document.createElement("button");
	button.setAttribute("class", "btn btn-default");
	button.setAttribute("type", "submit");
	button.setAttribute("id", "submitName");
	button.innerHTML = "Guardar";
	div.appendChild(input);
	form.appendChild(div);
	form.appendChild(button);
	$("#navbar-left").append(form);


}

function showRuta(name){
	console.log("ruta: " + name);
	var pos = myRoutes[name];
	if(pos != null)
		addRouteMarkers(pos[0], pos[1]);
	else
		console.log(name + " no esta en lista");
}

function checkDay(day){
	if($('#check' + day).val())
		return '1';
	else 
		return '0';
}
function constructDays(){
	var out = "";
	out += checkDay('Lunes');
	out += checkDay('Martes');
	out += checkDay('Miercoles');
	out += checkDay('Jueves');
	out += checkDay('Viernes');
	out += checkDay('Sabado');
	out += checkDay('Domingo');
	return out;
}

function isValidHour(time){
	var i;
	for(i = 0; i < time.length; i++){
		var c = time.charAt(i);
		var code = time.charCodeAt(i);
		if (!(code > 47 && code < 58 ) && !(c == ':'))
			return false;
	}
	if(time.indexOf(':') == -1)
		return false;
	var arr = time.split(':');
	if(arr.length > 2)
		return false;
	/*
	if((parseInt(arr[0]) < 0) || (parseInt(arr[0]) > 23))
		return false;
	if((parseInt(arr[1]) < 0) || (parseInt(arr[1]) > 59))
		return false;*/
return true;
}
//JQuery Events
$(document).ready( function(){
	$("#nuevaRuta").click( function(){
		if(agregandoRuta)
			return;
		clearRuta();
		escogerInicio();
		google.maps.event.addListener(map, 'click', addLatLng);
		agregandoRuta = false;
	});

	$("body").on('click', '#submitName', function(){
		guardarRuta();
	});
$("body").on('click', '#submitRoute', function(){
	//Validar contenidos de la ruta;
	var newRoute = [];
	newRoute.name = $('#routename').val();
	if(!isValidAlphaNumericName(replaceWhitespace(name))){
		console.log("wrong name");
		return;
	}
	newRoute.hora = $('#routetime').val();
	if(!isValidHour(newRoute.hora)){
		console.log("wrong time");
		return;
	}
	newRoute.dias = constructDays();
	myRoutes[replaceWhitespace(newRoute.name)] = [start.position, end.position];
	clearRutasColumn();
	addRoute(newRoute);
	getMyRoutes();
	});


	$("body").on('click', 'li.misRutas', function(){
		clearRuta();
		clearFollowersNotification();
		showRuta(replaceWhitespace($(this).attr('data-name')));
		$('li.misRutas').removeClass("active");
		$(this).toggleClass("active");
		getFollowersNotifications();
	});
});
google.maps.event.addDomListener(window, 'load', initializeMap);
getMyRoutes();
//getMyFollowers();

