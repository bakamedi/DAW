function loadData(){
    getMyDestinations();
}

function getPageType(){
    return "walk";
}

function replaceWhitespace(name){
    return name.replace(' ', whitespace);
}

function cleanNewRouteForm(){
    $('#routename').val("");
}

function nuevaRuta(){
    console.log("nuevaRuta");
    if(!agregandoRuta){

        clearRuta();
        escogerInicio();

    start = new google.maps.Marker({
    position: currentPosition,
        title: '#',
        draggable:true,
        map: map
    });
    google.maps.event.addListener(map, 'click', addLatLng);
    }
}


function submitContent(){
    var newDest = [];
    newDest.name = $('#routename').val();
    if(!isValidAlphaNumericName(replaceWhitespace(name))){
        console.log("wrong name");
        return;
    }
    myDest[replaceWhitespace(newDest.name)] =  end.position;
    clearRutasColumn();
    addDest(newDest);
    //getMyRoutes();
    agregandoRuta = false;
    console.log("chao " + agregandoRuta);
    cleanNewRouteForm();
}
 
