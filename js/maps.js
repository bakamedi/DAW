var map;
var directionsDisplay;
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
	});	   
}


google.maps.event.addDomListener(window, 'load', initializeMap);
