
var lista=[];
var productos={}; //defino el objeto
productos.nombre='';//guardo los valores
productos.edad='';
productos.precio='';

function guardar(){
    
    var nom=document.getElementById('prod').value;//obtengo los valores
    var edad=document.getElementById('ctd').value;
    var precio=document.getElementById('precio').value;


    productos.nombre=nom;//guardo los valores
    productos.edad=edad;
    productos.precio=precio;
    
    lista.push(productos); //agrego los valores al final de la colección
    
    mostrar(lista);//llamo a la funcion para mostrar los datos
    
    localStorage.setItem('listado',JSON.stringify(lista));
    
   
}

function mostrar(lista){

var tabla = "<table border =1> <th> Articulo </th><th>Cantidad</th><th>Precio</th>"; //escribe el encabezado
for (i=0; i<lista.length; i++){

    tabla+="<tr align='center'><td>" + lista[i].nombre + "</td><td>" + lista[i].edad +"</td><td>" + lista[i].precio + "</td></tr>";
}
tabla+="</table>";
document.getElementById('lista').innerHTML=tabla;
}

function ordenar(){
    lista.sort( function(ant, sig){
        return ant.edad-sig.edad; //comparo el campo edad
    });
    mostrar(lista);
}

function ordernarprecio(){

    lista.sort( function(ant, sig){
        return ant.precio-sig.precio; //comparo el campo precio
    });
    mostrar(lista);
}

function mostrar_carrito() {
    let html = '';
    
    if (document.getElementById('lista').innerHTML == ''){
        html = '<p>Su carrito esta vacio</p>';
        document.getElementById('lista').innerHTML = html; 
    }
    else{
        mostrar(JSON.parse(localStorage.getItem('listado')));
        console.log(JSON.parse(localStorage.getItem('listado')));
    }
    
}

document.addEventListener("DOMContentLoaded", function(e){

    mostrar_carrito();
    document.getElementById("actualizar").addEventListener('click', function(){

        mostrar_carrito();
    })

});
