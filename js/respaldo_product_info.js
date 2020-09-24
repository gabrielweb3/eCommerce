

function showProduct(array){

    let htmlContentToAppend = "";

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="infoP">
                        <h1 id="vehiculo">`+ array.name + `</h1>
                        <h5><strong>Precio</strong></h5>
                        <h7>`+  array.currency + ' ' + array.cost + `</h7><br>
                        <h5><strong>Descripcion</strong></h5>
                        <h7>`+ array.description + `</h7><br>
                        <h5><strong>Categoria</strong></h5>
                        <h7>`+ array.category + `</h7><br>
                        <h5><strong>Cantidad de vendidos</strong></h5>
                        <h7>` + array.soldCount + ` artículos<h7><br>
                    </div>  
                    <div class="imag">
                        <img src="` + array.images[0] + `" class="img-thumbnail" id="img1">
                        <img src="` + array.images[1] + `" class="img-thumbnail" id="img1">
                        <img src="` + array.images[2] + `" class="img-thumbnail">
                        <img src="` + array.images[3] + `" class="img-thumbnail">
                        <img src="` + array.images[4] + `" class="img-thumbnail">
                    </div>
                </div>
            </div>
            `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

    function mostrar_comentarios(array){
        let htmlContentToAppend = "";
        let estrella="";

        for(let i=0; i<array.length; i++){

            if(array[i].score === 5){
                estrella = '★★★★★';
            }
            if(array[i].score === 4){
                estrella = '★★★★';
            }
            if(array[i].score === 3){
                estrella = '★★★';
            }
            if(array[i].score === 2){
                estrella = '★★';
            }
            if(array[i].score === 1)
            {estrella = '★';}

                //var calificacion = Int16Array(estrella)*Int16Array(array[i].score);
    
                htmlContentToAppend += `
                    <div id="ind_coments">
                        <p id="user_score">`+ array[i].user + ' - ' +  estrella + `</p>
                        <p id="date">`+ array[i].dateTime + `</p>
                        <p>`+ array[i].description + `</p>
                    </div>    
                    <br>
                `
            document.getElementById("lista_comentarios").innerHTML = htmlContentToAppend;
        }
    }


//<p>` + array.description + `</p>

var comentario = [];//array para almacenar informacion del comentario

var enviar = document.getElementById('enviar'); //variable de boton enviar


function add_comentarios(){ // funcion de agregar comentarios

    var nombre = document.getElementById('nombre').value; //tomo valores que ingresa el usuario en el form
    var coment = document.getElementById('texto_coment').value;
    var puntos = document.getElementById('puntos').value;

    comentario.push(nombre);
    comentario.push(coment);
    comentario.push(puntos);
    
    console.log(comentario);
    mostrar(comentario);

}

function mostrar(comentario){
    var parrafo = '<p>';

    for(i=0; i<comentario.length; i++){

        parrafo+= '<p> '+ comentario[i] +'</p><br>';
    }
    parrafo+='</p>';
    document.getElementById('comentarios').innerHTML += parrafo;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            info_producto = resultObj.data;

            showProduct(info_producto);
 
            }
        });

});

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            comentarios = resultObj.data;

            mostrar_comentarios(comentarios);
 
            }
        });

});