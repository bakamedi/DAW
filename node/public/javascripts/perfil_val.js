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

function iniciarRuta(inicioX,inicioY,destinoX,destinoY){
    var mapaRutaSeguidor = {
      center:new google.maps.LatLng(inicioX,inicioY),
      zoom:15,
      mapType:google.maps.MapTypeid.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("mapaSeguidor"),mapaRutaSeguidor);
    var lugarInicio = new google.maps.LatLng(inicioX,inicioY);
    var lugarFinal  = new google.maps.LatLng(destinoX,destinoY);
    var rutaSeguidor = [lugarInicio,lugarFinal];
    //var path = 
    var trazoVuelo = new google.maps.Polyline({path:rutaSeguidor,strokeColor:"#0000FF",strokeOpacity:0.8,strokeWeight:3});
    trazoVuelo.setMap(map);
}
google.maps.event.addDomListener(window,'load',iniciarRuta);

//window.addEventListener('load', loadScript, false);
//window.onload = loadScript;
document.getElementById('files').addEventListener('change', archivo, false);