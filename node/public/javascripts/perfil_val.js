function archivo(evt) {
    var files = evt.target.files; // FileList object
    // Obtenemos la imagen del campo "file".
    for (var i = 0, f; f = files[i]; i++) {
        //Solo admitimos imágenes.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                // Insertamos la imagen
                document.getElementById("list").innerHTML = ['<img id="imaUser" class="img-responsive center-block img-circle text-center" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
            };
        })(f);
        reader.readAsDataURL(f);
    }
}

function habilitaImagenDiv(){
    var formularioImagen = document.getElementById("formularioImagen");
    formularioImagen.setAttribute("style","display:normal;");
}

function desabilitaImagenDiv(){
    var formularioImagen = document.getElementById("formularioImagen");
    formularioImagen.setAttribute("style","display:none;");
}

///<reference path="js/google-maps-3-vs-1-0.js">
var map;
var waypts = [];
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var latitud;
var longitud;

var posFinal;
var posInicial;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
}

function verRuta(posInicioX,posInicioY,posFinalX,posFinalY) {

    //posFinal = new google.maps.LatLng(-2.145436, -79.965878);
    posFinal = new google.maps.LatLng(posFinalX, posFinalY);
    var marker = new google.maps.Marker({
        position: posFinal,
        title: '#',
        draggable: true,
        map: map
    });

    posInicial = new google.maps.LatLng(posInicioX, posInicioY);
    var marker = new google.maps.Marker({
        position: posInicial,
        title: '#',
        draggable: true,
        map: map
    });

    var request = {
        origin: posInicial,
        destination: posFinal,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            //for each route, display summary information
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + 'to';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        }
    });
}

function mapa(id) {
    getLocation();
    directionsDisplay = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition(function (position) {
        //ubicacion actual del usuario
        var posicionOriginal = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //opciones del mapa
        var mapOptions = {
            zoom: 17,
            center: posicionOriginal,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var marker = new google.maps.Marker({
            position: posicionOriginal,
            animation: google.maps.Animation.BOUNCE
        });

        marker.setMap(map);

        //muetsra el mapa
        map = new google.maps.Map(document.getElementById(id), mapOptions);
        var div = document.getElementById(id);
        var map = new google.maps.Map(div, mapOptions);
        marker.setMap(map);

        directionsDisplay.setMap(map);
        //agrega un manejador del vento click sobre el mapa
        //google.maps.event.addListener(map, 'click', addLatLng);
    });
}

function initialize() {
    getLocation();
    directionsDisplay = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition(function (position) {
        //ubicacion actual del usuario
        var posicionOriginal = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //opciones del mapa
        var mapOptions = {
            zoom: 17,
            center: posicionOriginal,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var marker = new google.maps.Marker({
            position: posicionOriginal,
            animation: google.maps.Animation.BOUNCE
        });

        marker.setMap(map);

        //muetsra el mapa
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var div = document.getElementById('map-canvas');
        var map = new google.maps.Map(div, mapOptions);
        marker.setMap(map);

        directionsDisplay.setMap(map);
        //agrega un manejador del vento click sobre el mapa
        //google.maps.event.addListener(map, 'click', addLatLng);
    });
}

function addLatLng(event) {
    //agrega u nuevo marcaddo en el mapa
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(event.latLng.A, event.latLng.F),
        title: '#',
        draggable: true,
        map: map
    });

    if (start == null) {
        start = new google.maps.LatLng(event.latLng.A, event.latLng.F);
        return;
    }
    else if (end == null) {
        end = new google.maps.LatLng(event.latLng.A, event.latLng.F);
    }
    else {
        waypts.push({
            location: end,
            stopover: false
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
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            //for each route, display summary information
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + 'to';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        }
    });

}
//window.onload = verRuta;
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', verRuta);
//window.addEventListener('load', loadScript, false);
//window.onload = loadScript;

document.getElementById('files').addEventListener('change', archivo, false);