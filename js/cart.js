//SCRIPT QUE CONTROLA EL FUNCIONAMIENTO DEL CARRITO DE PRODUCTOS

//variables globales
var lista = []; // array con lista principal
var producto = {}; // diccionario para guardar informacion del producto actual 

//funcion para anadir informacion del producto al carrito y guardar en localstorage
function guardar_producto_en_carro(producto){

    //guardo contenido como elementos del diccionario
    producto.nombre = info_producto.name;
    producto.precio = info_producto.cost;
    producto.moneda = info_producto.currency

    //guardo diccionario en array lista
    lista.push(producto);

    //guardo lista como string en localstorage
    localStorage.setItem('lista', JSON.stringify(lista));

    //llamo funcion de mostrar
}

//function para mostrar en pantalla los elementos del carrito
function mostrar_carrito(){
    let html = '';
    
    if (document.getElementById('lista').innerHTML == ''){
        html = '<p>Su carrito esta vacio</p>';
        document.getElementById('lista').innerHTML = html; 
    }
    else{
        let lista = JSON.parse(localStorage.getItem('lista'));
        var tabla = "<table border =1> <th> Articulo </th><th>Cantidad</th><th>Precio</th>"; //escribe el encabezado
            for (i=0; i<lista.length; i++){

            tabla+="<tr align='center'><td>" + lista[i].nombre + "</td><td>" + lista[i].edad +"</td><td>" + lista[i].precio + "</td></tr>";
            }
            tabla+="</table>";
            document.getElementById('lista').innerHTML=tabla;
        //mostrar(JSON.parse(localStorage.getItem('lista')));
        console.log(JSON.parse(localStorage.getItem('lista')));
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            info_producto = resultObj.data;
            
            guardar_producto_en_carro(info_producto);
            
            document.getElementById('a_carrito').addEventListener('click', function(){
                mostrar_carrito();
            })

            }
    })
});