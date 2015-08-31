var map;
var waypts = [];
var locations = [];
var whitespace = "NbSp1";
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var agregandoData = false;
var message;
var blinkHandler = null;
var currentPosition = null;
/*
function addDefaultRoutes(){
		myRoutes["Home"] = [new google.maps.LatLng(-2.1445351790, -79.96751056), new google.maps.LatLng(-2.140574, -79.864637)];
		myRoutes["Trabajo"] = [new google.maps.LatLng(-2.1445351790, -79.96751056), new google.maps.LatLng(-2.160446, -79.899795)];
}*/
function initializeMap(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition(function (position) {

	currentPosition = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
        console.log(currentPosition);
	 			//Opciones del mapa
				var mapOptions = {
	    			zoom: 17,
	    			center: currentPosition
				}

        //Muestra el mapa
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				directionsDisplay.setMap(map);
 				//Agrega un manejador del evento click sobre el mapa
				//google.maps.event.addListener(map, 'click', addLatLng);
				//navigator.geolocation.getCurrentPosition(marksFromCurrentPos);
	});	   
}

function replaceWhitespace(name){
    return name.replace(' ', whitespace);
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

function finishNewRoute(){
	//google.maps.event.clearListeners(map, 'click');
        if(blinkHandler != null){
            console.log("finish");
            window.clearInterval(blinkHandler);
        }
        placeForm();

	/**$('#pickRoute').fadeOut(function(){
            console.log("invinsible out");
		$('#pickRoute').toggleClass("invisible");
        });*/

}

function escogerInicio(){
	agregandoData = true;
        $("#pickRoute").attr("style", "");
	$("#pickRoute").toggleClass("invisible");
        blinkHandler = setInterval(blinker, 1600);
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



function returnWhitespace(name){
		return name.replace(whitespace, " ");
}
function addLatLng(event){
    //Agrega un nuevo marcador en el mapa
		//
    var propValue;
    for(var propName in event.latLng) {
            propValue = event.latLng[propName]

                console.log(propName,propValue);
    }
    console.log("clicked :" + event.latLng.G + " " +  event.latLng.K);
    var marker = new google.maps.Marker({
    		position: event.latLng,
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
                        pickRoute.innerHTML = "Agrega puntos intermedios donde puedas recoger/dejar pasajeros";
			finishNewRoute();
    }
    else {
        marker.stopover = false;
	waypts.push(marker.position);
	locations.push(marker.position);
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
    console.log(pos1 + "|" + pos2);
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
            console.log("directions OK");
            directionsDisplay.setDirections(response);
        }
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

function showDestino(name){
    var pos = myDest[name];
    if(pos != null)
        addRouteMarkers(currentPosition, pos);
}

function abortNewRoute(){
    $('#pickRoute').addClass('invisible');
    agregandoData = false;
}

//JQuery Events
$(document).ready( function(){
        //Guardar la nueva ruta
        $("body").on('click', '#submitRoute', function(){
                submitContent();
        });
        $("body").on('click', '#nuevaDataPopup', function(){
            console.log('nuevadata');
            nuevaMapData();
        });

        //Mostrar gente cerca cuando das click a una ruta
	$("body").on('click', 'li.misRutas', function(){                
                abortNewRoute();
                clearRuta();
		clearFollowersNotification();
                if(getPageType() == "car"){
		    showRuta(replaceWhitespace($(this).attr('data-name')));
                    getFollowersNotifications();
                }else{
		    showDestino(replaceWhitespace($(this).attr('data-name')));
                    getFollowingsNotifications();
		}$('li.misRutas').removeClass("active");
		$(this).toggleClass("active");
	});

        //Mostrar el popup de followers cuando das click en el boton
        /**
	$('#followers-btn').click(function(){
		console.log("click");
		$('#myModal_siguiendo').modal('show');
	});

	$('#myModal_siguiendo').modal({ show: false});
        */

});


google.maps.event.addDomListener(window, 'load', initializeMap);
loadData();
if(getPageType() == "car"){
    getFollowersNotifications();
}else{
    getFollowingsNotifications();
		}
