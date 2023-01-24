/**
 * LISTENERS
 */
//Nombre
document.getElementById("inputNombre").addEventListener("input", validarNombre);
//Apellido1
document.getElementById("inputApell1").addEventListener("input", validarApellido);
//Email
document.getElementById("inputEmail").addEventListener("input", validarEmail);
//Contraseña
document.getElementById("inputPassword1").addEventListener("input", validarPass);
document.getElementById("inputPassword1").addEventListener("blur", unshowValidation);
//Repetir contraseña
document.getElementById("inputPassword2").addEventListener("input", validarPass2);

//Dirección
document.getElementById("inputAddress2").addEventListener("input", validarDireccion);
//Comunidad
document.getElementById("inputCom").addEventListener("blur", validarComunidad);
//Provincia
document.getElementById("inputProv").addEventListener("blur", validarProvincia);
//Ciudad
document.getElementById("inputCity").addEventListener("input", validarCiudad);
//CP
document.getElementById("inputCP").addEventListener("input", validarCP);
//Teléfono
document.getElementById("inputTelf").addEventListener("input", validarTelefono);
//Fecha de nacimiento
document.getElementById("inputDate").addEventListener("blur", validarFechaNac);
//DNI
document.getElementById("inputDNI").addEventListener("input", validarDNI);
//Numero de cuenta
document.getElementById("inputPDC").addEventListener("input", validarNumCuenta);
document.getElementById("inputEnt").addEventListener("input", validarNumCuenta);
document.getElementById("inputSuc").addEventListener("input", validarNumCuenta);
document.getElementById("inputDC").addEventListener("input", validarNumCuenta);
document.getElementById("inputCuenta").addEventListener("input", validarNumCuenta);

//Terminos y condiciones
document.getElementById("terminos").addEventListener("blur", validarTerminos);


/**
 * VALIDACIONES
 */
//Nombre
function validarNombre()
{
    var nombre = document.getElementById("inputNombre").value;

    console.clear();
    console.log(nombre);

    if(nombre.length >= 1)
    {
        displayCorrect("inputNombre", "errorNombre");
        return true;
    }
    else
    {
        displayIncorrect("inputNombre", "errorNombre", "*El nombre no puede estar vacío.");
        return false;
    }
}

//Apellido1
function validarApellido()
{
    var apellido1 = document.getElementById("inputApell1").value;

    console.clear();
    console.log(apellido1);

    if(apellido1.length >= 1)
    {
        displayCorrect("inputApell1", "errorApell");
        return true;
    }
    else
    {
        displayIncorrect("inputApell1", "errorApell", "*El apellido no puede estar vacío.");
        return false;
    }
}
//Email abc@abc.ab
function validarEmail()
{
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = document.getElementById("inputEmail").value;

    console.clear();
    console.log(email);

    if(email.length<1)
    {
        displayIncorrect("inputEmail", "errorEmail", "*El email no puede estar vacío.");
        return false;
    }

    if (email.match(validRegex)) 
    {
        displayCorrect("inputEmail", "errorEmail");
        return true;
    } 
    else 
    {
        displayIncorrect("inputEmail", "errorEmail", "*El email no es válido.");
        return false;
    }
}
//Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
function validarPass()
{
    var pass = document.getElementById("inputPassword1").value;
    document.getElementById("checks").style.display = "block";
    document.getElementById("errorPass").style.fontWeight = "";

    console.clear();
    console.log(pass);
    
    if(pass.length<1)
    {
        displayIncorrect("inputPassword1", "errorPass", "*La contraseña no puede estar vacía.");
        return false;
    }

    if (validatePass(pass))
    {
        displayCorrect("inputPassword1", "errorPass");
        document.getElementById("errorPass").style.display = "block";
        document.getElementById("errorPass").style.color = "#159e1b";
        document.getElementById("errorPass").style.fontWeight = "bold";
        document.getElementById("errorPass").innerHTML = "*La contraseña es segura!";
        return true;
    }
    else
    {
        displayIncorrect("inputPassword1", "errorPass", "*La contraseña no es segura.");
        return false;
    }
}
//Repetir contraseña
function validarPass2()
{
    var pass = document.getElementById("inputPassword1").value;
    var pass2 = document.getElementById("inputPassword2").value;

    document.getElementById("errorPass2").style.fontWeight = "";

    console.clear();
    console.log(pass2);

    if(pass2 == pass)
    {
        document.getElementById("inputPassword2").style.border = "2px solid #159e1b";
        document.getElementById("errorPass2").style.display = "block";
        document.getElementById("errorPass2").style.fontSize = "0.8em";
        document.getElementById("errorPass2").style.color = "#159e1b";
        document.getElementById("errorPass2").style.fontWeight = "bold";
        document.getElementById("errorPass2").innerHTML = "*Contraseñas iguales!";
        console.log("contraseña igual!");
        return true;
    }
    else
    {
        displayIncorrect("inputPassword2", "errorPass2", "*Las contraseñas no coinciden.");
        return false;
    }
}


//Dirección
function validarDireccion()
{
   var direccion = document.getElementById("inputAddress2").value;

    console.clear();
    console.log(direccion);

    if(direccion.length<1)
    {
        displayIncorrect("inputAddress2", "errorDir", "*La dirección no puede estar vacía.");
        return false;
    }
    else
    {
        if(direccion.length<5)
        {
            displayIncorrect("inputAddress2", "errorDir", "*La dirección no es válida.");
            return false;
        }
        else
        {
            displayCorrect("inputAddress2", "errorDir");
            return true;
        }
    }
}
//Código postal es un número de 5 cifras
function validarCP()
{
    var cp = document.getElementById("inputCP").value;

    if(cp.length > 5)
    {
        cp = cp.substring(0, cp.length - 1);
    }

    console.clear();
    console.log(cp);

    if(cp.length<1)
    {
        displayIncorrect("inputCP", "errorCP", "*El código postal no puede estar vacío.");
        return false;
    }
    else
    {
        if(cp.length<5)
        {
            displayIncorrect("inputCP", "errorCP", "*El código postal no es válido.");
            return false;
        }
        else
        {
            displayCorrect("inputCP", "errorCP");
            return true;
        }
    }
}
//Comunidad es un select
function validarComunidad()
{
    var comunidad = document.getElementById("inputCom");
    console.clear();
    console.log(comunidad);

    if(comunidad.value != "0")
    {
        displayCorrect("inputCom", "errorCom");
        return true;
    }
    else
    {
        displayIncorrect("inputCom", "errorCom", "*La comunidad no puede estar vacía.");
        return false;
    }
}
//Provincia es un select
function validarProvincia()
{
    var provincia = document.getElementById("inputProv");
    console.clear();
    console.log(provincia);

    if(provincia.value != "0")
    {
        displayCorrect("inputProv", "errorProv");
        return true;
    }
    else
    {
        displayIncorrect("inputProv", "errorProv", "*La provincia no puede estar vacía.");
        return false;
    }
}
//Ciudad
function validarCiudad()
{
    var ciudad = document.getElementById("inputCity").value;

    console.clear();
    console.log(ciudad);

    if(ciudad.length<1)
    {
        displayIncorrect("inputCity", "errorCity", "*La ciudad no puede estar vacía.");
        return false;
    }
    else
    {
        displayCorrect("inputCity", "errorCity");
        return true;
    }
}
//Teléfono es un número de 9 cifras
const phoneInputField = document.querySelector("#inputTelf");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "es",
    preferredCountries: ["es", "pt", "ad"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function validarTelefono(event)
{
    var telefono = document.getElementById("inputTelf").value;

    telefono = telefono.replace(/\D/g, ''); //elimina cualquier caracter que no sea un número
    document.getElementById("inputTelf").value = telefono;

    if(telefono.length<1)
    {
        displayIncorrect("inputTelf", "errorTelf", "*El teléfono no puede estar vacío.");
        return false;
    }

    console.log(telefono);
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();
    const data = new URLSearchParams();

    data.append("phone", phoneNumber);

    fetch("https://twpractica4-8660.twil.io/lookup", {
    method: "POST",
    body: data,
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.success) 
        {
            document.getElementById("errorTelf").style.display = "none";
            document.getElementById("inputTelf").style.border = "2px solid #159e1b";

            console.log("Numero de teléfono válido: "+ phoneNumber);
            return true;
        } 
        else 
        {
            displayIncorrect("inputTelf", "errorTelf", "*El teléfono no es válido.");
            console.log("Número de teléfono inválido. "+json.error);
            return false;
        }
    })
    .catch((err) => {
        console.log(`Algo ha salido mal :( -> ${err}`);
        return false;
    });
}
//DNI
function validarDNI()
{
    var validRegex = /^\d{8}[a-zA-Z]$/;
    var letras = "TRWAGMYFPDXBNJZSQVHLCKET";

    var dni = document.getElementById("inputDNI").value;

    if(dni.length > 9)
    {
        dni = dni.substring(0, dni.length - 1);
    }

    if(dni.length<1)
    {
        displayIncorrect("inputDNI", "errorDNI", "*El DNI no puede estar vacío.");
        return false;
    }

    console.clear();
    console.log(dni);

    if (dni.match(validRegex)) 
    {
        if(letras.charAt(dni.substring(0, 8) % 23) == dni.substring(8, 9))
        {
            displayCorrect("inputDNI", "errorDNI");
            return true;
        }
        else
        {
            displayIncorrect("inputDNI", "errorDNI", "*El DNI no es válido.");
            return false;
        }
    } 
    else 
    {
        displayIncorrect("inputDNI", "errorDNI", "*El DNI no es válido.");
        return false;
    }
}
//Fecha de nacimiento es un date y se debe comprobar que es mayor de 18 años
function validarFechaNac()
{
    var fechaNac = document.getElementById("inputDate");
    console.clear();
    console.log(fechaNac);

    var fecha = new Date(fechaNac.value);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fecha.getFullYear();
    var mes = fechaActual.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fecha.getDate())) 
    {
        edad--;
    }

    //si está vacío el campo es inválido
    if(fechaNac.value == "")
    {
        displayIncorrect("inputDate", "errorDate", "*La fecha no puede estar vacía.");
        return false;
    }

    //si el año es mayor del actual es inválido
    if(fecha.getFullYear() > fechaActual.getFullYear())
    {
        displayIncorrect("inputDate", "errorDate", "*La fecha no es válida.");
        return false;
    }

    if(edad >= 18)
    {
        displayCorrect("inputDate", "errorDate");
        return true;
    }
    else
    {
        displayIncorrect("inputDate", "errorDate", "*Debes ser mayor de 18 años.");
        return false;
    }
}
//Numero de cuenta es un número de 16 cifras
function validarNumCuenta()
{
    var PDC = document.getElementById("inputPDC").value.toUpperCase();
    var Entidad = document.getElementById("inputEnt").value
    var Sucursal = document.getElementById("inputSuc").value
    var DC = document.getElementById("inputDC").value
    var cuenta = document.getElementById("inputCuenta").value

    if(Entidad.length > 4)
    {
        Entidad = Entidad.substring(0, Entidad.length - 1);
    }
    if(Sucursal.length > 4)
    {
        Sucursal = Sucursal.substring(0, Sucursal.length - 1);
    }
    if(DC.length > 2)
    {
        DC = DC.substring(0, DC.length - 1);
    }
    if(cuenta.length > 10)
    {
        cuenta = cuenta.substring(0, cuenta.length - 1);
    }

    //si está vacío algun campo es inválido
    if(Entidad == "" && Sucursal == "" && DC == "" && cuenta == "" && PDC == "")
    {
        document.getElementById("inputPDC").focus();
        document.getElementById("inputPDC").style.border = "2px solid #ad112e";
        document.getElementById("inputEnt").style.border = "2px solid #ad112e";
        document.getElementById("inputSuc").style.border = "2px solid #ad112e";
        document.getElementById("inputDC").style.border = "2px solid #ad112e";
        document.getElementById("inputCuenta").style.border = "2px solid #ad112e";

        document.getElementById("errorCCC").style.display = "block";
        document.getElementById("errorCCC").style.fontSize = "0.8em";
        document.getElementById("errorCCC").style.color = "#ad112e";
        document.getElementById("errorCCC").innerHTML = "*El número de cuenta no puede estar vacío.";
        
        console.log("cuenta vacía!");
        return false;
    }

    if(validaCCC(Entidad + Sucursal + DC + cuenta)) 
    {
        let iban = Entidad+Sucursal+DC+cuenta;
        iban = iban + "142800";
        iban = mod97(iban);
        iban = 98-iban;

        if( "ES"+iban == PDC)
        {
            document.getElementById("errorCCC").style.display = "none";
            document.getElementById("inputPDC").style.border = "2px solid #159e1b";
            document.getElementById("inputEnt").style.border = "2px solid #159e1b";
            document.getElementById("inputSuc").style.border = "2px solid #159e1b";
            document.getElementById("inputDC").style.border = "2px solid #159e1b";
            document.getElementById("inputCuenta").style.border = "2px solid #159e1b";

            console.log("cuenta válida!");
            return true;
        }
        else
        {
            document.getElementById("inputPDC").focus();
            document.getElementById("inputPDC").style.border = "2px solid #ad112e";
            document.getElementById("inputEnt").style.border = "2px solid #ad112e";
            document.getElementById("inputSuc").style.border = "2px solid #ad112e";
            document.getElementById("inputDC").style.border = "2px solid #ad112e";
            document.getElementById("inputCuenta").style.border = "2px solid #ad112e";

            document.getElementById("errorCCC").style.display = "block";
            document.getElementById("errorCCC").style.fontSize = "0.8em";
            document.getElementById("errorCCC").style.color = "#ad112e";
            document.getElementById("errorCCC").innerHTML = "*El número de cuenta no es válido.";
            
            console.log("cuenta no válida!");
            return false;
        }
    } 
    else 
    {
        document.getElementById("inputPDC").style.border = "2px solid #ad112e";
        document.getElementById("inputEnt").style.border = "2px solid #ad112e";
        document.getElementById("inputSuc").style.border = "2px solid #ad112e";
        document.getElementById("inputDC").style.border = "2px solid #ad112e";
        document.getElementById("inputCuenta").style.border = "2px solid #ad112e";
        
        document.getElementById("errorCCC").style.display = "block";
        document.getElementById("errorCCC").style.fontSize = "0.8em";
        document.getElementById("errorCCC").style.color = "#ad112e";
        document.getElementById("errorCCC").innerHTML = "*El número de cuenta no es válido.";

        console.log("cuenta invalida!");
        return false;
    }
}
//comprobar si los terminos y condiciones están aceptados
function validarTerminos()
{
    if(document.getElementById("terminos").checked)
    {
        document.getElementById("errorTerminos").style.display = "none";
        console.log("terminos aceptados!");
        return true;
    }
    else
    {
        document.getElementById("errorTerminos").style.display = "block";
        document.getElementById("errorTerminos").style.fontSize = "0.8em";
        document.getElementById("errorTerminos").style.color = "#ad112e";
        document.getElementById("errorTerminos").innerHTML = "*Debes aceptar los términos y condiciones.";
        console.log("terminos no aceptados!");
        return false;
    }
}
//comprobar que el formulario es valido
function validarRegistro()
{
    if(validarNombre() && validarApellido() && validarEmail() && validarPass() && validarPass2() && validarDireccion() && validarComunidad() && validarProvincia() && validarCiudad() && validarCP() && validarTelefono() && validarFechaNac() && validarDNI() && validarNumCuenta() && validarTerminos())
    {
        console.log("formulario valido!");
        return true;
    }
    else
    {
        console.log("formulario invalido!");
        return false;
    }
}

//COMPROBACIONES EXTRA

//Función para validar la contraseña
function validatePass(pass)
{
    let valida = true;
    if(pass.length < 8 || pass.length > 16)
    {
        document.getElementById("checks").style.display = "block";
        document.getElementById("check1").style.color = "red";
        document.getElementById("check1").style.borderColor = "red";

        valida = false;
    }
    else
    {
        document.getElementById("check1").style.color = "green";
        document.getElementById("check1").style.borderColor = "green";
    }

    //si contiene mayusculas
    if(pass.match(/[A-Z]/))
    {
        document.getElementById("check2").style.color = "green";
        document.getElementById("check2").style.borderColor = "green";
    }
    else
    {
        document.getElementById("checks").style.display = "block";
        document.getElementById("check2").style.color = "red";
        document.getElementById("check2").style.borderColor = "red";

        valida = false;
    }

    //si contiene numeros
    if(pass.match(/[0-9]/))
    {
        document.getElementById("check3").style.color = "green";
        document.getElementById("check3").style.borderColor = "green";
    }
    else
    {
        document.getElementById("checks").style.display = "block";
        document.getElementById("check3").style.color = "red";
        document.getElementById("check3").style.borderColor = "red";

        valida = false;
    }

    //si contiene simbolos
    if(pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
    {
        document.getElementById("check4").style.color = "green";
        document.getElementById("check4").style.borderColor = "green";
    }
    else
    {
        document.getElementById("checks").style.display = "block";
        document.getElementById("check4").style.color = "red";
        document.getElementById("check4").style.borderColor = "red";

        valida = false;
    }

    return valida;
}
//Comprobar CCC
function validaCCC(val)
{
    var banco = val.substring(0,4);
    var sucursal = val.substring(4,8);
    var dc = val.substring(8,10);
    var cuenta=val.substring(10,20);
    var CCC = banco+sucursal+dc+cuenta;
    
    console.clear();
    console.log(CCC);

    if (!/^[0-9]{20}$/.test(CCC))
    {
        return false;
    }
    else
    {
        valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
        control = 0;
        let i=0;
        for (i=0; i<=9; i++)
        control += parseInt(cuenta.charAt(i)) * valores[i];
        control = 11 - (control % 11);
        if (control == 11) control = 0;
        else if (control == 10) control = 1;
        if(control!=parseInt(dc.charAt(1))) {
            return false;
        }
        control=0;
        var zbs="00"+banco+sucursal;
        for (i=0; i<=9; i++)
            control += parseInt(zbs.charAt(i)) * valores[i];
        control = 11 - (control % 11);
        if (control == 11) control = 0;
            else if (control == 10) control = 1;
        if(control!=parseInt(dc.charAt(0))) {
            return false;
        }
        return true;
    }
}

/**
 * FUNCIONES DE UTILIDAD
 */

//limite de caracteres en los inputs numericos
document.querySelectorAll('input[type=number]').forEach(function (input) 
{
    input.addEventListener('input', function () 
    {
        if (this.value.length > this.maxLength) 
        {
            this.value = this.value.slice(0, this.maxLength);
        }
    });
});
//Función para mostrar la contraseña
var visible = false;
function see(id)
{
    var input = document.getElementById("inputPassword"+id);
    var see = document.getElementById("toggle-eye"+id);

    if(visible)
    {
        see.setAttribute("class", "fa fa-eye-slash");
        input.setAttribute("type", "password");
        see.style.color = "gray";
        visible = false;
    }
    else
    {
        see.setAttribute("class", "fa fa-eye ");
        input.setAttribute("type", "text");
        see.style.color = "#262626";
        visible = true;
    }
}
//Función para ocultar el mensaje de error en la contraseña
function unshowValidation()
{
    document.getElementById("checks").style.display = "none";
}
//funcion para calcular el modulo 97 de un numero cualquiera
function mod97(string) 
{
    var checksum = string.slice(0, 2), fragment;

    for (var offset = 2; offset < string.length; offset += 7) 
    {
        fragment = String(checksum) + string.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
}
//funcion para mostrar cuando un input es correcto
function displayCorrect(input, error)
{
    document.getElementById(error).style.display = "none";
    document.getElementById(input).style.border = "2px solid #159e1b";
    console.log(input+" valido!");
}
//funcion para mostrar cuando un input es incorrecto
function displayIncorrect(input, error, message)
{
    document.getElementById(input).focus();
    document.getElementById(input).style.border = "2px solid #ad112e";
    document.getElementById(error).style.display = "block";
    document.getElementById(error).style.fontSize = "0.8em";
    document.getElementById(error).style.color = "#ad112e";
    document.getElementById(error).innerHTML = message;
    console.log(input+" invalido!");
}
