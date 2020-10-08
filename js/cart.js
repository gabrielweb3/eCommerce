//SCRIPT QUE CONTROLA EL FUNCIONAMIENTO DEL CARRITO DE PRODUCTOS

//FUNCION PARA MOSTRAR ARTICULOS DEL CARRITO
var articulo = [];
function mostrar_en_pantalla(array){
	//variables html para imprimir carrito y factura
	let html = '';
	let html_factura = '';
	//variables para mostrar en la factura, ambas inician en cero, se toma usuario como nombre de cliente
	var FACTURA_total = 0;
	var FACTURA_sub_total = 0;
	var CLIENTE = localStorage.getItem("user");
	var ENVIO_tipo = "";
	var multiplicador = "";

	//seleccion de envio de producto goldradio
	var ENVIO_gold = document.getElementById("goldradio").checked;
	var ENVIO_premium = document.getElementById("premiumradio").checked;
	var ENVIO_standar = document.getElementById("standardradio").checked;

	//dependiendo el radibutton que está apretado elijo el tipo de envío y porcentaje que corresponde
	if (ENVIO_gold){
		multiplicador = 0.15;
		ENVIO_tipo = "Gold(15%)";
	}if (ENVIO_premium){
		multiplicador = 0.07;
		ENVIO_tipo = "Premium(7%)";
	}if (ENVIO_standar){
		multiplicador = 0.03;
		ENVIO_tipo = "Estándar(3%)"
	}

	//cantidad de productos en el carro
	


    for (let i = 0; i < array.articles.length; i++) {
		const producto = array.articles[i];
		//valores de los productos para mostrar en el carrito
		//var no_grabado = "";
		var unitario = "";
		var total_dolares = "";		
		var cantidad_producto = producto.count; //creo una variable unicamente para la cantidad, ya que puede cambiar su valor

		//hago un filtro para la moneda, que tome el valor de los productos en dólares
		if (producto.currency === "USD"){
			FACTURA_total = (FACTURA_total + (producto.unitCost*cantidad_producto));
			//no_grabado = producto.unitCost/1.22;
			unitario = producto.unitCost;
			total_dolares = producto.unitCost*cantidad_producto;
		}else{
			FACTURA_total = (FACTURA_total + ((producto.unitCost/40)*cantidad_producto));
			//no_grabado = (producto.unitCost/40)/1.22;
			unitario = producto.unitCost/40;
			total_dolares = (producto.unitCost/40)*cantidad_producto;
		}

		//SUB TOTAL
		FACTURA_sub_total = (FACTURA_total+(FACTURA_total*multiplicador)) /1.22;

        html = `
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-2"><img class="img-responsive" src="${producto.src}"></div>
						<div class="col-xs-4">
							<h4 class="product-name"><strong>${producto.name}</strong></h4>
						</div>
						<div class="col-xs-6">
							<div class="col-xs-6 text-right">
								<h6 id="costo_unitario"><strong>Costo unitario:</strong><br> ${unitario.toFixed(2)} U$S</h6>
								<h6 id="costo_total"><strong>TOTAL:</strong><br> ${total_dolares.toFixed(2)} U$S</h6>							
							</div>							
							<div class="col-xs-4">
								<strong>Cantidad:</strong> <input id="cantidad${i}" onchange="nuevo_calculo();" type="number" class="form-control input-sm" value="${cantidad_producto}" min="0">
							</div>
							<button id="add_${i}" onclick="aumentar_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-plus"></i></button><button id="quit_${i}" onclick="disminuir_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-minus"></i></button>
							<div class="col-xs-2">
								<button type="button" class="btn btn-link btn-xs">
									<span class="glyphicon glyphicon-trash"> </span>
								</button>
						</div><br><br><br>	
					</div>
				</div>
					<hr>
            `
			document.getElementById('lista').innerHTML += html;
			
		//escribo los valores en la factura, desglosando cada costo por separado
		html_factura = `
			<br>
				<p><strong> CLIENTE:</strong> ${CLIENTE}</p>				
				<p><strong> ENVIO:</strong> ${ENVIO_tipo} - ${(FACTURA_total*multiplicador).toFixed(2)} U$S</p>
				<p><strong> SUB TOTAL:</strong> ${FACTURA_sub_total.toFixed(2)} U$S</p>
				<p><strong> IVA</strong>(22%)<strong>:</strong> ${(FACTURA_total+(FACTURA_total*multiplicador)-FACTURA_sub_total).toFixed(2)} U$S</p>
				<p class="renglon" id="Total"><strong> TOTAL:</strong> ${FACTURA_total+(FACTURA_total*multiplicador)} U$S</p><br>
				<button class="btn btn-primary btn-lg" type="submit">Finalizar compra</button>
		`
		document.getElementById("elementos_factura").innerHTML = html_factura;
	}
}
//funcion que limpia la pantalla antes de volver a calcular los valores de producto y envío cuando se selecciona un tipo de envío
function limpiar_pantalla() {
	html = ``
	document.getElementById('lista').innerHTML = html;
}
//funcion que aumenta la cantidad modifica la cantidad de producto cuando se apreta el boton +
function aumentar_cantidad_0(){
	var cantidad = parseInt(document.getElementById("cantidad0").value);
	cantidad += 1;
	document.getElementById("cantidad0").value = cantidad;
	return cantidad;
}
function aumentar_cantidad_1(){
	var cantidad = parseInt(document.getElementById("cantidad1").value);
	cantidad += 1;
	document.getElementById("cantidad1").value = cantidad;
}
function disminuir_cantidad_0() {
	var cantidad = parseInt(document.getElementById("cantidad0").value);
	cantidad -= 1;
	document.getElementById("cantidad0").value = cantidad;
}
function disminuir_cantidad_1() {
	var cantidad = parseInt(document.getElementById("cantidad1").value);
	cantidad -= 1;
	document.getElementById("cantidad1").value = cantidad;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_2).then(function(resultado){
        if (resultado.status === "ok"){
            informacion_carrito = resultado.data;
			mostrar_en_pantalla(informacion_carrito);
			var cantidad_en_carro = informacion_carrito.articles.length+1;
			document.getElementById("cont").innerHTML = cantidad_en_carro;
			document.getElementById("carito").innerHTML = cantidad_en_carro;
        }
	})
	document.getElementById("premiumradio").addEventListener("click", function(){
		limpiar_pantalla();
		mostrar_en_pantalla(informacion_carrito);
	})
	document.getElementById("standardradio").addEventListener("click", function(){
		limpiar_pantalla();
		mostrar_en_pantalla(informacion_carrito);
	})
	document.getElementById("goldradio").addEventListener("click", function(){
		limpiar_pantalla();
		mostrar_en_pantalla(informacion_carrito);
	})
});
//CART_INFO_URL
//"https://japdevdep.github.io/ecommerce-api/cart/654.json"
//{"articles": [{"name": "Pino de olor para el auto","count": 2,"unitCost": 100,"currency": "UYU", "src": "img/tree1.jpg"},
//{"name": "Suzuki Celerio","count": 1,"unitCost": 12500,"currency": "USD","src": "img/prod3.jpg"}]}
//<button id="add_" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal"><i class="fas fa-plus"></i></button><button id="quit_" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal"><i class="fas fa-minus"></i></button>
//<strong>Cantidad:</strong> <input id="cantidad${i}" onchange="calcular(${i});" type="number" class="form-control input-sm" value="${cantidad_producto}" min="0">
//function calcular(cantidad_input) {
// 	var cantidades = [];
// 	cantidades.push(document.getElementById("cantidad0").value);
// 	cantidades.push(document.getElementById("cantidad1").value);

// 	alert(cantidades);
// 	html = "";
// 	for (let i = 0; i < cantidades.length; i++) {
// 		const cantidad = cantidades[i];

		
// 	}
// }