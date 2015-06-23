var map;
var waypts = [];
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

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

function finishNewRoute(){
	console.log("finish");
	google.maps.event.clearListeners(map, 'click');
	$('.mensaje').fadeOut(function(){
		$('.mensaje').remove();
	});
}
function addLatLng(event){
    //Agrega un nuevo marcador en el mapa
    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event.latLng.A, event.latLng.F),
	title: '#',
	draggable:true,
	map: map
    });

    if(start == null){
	start = new google.maps.LatLng(event.latLng.A, event.latLng.F);
	return;
    }
    else if (end == null){
			end = new google.maps.LatLng(event.latLng.A, event.latLng.F);    
			finishNewRoute();
		}
    else {
	waypts.push({
	    location:end,
	    stopover:false
	});
         end = new google.maps.LatLng(event.latLng.A, event.latLng.F);
    }

    var request = {
	origin: start,
	destination: end,
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
	start = new google.maps.LatLng(x, y);

}

function escogerDestino(){
	console.log("escogerDestino");
	var message = document.createElement("h3");	
	message.innerHTML = "Selecciona el destino de la nueva ruta."
	message.setAttribute("class", "mensaje");
	$("#navbar-left").append(message);
}

$(document).ready( function(){
	$("button").click( function(){
		escogerDestino();
		google.maps.event.addListener(map, 'click', addLatLng);
	});
});
google.maps.event.addDomListener(window, 'load', initializeMap);
