//SCRIPT QUE CONTROLA EL FUNCIONAMIENTO DEL CARRITO DE PRODUCTOS

//FUNCION PARA MOSTRAR ARTICULOS DEL CARRITO
function mostrar_en_pantalla(cantidades){
	//variables html para imprimir carrito y factura
	let html = '';
	let html_factura = '';
	console.log("cantidades al imprimir: " + cantidades);
	//variables para mostrar en la factura, ambas inician en cero, se toma usuario como nombre de cliente
	var CLIENTE = localStorage.getItem("user");
	var ENVIO_tipo = "";
	var multiplicador = "";
	var sub_total_factura = 0;
	var total_con_envio = 0;
	var envio_factura = 0;
	var cantidad_total_articulos = 0;
	
	//especificación de envío
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
								<button type="button" class="btn btn-link btn-xs" onclick="eliminar_producto(${i});">
									<span class="glyphicon glyphicon-trash"> </span>
								</button>
						</div><br><br><br>	
					</div>
				</div>
					<hr>
            `
			document.getElementById('lista').innerHTML += html;

		//cantidad de variables en el carro
		cantidad_total_articulos = cantidad_total_articulos + cantidades[i];
		document.getElementById("cont").innerHTML = document.getElementById("carito").innerHTML =  cantidad_total_articulos;

		//definición variables para factura	
		sub_total_factura = sub_total_factura + (total_dolares[i] * cantidades[i]);		
		envio_factura = sub_total_factura * multiplicador;
		total_con_envio = sub_total_factura + envio_factura;

		//escribo los valores en la factura, desglosando cada costo por separado
		html_factura = `
		<hr class="mb-4">
		<h4 class="mb-3">Costos</h4>
		<ul class="list-group mb-3">
			<li class="list-group-item d-flex justify-content-between lh-condensed">
			  <div>
				<h6 class="my-0">Subtotal</h6>
				<small class="text-muted">Costo de los productos</small>
			  </div>
			  <span class="text-muted" id="productCostText">${(sub_total_factura).toFixed(2)} U$S</span>
			</li>
			<li class="list-group-item d-flex justify-content-between lh-condensed">
			  <div>
				<h6 class="my-0">Porcentaje de envío</h6>
				<small class="text-muted">Según el tipo de envío</small>
			  </div>
			  <span class="text-muted" id="comissionText">${ENVIO_tipo} - ${envio_factura.toFixed(2)} U$S</span>
			</li>
			<li class="list-group-item d-flex justify-content-between">
			  <span>Total (U$S)</span>
			  <strong id="totalCostText">${total_con_envio.toFixed(2)} U$S</strong>
			</li>
		  </ul>
		`
		document.getElementById("elementos_factura").innerHTML = html_factura;
	}
}
//funcion que limpia la pantalla antes de volver a calcular los valores de producto y envío cuando se selecciona un tipo de envío
function limpiar_pantalla() {
	html = ``
	document.getElementById('lista').innerHTML = html;
}
//funcion que se ejecuta cuando cambia el input
function nuevo_calculo(){
	var cantidad_input1 = parseInt(document.getElementById("cantidad0").value);
	var cantidad_input2 = parseInt(document.getElementById("cantidad1").value);
	cantidades_inputs[0] = cantidad_input1;
	cantidades_inputs[1] = cantidad_input2;
	limpiar_pantalla();
	mostrar_en_pantalla(cantidades_inputs);
}
function eliminar_producto(producto){
	console.log(informacion_carrito.articles[producto]);
	
	informacion_carrito.articles.splice(producto,1);
	
	limpiar_pantalla();
	
	mostrar_en_pantalla([1]);
}


//variables para cantidades y costos
var factura_total = "";
var unitario = [];
var total_dolares = [];
var cantidades_inputs = [];
var nombres = [];
var imagenes = [];
var ENVIO_tipo = "Gold(15%)";
var multiplicador = 0.15;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_2).then(function(resultado){
        if (resultado.status === "ok"){
			informacion_carrito = resultado.data;
			limpiar_pantalla();

			//cantidad de productos en el carrito 
			var cantidad_en_carro = informacion_carrito.articles.length;
			document.getElementById("cont").innerHTML = document.getElementById("carito").innerHTML =  cantidad_en_carro;
			// console.log(informacion_carrito.articles[0]);
			// informacion_carrito.articles.splice(0, 1);
			// console.log(informacion_carrito.articles);
			//inicializacion de variables 
			factura_total = parseInt(0);
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

			//obtener total 
			for (let i = 0; i < total_dolares.length; i++) {
				const sub_total = total_dolares[i];
				factura_total = factura_total + sub_total;
			}
			// factura_total = parseInt(factura_sub_total.reduce((a, b) => a + b, 0));
			mostrar_en_pantalla(cantidades_inputs);
        }
	})
	document.getElementById("premiumradio").addEventListener("click", function(){
		limpiar_pantalla();
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

//funcion que se activa al precionar el botón de finalizar compra incluidos en los modales de medios de pago
function finalizar_compra() {
	//se realiza el checkeo de un elemento de la ventana de envío para elegir que alert mostrar
	if (document.getElementById("invalidCheck").checked){
		Swal.fire({
			title: 'Compra completada!, disfruta de tus productos!',
			width: 600,
			padding: '3em',
			background: '#fff url(/images/trees.png)',
			backdrop: `
			  rgba(0,0,123,0.4)
			  url("https://media.tenor.com/images/5b383382c5772096baf2afd6d0c48900/tenor.gif")
			  left top
			  repeat
			`
		  });
		//en caso de que el botón no esté checkeado avisa al usuario a trves de un alert y se deja que se sigan llenando o checkando campos
	}else{
		Swal.fire({
			title: 'Espera!, aun falta información por completar',
			width: 600,
			padding: '3em',
			background: '#fff url(/images/trees.png)',
			backdrop: `
			  rgba(0,0,123,0.4)
			  url("/images/nyan-cat.gif")
			  left top
			  repeat
			`
		  });
	}	
	}

//funcion de validacion de campos de envío, función extraida enteramente de bootstrap o semejantes
(function() {
	'use strict';
	window.addEventListener('load', function() {
	  // Fetch all the forms we want to apply custom Bootstrap validation styles to
	  var forms = document.getElementsByClassName('needs-validation');
	  // Loop over them and prevent submission
	  var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
		  if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		  }
		  form.classList.add('was-validated');
		}, false);
	  });
	}, false);
  })();

  //modal medios de pagos
  function medios_pago(){	  
	despejar_medio_pago();
	  let modal_2 = `
	  <div class="modal fade" id="myModal" role="dialog">
			<div class="modal-dialog">                      
					<!-- Modal content-->
					<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Tarjeta de crédito</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>                            
					</div>
					<div class="modal-body">            
					<form class="needs-validation" novalidate>
						<div class="form-row">
						<div class="col-md-4 mb-3">
							<label for="validationCustom01">Nombres</label>
							<input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Cacho Lee"
							required>
							<div class="valid-feedback">
							Ok!
							</div>
						</div>
						<div class="col-md-4 mb-3">
							<label for="validationCustom02">Apellidos</label>
							<input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Obama Rodriguez"
							required>
							<div class="valid-feedback">
							Ok!
							</div>
						</div>      
						</div>
						<div class="form-row">
						<div class="col-md-6 mb-3">
							<label for="validationCustom03">Número de tarjeta</label>
							<input type="text" class="form-control" id="validationCustom03" placeholder="xxxx-xxxx-xxxx-xxxx" required>
							<div class="invalid-feedback">
							Ok!
							</div>
						</div>
						<div class="col-md-3 mb-3">
							<label for="validationCustom04">Código de seguridad</label>
							<input type="text" class="form-control" id="validationCustom04" placeholder="xxx" required>
							<div class="invalid-feedback">
							Ok!
							</div>
						</div>
						<div class="col-md-3 mb-3">
							<label for="validationCustom05">Vencimiento</label>
							<input type="month" class="form-control" id="validationCustom05" placeholder="01/2020" required>
							<div class="invalid-feedback">
							Ok!
							</div>
						</div>
						</div>
						<button id="finalizar" onclick="finalizar_compra();" class="btn btn-primary btn-sm" type="submit">Finalizar compra</button>
					</form>                   
         		</div>
        	</div>  
		</div>
        </div> 
	  `
	  document.getElementById("medios_pago").innerHTML = modal_2;
  }
  function transferencia_pago() {
	despejar_medio_pago();
	  let html_trans = `
	  <div class="modal fade" id="myModal" role="dialog">
			<div class="modal-dialog">                      
					<!-- Modal content-->
					<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Transferencia bancaria</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>                            
					</div>
					<div class="modal-body">            
            <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="validationCustom01">Titular cuenta</label>
                <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Cacho Lee"
                  required>
                <div class="valid-feedback">
                  Ok!
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationCustom02">Banco</label>
                <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="American Bank"
                  required>
                <div class="valid-feedback">
                Ok!
                </div>
              </div>      
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationCustom03">Número de cuenta</label>
                <input type="text" class="form-control" id="validationCustom03" placeholder="xxxx-xxxx-xxxx-xxxx" required>
                <div class="invalid-feedback">
                  Ok!
                </div>
              </div>
            </div>
            <button id="finalizar" onclick="finalizar_compra();" class="btn btn-primary btn-sm" type="submit">Finalizar compra</button>
          </form>
		  </div>
		  </div>
		 </div>  
		</div>		
  		</div>       
	  `
	  document.getElementById("medios_pago_giro").innerHTML = html_trans;
  }
  //funcion uncamente util para limpiar la pantalla para mostrar los medios de pago
  function despejar_medio_pago() {
	  document.getElementById("medios_pago_giro").innerHTML = "";
	  document.getElementById("medios_pago").innerHTML = ""; 
  }

//BORRADORES:

//CART_INFO_URL
//"https://japdevdep.github.io/ecommerce-api/cart/654.json"
//{"articles": [{"name": "Pino de olor para el auto","count": 2,"unitCost": 100,"currency": "UYU", "src": "img/tree1.jpg"},
//{"name": "Suzuki Celerio","count": 1,"unitCost": 12500,"curren cy": "USD","src": "img/prod3.jpg"}]}
//<button id="add_" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal"><i class="fas fa-plus"></i></button><button id="quit_" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal"><i class="fas fa-minus"></i></button>
//<strong>Cantidad:</strong> <input id="cantidad${i}" onchange="calcular(${i});" type="number" class="form-control input-sm" value="${cantidad_producto}" min="0">
//function calcular(cantidad_input) {
// 	var cantidades = [];
// 	cantidades.push(document.getElementById("cantidad0").value);
// 	cantidades.push(document.getElementById("cantidad1").value);
// <button class="btn btn-primary btn-lg" type="submit">Finalizar compra</button>
// 	alert(cantidades);
// 	html = "";
// 	for (let i = 0; i < cantidades.length; i++) {
// 		const cantidad = cantidades[i];
// // <p><strong> IVA</strong>(22%)<strong>:</strong> ${(factura_total*0.22).toFixed(2)} U$S</p>
//<p><strong> SUB TOTAL:</strong> ${(factura_total).toFixed(2)} U$S</p>		
// 	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Finalizar compra</button>
// <button id="add_${i}" onclick="aumentar_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-plus"></i></button><button id="quit_${i}" onclick="disminuir_cantidad_${i}();" style="font-size: smaller;" type="button" class="btn" data-dismiss="modal" min="0"><i class="fas fa-minus"></i></button>
//https://getbootstrap.com/docs/4.0/components/forms/?#validation

//<link rel="canonical" href="https://getbootstrap.com/docs/4.3/examples/album/">
/* <link href="https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,700,700i,900,900i" rel="stylesheet">
<link href="css/font-awesome.min.css" rel="stylesheet">
Mariana
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/styles.css" rel="stylesheet">
<link href="css/dropzone.css" rel="stylesheet">
Mariana
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/dropzone.js"></script>
<script src="js/init.js"></script>
<script src="js/cart.js"></script> */


