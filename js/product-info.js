
//esta funcion muestran la informacion del producto almacenada en el json de products-info
function showProduct(array){
    let htmlContentToAppend = "";
//se hace una sola muestra en pantalla porque el archivo es uno solo, y de un solo producto
//por lo tanto no se utiliza una ciclo de iteraciones para mostrar los elementos del json
            htmlContentToAppend += `
                <div class="row">
                    <div class="infoP">
                        <h1 id="vehiculo">`+ array.name +`</h1><button class="add_a_carrito" id="a_carrito" onclick="guardar_producto_en_carro();"><strong><i class="fa fa-shopping-cart"></i>Añadir a Mi Carrito</button>
                        <h5><strong>Precio</strong></h5>
                        <h7>`+  array.currency + ' ' + array.cost + `</h7><br><br>
                        <h5><strong>Descripcion</strong></h5>
                        <h7>`+ array.description + `</h7><br><br>
                        <h5><strong>Categoria</strong></h5>
                        <h7><a href="category-info.html">Autos</a></h7><br><br>
                        <h5><strong>Cantidad de vendidos</strong></h5>
                        <h7>` + array.soldCount + ` artículos<h7><br><br>
                        <h5><strong>Imagenes</strong></h5>
                    </div>  
                    <div class="imag">
                        <img src="` + array.images[0] + `" class="img-thumbnail">
                        <img src="` + array.images[1] + `" class="img-thumbnail">
                        <img src="` + array.images[2] + `" class="img-thumbnail">
                        <img src="` + array.images[3] + `" class="img-thumbnail">
                        <img src="` + array.images[4] + `" class="img-thumbnail">
                    </div>
                </div>
            `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

//var comentario = [];//array para almacenar informacion del comentario
//creo variables para tomar la fecha y hora de los comentarios

//funcion para ingresar comentarios nuevos, toma el nombre de usuario ingresado en el login, el comentarios ingresado en el cuadro de texto
//y el score que se expresa en cantidad de estrellitas, luego tomo la los datos de fecha y hora de la computadora para ingresarlos junto al comentario
//e imprimirlos en la pantalla
function comentario_nuevo() {
    //tomo las variables de los inputs y los imprimo en pantalla, con el mismo formato qe los comentarios
    var description = document.getElementById('comentario_user').value;
    var score = document.getElementById('puntos').value;
    var user = localStorage.getItem("user");
    //creo variables de fechas y horas una por una
    var dateTime = new Date();
    var ano = dateTime.getFullYear();
    var mes = dateTime.getMonth();
    var dia = dateTime.getDate();
    var hor = dateTime.getUTCHours();
    var min = dateTime.getMinutes();
    var seg = dateTime.getSeconds();
    //concteno las variables en una
    dateTime = ano + '-0' + mes + '-' + dia + ' ' + hor + ':' + min + ':' + seg;

    html = '';
    html += `
            <div id="ind_coments">
                <h6 id='user_score'><strong><i class="fas fa-user"></i>`+ user +' - '+ score +`</strong></h6>
                <p id="date">`+ dateTime + `</p>
                <p id="informacion_prod">`+ description + `</p>
            </div>    
            <br>
            `
    document.getElementById("lista_comentarios").innerHTML += html;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            info_producto = resultObj.data;
            
            // array que toma los indices para productos relacionados
            var related = info_producto.relatedProducts;

            //funcion de mostrar informacion del producto
            showProduct(info_producto);

            }
            //FUNCION PARA TOMAR PRODUCTOS RELACIONADOS
            getJSONData(PRODUCTS_URL).then(function(resultado){
                if (resultado.status === "ok"){
                    productos_relacionados = resultado.data;
                            
                    for(j=0; j<related.length; j++){
                        var producto_actual = productos_relacionados[related[j]]; //related es un array por eso se le llama por su indice
                        let html_relacionado = ''; //variable de string para texto html
                        html_relacionado = `
                        <div class="prod_rela" id="${producto_actual.name}">
                        <h5><strong><a class="ir_al_producto" href="product-info.html">${producto_actual.name}</a></strong></h5>
                        <img src="${producto_actual.imgSrc}" class="img_rela"> <h7>${producto_actual.description}</h7>
                        </div><br>
                        `
                        document.getElementById('relacionados').innerHTML += html_relacionado;
                    }
                    }
                });
        });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultInfo){
        if (resultInfo.status === "ok"){
            array = resultInfo.data;   
            let html_2 = ""; //variable de texto
            let estrella=""; //variable para la cantidad de estrellas

            for(let i=0; i<array.length; i++){
            //dependiendo el score del json elijo la cantidad de estrellas que tengo que imprimir junto al nombre de usuario
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
                        
                html_2 += `
                    <div id="ind_coments">
                        <h6 id='user_score'><strong><i class="fas fa-user"></i> `+ array[i].user +' - '+ estrella +`</strong></h6>
                        <p id="date">`+ array[i].dateTime + `</p>
                        <p id="informacion_prod">`+ array[i].description + `</p>
                    </div>    
                    <br>
                    `
                document.getElementById("lista_comentarios").innerHTML = html_2;
                }
                }
            });
    
    });

    