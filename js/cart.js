//SCRIPT QUE CONTROLA EL FUNCIONAMIENTO DEL CARRITO DE PRODUCTOS



//FUNCION PARA MOSTRAR ARTICULOS DEL CARRITO
var articulo = [];
function mostrar_en_pantalla(cantidades){
	//variables html para imprimir carrito y factura
	let html = '';
	let html_factura = '';
	//variables para mostrar en la factura, ambas inician en cero, se toma usuario como nombre de cliente
	var FACTURA_total = 0;
	var FACTURA_sub_total = 0;
	var CLIENTE = localStorage.getItem("user");
	var ENVIO_tipo = "";
	var multiplicador = "";
	var IVA = 0.22;

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
		multiplicador = 0.05;
		ENVIO_tipo = "Estándar(5%)"
	}

    for (let i = 0; i < cantidades.length; i++) {
		//valores de los productos para mostrar en el carrito
		//var no_grabado = "";
				
		//SUB TOTAL
		//FACTURA_sub_total = (FACTURA_total+(FACTURA_total*multiplicador)) /1.22;

        html = `
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-2"><img class="img-responsive" src="${imagenes[i]}"></div>
						<div class="col-xs-4">
							<h4 class="product-name"><strong>${nombres[i]}</strong></h4>
						</div>
						<div class="col-xs-6">
							<div class="col-xs-6 text-right">
								<h6 id="costo_unitario"><strong>Costo unitario:</strong><br> ${unitario[i]} U$S</h6>
								<h6 id="costo_total"><strong>TOTAL:</strong><br> ${total_dolares[i]*cantidades[i]} U$S</h6>							
							</div>							
							<div class="col-xs-4">
								<strong>Cantidad:</strong> <input id="cantidad${i}" onchange="nuevo_calculo();" type="number" class="form-control input-sm" value="${cantidades[i]}" min="0">
							</div>							
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

//variables para cantidades y costos
var FACTURA_sub_total = [];
var unitario = [];
var total_dolares = [];
var cantidades_inputs = [];
var nombres = [];
var imagenes = [];

//funcion que se ejecuta cuando cambia el input
function nuevo_calculo(){
	var cantidad_input1 = parseInt(document.getElementById("cantidad0").value);
	var cantidad_input2 = parseInt(document.getElementById("cantidad1").value);
	cantidades_inputs[0] = cantidad_input1;
	cantidades_inputs[1] = cantidad_input2;
	console.log(cantidades_inputs);
	limpiar_pantalla();
	mostrar_en_pantalla(cantidades_inputs);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_2).then(function(resultado){
        if (resultado.status === "ok"){
			informacion_carrito = resultado.data;
			limpiar_pantalla();
			var cantidad_en_carro = informacion_carrito.articles.length+1;
			document.getElementById("cont").innerHTML = cantidad_en_carro;
			document.getElementById("carito").innerHTML = cantidad_en_carro;

			//inicializacion
			var cantidad_input1 = 1;
			var cantidad_input2 = 1;
			cantidades_inputs.push(cantidad_input1);
			cantidades_inputs.push(cantidad_input2);
			for (let i = 0; i < informacion_carrito.articles.length; i++) {
				const element = informacion_carrito.articles[i];
				
				nombres.push(element.name);
				imagenes.push(element.src);

				//hago un filtro para la moneda, que tome el valor de los productos en dólares
				if (element.currency === "USD"){
					unitario.push(element.unitCost);
				}else{
					unitario.push(element.unitCost/40);
				}
					total_dolares.push(unitario[i]*cantidades_inputs[i])
				}
			mostrar_en_pantalla(cantidades_inputs);
        }
	})
	document.getElementById("premiumradio").addEventListener("click", function(){
		mostrar_en_pantalla(cantidades_inputs);
	});
	
	document.getElementById("standardradio").addEventListener("click", function(){
		limpiar_pantalla();
		mostrar_en_pantalla(cantidades_inputs);
	})
	document.getElementById("goldradio").addEventListener("click", function(){
		limpiar_pantalla();
		mostrar_en_pantalla(cantidades_inputs);
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
// <button id="add_${i}" onclick="aumentar_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-plus"></i></button><button id="quit_${i}" onclick="disminuir_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-minus"></i></button>