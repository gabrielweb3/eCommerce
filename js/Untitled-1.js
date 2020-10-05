//SCRIPT QUE CONTROLA EL FUNCIONAMIENTO DEL CARRITO DE PRODUCTOS

//FUNCION PARA MOSTRAR ARTICULOS DEL CARRITO
var articulo = [];
function mostrar_en_pantalla(array){
    let html = '';
    for (let i = 0; i < array.articles.length; i++) {
        const producto = array.articles[i];
        html = `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.src + `" alt="" class="img-thumbnail"><small class="text-muted">` + producto.name + ` - `+ producto.unitCost + `` + producto.currency + `</small>
                        
                        <small class="text-muted">` + producto.count + ` artículos</small>
                    </div>
                </div>
            </div><br><br><br>
            `
            document.getElementById('lista').innerHTML += html;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_2).then(function(resultado){
        if (resultado.status === "ok"){
            informacion_carrito = resultado.data;
           // mostrar_en_pantalla(informacion_carrito);
           console.log(informacion_carrito.length);
           console.log(informacion_carrito.articles.length);
           console.log(informacion_carrito.articles[0].name);
           console.log(informacion_carrito.articles[1].name);
           mostrar_en_pantalla(informacion_carrito);
        }
    })
    
});
//CART_INFO_URL
//"https://japdevdep.github.io/ecommerce-api/cart/654.json"

//{"articles": [{"name": "Pino de olor para el auto","count": 2,"unitCost": 100,"currency": "UYU", "src": "img/tree1.jpg"},
//{"name": "Suzuki Celerio","count": 1,"unitCost": 12500,"currency": "USD","src": "img/prod3.jpg"}]}
<div class="row">
		<div class="col-xs-8">
			<div class="panel panel-info">
				<div class="panel-heading">
					<div class="panel-title">
						<div class="row">
							<div class="col-xs-6">
								<h5><span class="glyphicon glyphicon-shopping-cart"></span> Mi carrito</h5>
							</div>
							<div class="col-xs-6">
								<button type="button" class="btn btn-primary btn-sm btn-block">
									<a href="/products.html"><span class="glyphicon glyphicon-share-alt"></span></a> Continua comprando
								</button>
							</div>
						</div>
					</div>
				</div>