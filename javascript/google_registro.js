function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(window.atob(base64));
}


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);


    console.log("Encoded JWT ID token: " + response.credential);
    document.getElementById("boton_google").innerHTML = "<img id='google_imagen' src='" + responsePayload.picture 
        + "' width='30px' height='30px' style='border-radius: 50%;' title='" 
        + responsePayload.name + "'></img>";
    document.getElementById("boton_google_wrapper").style= "cursor:pointer";
    document.getElementById("nombre_usuario").innerHTML = responsePayload.given_name;

    // Mostramos lo que antes estaba oculto
    var botones = document.getElementsByClassName("boton_wrapper");
    var carrito = document.getElementById("carrito_boton_wrapper");
    for (var i = 0; i < botones.length; i++) {
        botones[i].style.display = "flex";
    }
    carrito.style.display = "flex";


}


function decodeJwtResponse (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "128344394850-iglec8iv8e5chp5itgdamsbs2fshqn5d.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("boton_google"),
        { theme: "outline", size: "medium", type: "standard", shape: "pill", text: "signin", logo_alignment: "left"}  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}