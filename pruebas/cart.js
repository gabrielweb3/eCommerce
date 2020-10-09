//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//llamamos el JSON de los dos artículos
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARR_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok")
        {
            cart = resultObj.data;
            var dolares = cart.articles[0].unitCost / 40

            
            
//los enviamos al html a los datos de pino
            document.getElementById("pinoUno").innerHTML = cart.articles[0].name;
            document.getElementById("pinoTres").innerHTML = dolares;
            document.getElementById("pinoCuatro").innerHTML = cart.articles[1].currency;
            document.getElementById("pinoImag").src = cart.articles[0].src;
            


//hacemo lo mismo que lo anterior pero con autos
            document.getElementById("autoUno").innerHTML = cart.articles[1].name;
            document.getElementById("autoTres").innerHTML = cart.articles[1].unitCost;
            document.getElementById("autoCuatro").innerHTML = cart.articles[1].currency;
            document.getElementById("autoImag").src = cart.articles[1].src;  
            }
    });
});
//mostramos la cantidad segun lo que selecciona el cliente en el imput autox que se multiplica por el costo unitario del artículo
  document.getElementById("autox").addEventListener("click", function () {
                var num = document.getElementById("autox").value;
                document.getElementById("autototal").innerHTML = cart.articles[1].currency + new Intl.NumberFormat("de-DE").format( (num * 12500));
                
            }); 
//mostramos la cantidad segun lo que selecciona el cliente en el imput pinox que se multiplica por el costo unitario del artículo
  document.getElementById("pinox").addEventListener("click", function () {
                var num = document.getElementById("pinox").value;
                document.getElementById("pinototal").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( (num * 2.5));
                
            }); 
//enviamos el resultado a la parte de costo, a su vez activamos la cantidad en el menu desplegable de arriba haciendo aparecer las imagenes
//del auto y del pino con sus cantidad que seleccione el usuario.
        
    document.getElementById("button2").addEventListener("click", function () {
            var num1 = 2.5 * document.getElementById("pinox").value;
            var num2 = 12500 * document.getElementById("autox").value;
            document.getElementById("productCostText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( (num2 + num1));
            document.getElementById("comissionText").innerHTML = "Ingrese el tipo de envío"
            document.getElementById("totalCostText").innerHTML = "-"
            document.getElementById("numpinocant").style.display="block";
            document.getElementById("numautocant").style.display="block";
            document.getElementById("pinito").style.display="block";
            document.getElementById("autito").style.display="block";
            document.getElementById("cerrar").style.display= "none";
            document.getElementById("numpinocant").innerHTML = document.getElementById("pinox").value;
            document.getElementById("numautocant").innerHTML = document.getElementById("autox").value;
            }); 

//restablece los datos para seleccionar nuevas cantidades y oculta las propiedad en el menu despegable

            document.getElementById("button3").addEventListener("click", function () {
                
                document.getElementById("productCostText").innerHTML = cart.articles[1].currency  + 0;
                document.getElementById("comissionText").innerHTML = cart.articles[1].currency  + 0;
                document.getElementById("totalCostText").innerHTML = cart.articles[1].currency  + 0;
                document.getElementById("numpinocant").style.display="none";
                document.getElementById("numautocant").style.display="none";
                document.getElementById("pinito").style.display="none";
                document.getElementById("autito").style.display="none";
                document.getElementById("cerrar").style.display= "block";
            
                }); 

//calculamos el 15% del total entre auto y pino y lo mostramos en la parte de costos, a su vez ya se suma con el costo de los artículos para arrojar el total
                document.getElementById("goldradio").addEventListener("click", function () {
                    var num1 = 2.5 * document.getElementById("pinox").value;
                    var num2 = 12500 * document.getElementById("autox").value;
                    document.getElementById("comissionText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) * 0.15).toFixed(2));
                    document.getElementById("totalCostText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) + (num2 + num1) * 0.15).toFixed(2));
            }); 
//calculamos el 7% del total entre auto y pino y lo mostramos en la parte de costos, a su vez ya se suma con el costo de los artículos para arrojar el total
            document.getElementById("premiumradio").addEventListener("click", function () {
                var num1 = 2.5 * document.getElementById("pinox").value;
                var num2 = 12500 * document.getElementById("autox").value;
                document.getElementById("comissionText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) * 0.07).toFixed(2));
                document.getElementById("totalCostText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) + (num2 + num1) * 0.07).toFixed(2));
        }); 
//calculamos el 5% del total entre auto y pino y lo mostramos en la parte de costos, a su vez ya se suma con el costo de los artículos para arrojar el total
        document.getElementById("standardradio").addEventListener("click", function () {
            var num1 = 2.5 * document.getElementById("pinox").value;
            var num2 = 12500 * document.getElementById("autox").value;
            document.getElementById("comissionText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) * 0.05).toFixed(2));
            document.getElementById("totalCostText").innerHTML = cart.articles[1].currency  + new Intl.NumberFormat("de-DE").format( ((num2 + num1) + (num2 + num1) * 0.05).toFixed(2));
    }); 


                




              
             
