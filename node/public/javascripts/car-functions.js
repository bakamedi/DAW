function loadData(){
    getMyRoutes();
}

function checkDay(day){
	if($('#check' + day).is(':checked'))
		return true;
	else 
		return false;
}

function getPageType(){
    return "car";
}


function getTimeInteger(time){
        var hour = $("#routehour")[0].selectedIndex;
        var min = $("#routemin")[0].selectedIndex;
        console.log(hour + " " + min);
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
            out += ",1"; 
        if(checkDay('Martes'))
            out += ",2"; 
        if(checkDay('Miercoles'))
            out += ",3"; 
        if(checkDay('Jueves'))
            out += ",4"; 
        if(checkDay('Viernes'))
            out += ",5"; 
        if(checkDay('Sabado'))
            out += ",6"; 
        if(checkDay('Domingo'))
            out += ",7"; 
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
    if(myNewData.dias.length === 0)
    {
        console.log("wrong days");
        return;
    }
    console.log(JSON.stringify(locations));

    myNewData.hora = getTimeInteger();
/*
    var positions = [];
    //START POINT
    var obj = {
    x : start.position.G,
    y : start.position.K
    };
    positions.push(obj);
   //WAYPOINTS 
    for(point in locations){
        positions.push(point);
    }
    //END POINT
    var obj2 ={
    x : end.position.G,
    y : end.position.K
    };
    positions.push(obj2);
*/
    console.log("waypts listos" + JSON.stringify(locations) + " " + myNewData.hora + " " + myNewData.name + " " + myNewData.dias);
    var str = JSON.stringify(locations);
    $.post( "/nuevaRuta",
            { 
                nombre : myNewData.name,
                hora   : myNewData.hora,
                dias   : myNewData.dias,
                array  : str
            },
            function( data ) {
                myRoutes[replaceWhitespace(myNewData.name)] = [start.position, end.position];
                clearRutasColumn();
                addRoute(myNewData);
                //getMyRoutes();
                agregandoData = false;
                console.log("chao " + agregandoData);
                clearNewDataForm();
                res = JSON.parse(data);
                console.log(res.status);
                    if(res.status == 200){
                        $("body").load('/driver?error=0');
                    }else
                        console.log(data);

            });
    }
    
