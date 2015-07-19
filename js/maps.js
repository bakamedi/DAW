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
var blinkHandler = null;
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
				//navigator.geolocation.getCurrentPosition(marksFromCurrentPos);
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

function removeForm(){
    $("#newRouteForm").toggleClass("invisible");
    $("#rutasUL").toggleClass("invisible");
}	
function placeForm(){
    $("#rutasUL").toggleClass("invisible");
    $("#newRouteForm").toggleClass("invisible");
    }
function blinker() {
    $('.blink_me').fadeOut(800);
    $('.blink_me').fadeIn(800);
    console.log("blink");
}

function finishNewRoute(){
	google.maps.event.clearListeners(map, 'click');
        if(blinkHandler != null){
            console.log("finish");
            window.clearInterval(blinkHandler);
        }
	$('#pickRoute').fadeOut(function(){
            console.log("invinsible out");
		$('#pickRoute').toggleClass("invisible");
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
				pickRoute.innerHTML = "Selecciona el destino de la nueva ruta";
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
    console.log("routes cleared");
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


function escogerInicio(){
	agregandoRuta = true;
        $("#pickRoute").attr("style", "");
	$("#pickRoute").toggleClass("invisible");
        blinkHandler = setInterval(blinker, 1600);
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

function nuevaRuta(){
    console.log("nuevaRuta");
    if(!agregandoRuta){

        clearRuta();
        escogerInicio();
        google.maps.event.addListener(map, 'click', addLatLng);
    }
}

function cleanNewRouteForm(){
    $('#routetime').val("");
    $('#routename').val("");
    $('#checkLunes').prop('checked', false);
    $('#checkMartes').prop('checked', false);
    $('#checkMiercoles').prop('checked', false);
    $('#checkJueves').prop('checked', false);
    $('#checkViernes').prop('checked', false);
    $('#checkSabado').prop('checked', false);
    $('#checkDomingo').prop('checked', false);
}

function abortNewRoute(){
    $('#pickRoute').addClass('invisible');
    agregandoRuta = false;
}

//JQuery Events
$(document).ready( function(){
        //Guardar la nueva ruta
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
                //getMyRoutes();
                agregandoRuta = false;
                console.log("chao " + agregandoRuta);
                cleanNewRouteForm();
                });

        //Mostrar gente cerca cuando das click a una ruta
	$("body").on('click', 'li.misRutas', function(){                
                abortNewRoute();
                clearRuta();
		clearFollowersNotification();
		showRuta(replaceWhitespace($(this).attr('data-name')));
		$('li.misRutas').removeClass("active");
		$(this).toggleClass("active");
		getFollowersNotifications();
	});

        //Mostrar el popup de followers cuando das click en el boton
	$('#followers-btn').click(function(){
		console.log("click");
		$('#myModal_siguiendo').modal('show');
	});

	$('#myModal_siguiendo').modal({ show: false});

});


google.maps.event.addDomListener(window, 'load', initializeMap);
getMyRoutes();
getMyFollowers();

