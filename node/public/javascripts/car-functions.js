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


function getTimeInteger(time){
        var hour = $("#routehour").index();
        var min = $("#routemin").index();
        return hour * 60 + min;
	}
function clearNewDataForm(){
    $('#routetime').index(0);
    $('#routemin').index(0);
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
	if(checkDay('Lunes'))
            out += ",l"; 
        if(checkDay('Martes'))
            out += ",m"; 
        if(checkDay('Miercoles'))
            out += ",x"; 
        if(checkDay('Jueves'))
            out += ",j"; 
        if(checkDay('Viernes'))
            out += ",v"; 
        if(checkDay('Sabado'))
            out += ",s"; 
        if(checkDay('Domingo'))
            out += ",d"; 
        if(out.length > 0)
            return out.substring(1);
        else return "";
}

function nuevaMapData(){
    console.log("nuevaMapData");
    if(!agregandoData){

        clearRuta();
        escogerInicio();
        google.maps.event.addListener(map, 'click', addLatLng);
    }
}



function submitContent(){
    var myNewData = [];
    myNewData.name = $('#routename').val();
    if(!isValidAlphaNumericName(replaceWhitespace(name))){
        console.log("wrong name");
        return;
    }
    
    myNewData.dias = constructDays();
    if(myNewData.dias.length == 0)
    {
        console.log("wrong days");
        return;
    }

    myNewData.hora = getTimeInteger();

    var positions = [];
    var obj = [];
    obj.x = start.position.G;
    obj.y = start.position.K;
    positions.push(obj);

    obj = [];
    obj.x = end.position.G;
    obj.y = end.position.K;
    positions.push(obj);

    console.log("waypts listos" + positions + " " + myNewData.hora + " " + myNewData.name + " " + myNewData.dias);
    $.post( "/nuevaRuta",
            { 
                nombre : myNewData.name,
                dias   : myNewData.dias,
                puntos : positions,
                hora   : myNewData.hora 
            },
            function( data ) {
                myRoutes[replaceWhitespace(myNewData.name)] = [start.position, end.position];
                clearRutasColumn();
                addRoute(myNewData);
                //getMyRoutes();
                agregandoData = false;
                console.log("chao " + agregandoData);
                clearNewDataForm();
            });
    }
    
