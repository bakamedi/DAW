function loadData(){
    getMyRoutes();
    getMyFollowers();
}

function checkDay(day){
	if($('#check' + day).is(':checked'))
		return '1';
	else 
		return '0';
}

function getPageType(){
    return "car";
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

function nuevaRuta(){
    console.log("nuevaRuta");
    if(!agregandoRuta){

        clearRuta();
        escogerInicio();
        google.maps.event.addListener(map, 'click', addLatLng);
    }
}



function submitContent(){
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
}
    
