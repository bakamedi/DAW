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

function initialize()
{
  var mapProp = {
    center: new google.maps.LatLng(51.508742,-0.120850),
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function loadScript()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;
document.getElementById('files').addEventListener('change', archivo, false);