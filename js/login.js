//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function login(user,password){

    //variables user pass
    // var usuario = document.getElementById('user').value;
    // var contrasena = document.getElementById('password').value;

    if (user.trim() === '' || password.trim() === ''){
        
        alert("Ingrese sus datos correctamente");
    }
    else if((user!="" && password!="")){
        localStorage.setItem('user', user.trim());//almaceno usuario y contrasena
        localStorage.setItem('password', password.trim());
        //alert (" Usuario : " + user + " Password : " + password );
        window.location="index.html";
    };
};

document.addEventListener("DOMContentLoaded", function(e){
//
})
    //id cleinte
   //314138497952-0l674ff93ppb54avplqnhe2h4p10c29r.apps.googleusercontent.com
   //secreto cliente
   //d3YnXjnjL1xq0fPh7PGBpvyX