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
	//var ENVIO_valor = 0;
	var ENVIO_tipo = "";
	var multiplicador = "";

	//seleccion de envio de producto goldradio
	var ENVIO_gold = document.getElementById("goldradio").checked;
	var ENVIO_premium = document.getElementById("premiumradio").checked;
	var ENVIO_standar = document.getElementById("standardradio").checked;
	
	if (ENVIO_gold){
		multiplicador = 0.13;
		ENVIO_tipo = "Gold(13%)";
	}if (ENVIO_premium){
		multiplicador = 0.07;
		ENVIO_tipo = "Premium(7%)";
	}if (ENVIO_standar){
		multiplicador = 0.03;
		ENVIO_tipo = "Estándar(3%)"
	}

    for (let i = 0; i < array.articles.length; i++) {
		const producto = array.articles[i];
		//valores de los productos para mostrar en el carrito
		//var no_grabado = "";
		var unitario = "";
		var total_dolares = "";

		if (producto.currency === "USD"){
			FACTURA_total = (FACTURA_total + (producto.unitCost*producto.count));
			//no_grabado = producto.unitCost/1.22;
			unitario = producto.unitCost;
			total_dolares = producto.unitCost*producto.count;
		}else{
			FACTURA_total = (FACTURA_total + ((producto.unitCost/40)*producto.count));
			//no_grabado = (producto.unitCost/40)/1.22;
			unitario = producto.unitCost/40;
			total_dolares = (producto.unitCost/40)*producto.count;
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
								<h6><strong>Costo unitario:</strong><br> ${unitario.toFixed(2)} U$S</h6>
								<h6><strong>TOTAL:</strong><br> ${total_dolares.toFixed(2)} U$S</h6>							
							</div>
							<div class="col-xs-4">
							<strong>Cantidad:</strong> <input id="cantidad" type="text" class="form-control input-sm" value="${producto.count}">
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
			
		html_factura = `
			<br>
				<p><strong> CLIENTE:</strong> ${CLIENTE}</p>				
				<p><strong> ENVIO:</strong> ${ENVIO_tipo} - ${FACTURA_total*multiplicador} U$S</p>
				<p><strong> SUB TOTAL:</strong> ${FACTURA_sub_total.toFixed(2)} U$S</p>
				<p><strong> IVA</strong>(22%)<strong>:</strong> ${(FACTURA_total+(FACTURA_total*multiplicador)-FACTURA_sub_total).toFixed(2)} U$S</p>
				<p class="renglon" id="Total"><strong> TOTAL:</strong> ${FACTURA_total+(FACTURA_total*multiplicador)} U$S</p><br>
				<button class="btn btn-primary btn-lg" type="submit">Finalizar compra</button>
		`
		document.getElementById("elementos_factura").innerHTML = html_factura;
	}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_2).then(function(resultado){
        if (resultado.status === "ok"){
            informacion_carrito = resultado.data;
            mostrar_en_pantalla(informacion_carrito);
        }
    })
});
//CART_INFO_URL
//"https://japdevdep.github.io/ecommerce-api/cart/654.json"

//{"articles": [{"name": "Pino de olor para el auto","count": 2,"unitCost": 100,"currency": "UYU", "src": "img/tree1.jpg"},
//{"name": "Suzuki Celerio","count": 1,"unitCost": 12500,"currency": "USD","src": "img/prod3.jpg"}]}