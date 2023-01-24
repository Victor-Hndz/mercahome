/**Funciones auxiliares */
// Función que permite redondear los decimales. Esto está para evitar casos en los que daba xx.000000001
function _d(num, decimales) {
    return num.toFixed(decimales);
}

/**
 * PRODUCTOS
 */
var productos = new Array();

class Item{
    constructor(id, flash, end_flash, enlace, img, alt, titulo, descripcion, descuento, precio, n_estrellas, stock, n_categorias, categorias)
    {
        this.id = id;
        this.flash = flash;
        this.end_flash = end_flash;
        this.enlace = enlace;
        this.img = img;
        this.alt = alt;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.descuento = descuento;
        this.precio = precio;
        this.n_estrellas = n_estrellas;
        this.stock = stock;
        this.n_categorias = n_categorias;
        this.categorias = categorias;
    }

    //Getters.
    getCantidad()
    {
        return this.cantidad;
    }

    getTitulo()
    {
        return this.titulo;
    }

    getStock()
    {
        return this.stock;
    }

    getPrecio()
    {
        return this.precio;
    }
}


// Cierra la notificacion
function cerrar_popup_notificacion() {
    document.getElementById("popup_notificacion").style.display = "none";
}

// Muestra una notificacion con el mensaje
function popup_notificacion(mensaje) {
    let texto = document.getElementById("popup_notificacion_texto");
    texto.innerHTML = mensaje;
    let notificacion = document.getElementById("popup_notificacion");
    if (notificacion.style.display != "block") { // Si no está sacado el menú, se saca y se oculta en 3 segundos. Esto evita algunos problemas al añadir varios productos al carrito
        notificacion.style.display = "block";
        setTimeout(function(){ 
            cerrar_popup_notificacion();
        }, 3000);
    }

}


/**
 * CARRITO
 */
var mensaje_vacio = document.createTextNode("<p class='mensaje'>No hay artículos en el carrito.</p>");
var carrito_popup = document.getElementById("carrito_popup");

/** Mostrar/ocultar ventana del carrito **/
// Funcion que abre el popup del carrito
function open_popup() {
    carrito_popup.style.display = 'block';
    document.getElementById("menu-bar").checked = false;
}

// Funcion que cierra el popup del carrito cuando se hace click fuera de él
function close_popup() {
    carrito_popup.style.display = 'none';
}

// Si detecta que el click no está dentro del carrito_popup_body, cierra el popup
document.addEventListener('click', function(e) {
    if (document.getElementById('carrito_popup').contains(e.target)) {
        // Click is inside carrito_popup_body
        if (document.getElementById('carrito_popup_body').contains(e.target) == false){
            toggle_popup();
        }
    }
}
);

// Funcion que muestra u oculta el popup del carrito
function toggle_popup() {
    document.getElementById("mensajes_carrito").innerHTML="";
    if (carrito_popup.style.display == "block") { // Si está sacado el menú, lo ocultamos
        close_popup();
    } else{ // Si está oculto, lo mostramos
        open_popup();
        // Comprobamos si hay productos en el carrito
        if (carrito.items.length == 0) {
            // Si no hay productos, mostramos el mensaje de carrito vacío
            document.getElementById("mensajes_carrito").innerHTML=mensaje_vacio.textContent;
        }else{
            // Si hay productos, mostramos el carrito
            carrito.showCarro();
        }
    }
}



class Carro{

    constructor()
    {
        this.items = new Array();
        this.total = 0;
    }

    // Getters
    getLista()
    {
        return this.items;
    }

    //Añadir un item al carrito
    add_item(item)
    {
        let found = this.items.find(element => element.item == item.id);
        if(found)
        {
            found.cantidad++;
        }
        else
        {
            this.items.push({item: item.id, cantidad: 1});
        }
        this.total += (parseFloat(item.precio) - parseFloat(item.descuento));
        this.showCarro();

        popup_notificacion("Artículo añadido al carrito");
        //console.log(this.items, this.total);
    }

    //Eliminar un item del carrito
    pop_item(item)
    {
        let found = this.items.find(element => element.item == item);
        if(found)
        {
            if(found.cantidad > 1)
            {
                found.cantidad--;
            }
            else
            {
                this.items.splice(this.items.indexOf(found), 1);
            }
            this.total -= parseFloat(productos.find(element => element.id == item).precio) - parseFloat(productos.find(element => element.id == item).descuento);
            this.showCarro();
        }

        popup_notificacion("Artículo eliminado del carrito");
    }

    //Eliminar todos los items de un tipo del carrito
    pop_all_items(item_id)
    {
        let found = this.items.find(element => element.item == item_id);
        if(found)
        {
            while(found.cantidad > 1)
            {
                this.pop_item(item_id);
            }
            this.pop_item(item_id);
            console.clear();
            this.showCarro();
        }
    }
    
    //Vaciar el carrito
    empty_all()
    {
        this.items.length = 0;
        this.total = 0;
        console.clear();
        this.showCarro();
    }

    //Mostrar el carrito
    showCarro()
    {
        //ordenar el array de items
        this.items.sort((a, b) => (a.item > b.item) ? 1 : -1);
        productos_wrapper_carrito.style.height = "24em";
        this.actualizar_precio_total();
    }

    actualizar_precio_total(){
        if(this.items.length == 0)
        {
            console.log("El carrito está vacío");
            // Si no hay productos, mostramos el mensaje de carrito vacío
            document.getElementById("mensajes_carrito").innerHTML=mensaje_vacio.textContent;
            productos_wrapper_carrito.style.height = "0px";
            productos_wrapper_carrito.innerHTML="";
        }else{
            // Introduce los productos del carrito en el div de "productos_wrapper_carrito"
            let productos_wrapper_carrito = document.getElementById("productos_wrapper_carrito");
            productos_wrapper_carrito.innerHTML = "";
            let iva_opciones = document.getElementById("inputIVA");
            let iva = iva_opciones.options[iva_opciones.selectedIndex].text;

            if (iva == "general: 21%") iva = 0.21;
            else if (iva == "reducido: 10%") iva = 0.10;
            else if (iva == "superreducido: 4%") iva = 0.04;


            for(let i = 0; i < this.items.length; i++)
            {
                let producto = document.createElement("div");
                producto.classList.add("producto_carrito");
                
                let precio_normal = parseFloat(productos.find(element => element.id == this.items[i].item).precio);
                let descuento_producto = parseFloat(productos.find(element => element.id == this.items[i].item).descuento);
                let precio_final = precio_normal  - descuento_producto;
                let precio_cantidad = precio_final * this.items[i].cantidad;


                
                let precio_sin_iva = precio_cantidad*(1/(1+0.21));
                let precio_total_producto = precio_sin_iva*(1+iva);

                producto.innerHTML = `
                    <div class="producto_carrito_imagen">
                        <img src="${productos.find(element => element.id == this.items[i].item).img}" alt="${productos.find(element => element.id == this.items[i].item).alt}">
                    </div>
                    <div class="producto_carrito_info">
                        <p class="producto_carrito_titulo">${productos.find(element => element.id == this.items[i].item).titulo}</p>
                        <p class="producto_carrito_precio">${_d(precio_total_producto, 2)}€</p>
                        <p class="producto_carrito_cantidad"> <span>${_d(precio_final,2)}€</span>x${this.items[i].cantidad} <span class="uds">uds.</span></p>
                    </div>
                    <div class="producto_carrito_botones">
                        <button class="producto_carrito_boton" onclick="carrito.add_item(productos.find(element => element.id == ${productos.find(element => element.id == this.items[i].item).id}))">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <button class="producto_carrito_boton" onclick="carrito.pop_all_items(${productos.find(element => element.id == this.items[i].item).id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="producto_carrito_boton" onclick="carrito.pop_item(${productos.find(element => element.id == this.items[i].item).id})">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>
                `;
                productos_wrapper_carrito.appendChild(producto);
            }
            // Pone el total en el div de "mensajes"
            let mensajes = document.getElementById("mensajes_carrito");
            let total_aux = 0;
            let producto_precio = document.getElementsByClassName("producto_carrito_precio"); 

            for(let i = 0; i < this.items.length; i++){
                total_aux += parseFloat(producto_precio[i].innerHTML);
            }
            total_aux = total_aux*(1-(descuento_pedido/100));

            mensajes.innerHTML = `
                <p class="mensaje">Total: ${_d(total_aux, 2)}€</p>
                <button class="mensaje_boton" onclick="carrito.empty_all()">Vaciar carrito</button>
            `;
        }
    }
}

// Detectamos el cambio en el selector del iva para actualizar el precio total
document.getElementById("inputIVA").addEventListener("change", function(){
    carrito.actualizar_precio_total();
});


/**
 * DOM generado para cada producto desde json
 */
const producto = document.getElementById('producto');
const prod_template = document.getElementById('template-producto').content;
const prod_flash_template = document.getElementById('template-producto-flash').content;
const fragment = document.createDocumentFragment()
var carrito;
var descuento_pedido=0;

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
});

const fetchData = async () => {
    try {
        const res = await fetch("./productos.json");
        const data = await res.json();
        read_producto(data)
    } catch (error) {
        console.log(error);
    }
}


function read_producto(datos)
{
    carrito = new Carro();
    //console.log(datos);
    
    datos.forEach(item =>{
        //Creamos el objeto
        const producto = new Item(item.id, item.flash, item.end_flash, item.enlace, item.img, item.alt, item.titulo, item.descripcion, item.descuento, item.precio, item.n_estrellas, item.stock, item.n_categorias, item.categorias);
        let total = parseFloat(producto.precio)-parseFloat(producto.descuento); 
        //Seleccionamos el template por defecto
        var producto_template = prod_template;

        //Si es flash, cambiamos el template y añadimos el contador
        if(producto.flash == true)
        {
            producto_template = prod_flash_template;
        }

        //Usamos template-producto para crear el producto y lo añadimos al fragment con los datos del objeto
        producto_template.querySelector('.producto').setAttribute("id", "producto_"+producto.id);
        producto_template.querySelector('a').setAttribute("href", producto.enlace);

        producto_template.querySelector('img').setAttribute("src", producto.img);
        producto_template.querySelector('img').setAttribute("alt", producto.alt);

        producto_template.querySelector('.titulo').textContent = producto.titulo;
        producto_template.querySelector('.descripcion').textContent = producto.descripcion;
        producto_template.querySelector('.precio').textContent = producto.precio.toFixed(2)+"€";
        producto_template.querySelector('.descuento').textContent = total.toFixed(2)+"€";
        producto_template.querySelector('.unidades_stock').textContent = producto.stock;
        producto_template.querySelector('.unidades_stock').style.color = "";
        producto_template.querySelector('.unidades_stock').style.fontWeight = "";

        producto_template.querySelector('.boton_comprar').textContent = "Añadir";
        producto_template.querySelector('.boton_comprar').setAttribute("onclick", "addCarrito("+producto.id+")");
        //console.log(producto_template.querySelector('.boton_comprar'));

        producto_template.querySelector('.categoria').innerHTML = "Categoría: ";
        for(let i = 0; i < producto.n_categorias; i++)
        {
            var datespan = document.createElement("span");
            datespan.setAttribute("class", "categoria_nombre");
            datespan.textContent = producto.categorias[i].nombre;
            producto_template.querySelector('.categoria').appendChild(datespan);

        }

        //Si no hay descuento, se oculta el precio con descuento
        if(producto.descuento == 0)
        {
            producto_template.querySelector('.precio').textContent = "";
        }

        //Si no hay stock, se cambia el botón de comprar por uno que redirija a Amazon y se marca el stock en bold y rojo
        if(producto.stock == 0)
        {
            producto_template.querySelector('.unidades_stock').textContent = "No disponible";
            producto_template.querySelector('.unidades_stock').style.color = "red";
            producto_template.querySelector('.unidades_stock').style.fontWeight = "bold";

            producto_template.querySelector('.boton_comprar').textContent = "Comprar en Amazon";
            producto_template.querySelector('.boton_comprar').setAttribute("onclick", "window.open('https://amazon.es', '_blank')");
        }
        
        //Dependiendo del número de estrellas, se añaden las estrellas al producto, pueden haber de 0 a 5 estrellas
        for (let i = 0; i < producto.n_estrellas; i++) {
            producto_template.querySelectorAll('.fa-star')[i].classList.remove('unchecked');
            producto_template.querySelectorAll('.fa-star')[i].classList.add('checked');
        }

        //Dependiendo del número de estrellas, se añaden las estrellas vacías al producto, pueden haber de 0 a 5 estrellas
        for (let i = producto.n_estrellas; i < 5; i++) {
            producto_template.querySelectorAll('.fa-star')[i].classList.remove('checked');
            producto_template.querySelectorAll('.fa-star')[i].classList.add('unchecked');
        }

        //Guardamos el producto en el array de productos
        productos.push(producto);

        const clone = producto_template.cloneNode(true);
        fragment.appendChild(clone);
    }) 
    producto.appendChild(fragment);

    //para cada producto, si es flash, se añade el contador
    productos.forEach(producto => {
        if(producto.flash == true)
        {
            countdown("producto_"+producto.id, producto.end_flash);
        }
    });
}

//Función para añadir un producto al carrito
function addCarrito(producto_id)
{
    var producto = productos.find(producto => producto.id == producto_id);
    //console.log(producto);
    carrito.add_item(producto);
}


/**
 * FUNCIONES PARA EL CARRITO
 */
//Función para eliminar un producto del carrito
function popItem(id)
{
    carrito.pop_item(id);
}

//Función para eliminar todos los productos de un tipo del carrito
function popAllItems(id)
{
    carrito.pop_all_items(id);
}

//Función para vaciar el carrito
function vaciarCarrito()
{
    carrito.empty_all();
}

//Función para limpiar la consola
function clearConsole() 
{
    console.clear();
}

/**
 * FUNCIONES PARA EL TIMER
 */
function countdown(id, tiempo)
{
    var oferta = document.getElementById(id);
    //parse the date where tiempo is in format "yyyy-mm-dd"
    var fecha_fin = new Date(tiempo);
    var fecha_actual = new Date();
    var tiempo_restante = Math.floor((fecha_fin - fecha_actual) / 1000)

    var timer = setInterval(function()
    {
        var dias = Math.floor(tiempo_restante / (24 * 60 * 60));
        var horas = Math.floor((tiempo_restante % (24 * 60 * 60)) / (60 * 60));
        var minutos = Math.floor((tiempo_restante % (60 * 60)) / (60));
        var segundos = Math.floor((tiempo_restante % (60)));

        if(tiempo_restante <= 0)
        {
            clearInterval(timer);
            oferta.querySelector('.tiempo_oferta').textContent = "¡OFERTA FINALIZADA!";
        }
        else
        {
            oferta.querySelector('.t_restante').textContent = dias + "d:" + horas + "h:" + minutos + "m:" + segundos + "s";
            tiempo_restante--;
        }
    }, 1000);

}


/**
 * CUPON DE DESCUENTO
*/
// VARIABLES GLOBALES
var DESCUENTO_CUPON = 10; 
var TIEMPO_RESTANTE = 15;
var NAVEGADOR = "Firefox"; 

// Desplaza a posiciones aleatorias lentamente el cupón de descuento
function moveCupon() {
    // Obtiene el cupón
    var cupon = document.getElementById("popup_cupon");
    // Obtiene el ancho y alto de la pantalla
    var width = window.innerWidth;
    var height = window.innerHeight;
    // Obtiene el ancho y alto del cupón
    var cupon_width = (cupon.offsetWidth);
    var cupon_height = (cupon.offsetHeight) - 20;
    // Obtiene la posición actual del cupón
    var cupon_x = cupon.offsetLeft;
    var cupon_y = cupon.offsetTop;
    // Obtiene la posición final del cupón
    var final_x = Math.floor(Math.random() * (width - cupon_width));
    var final_y = Math.floor(Math.random() * (height - cupon_height));
    // Obtiene la distancia que hay que recorrer
    var distance_x = final_x - cupon_x;
    var distance_y = final_y - cupon_y;
    // Obtiene el tiempo que tardará en recorrer la distancia
    var time = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2)) * 10;
    // Desplaza el cupón
    cupon.style.transition = "all " + time + "ms";
    cupon.style.left = final_x + "px";
    cupon.style.top = final_y + "px";
    // Vuelve a ejecutar la función al acabar el tiempo
    setTimeout(moveCupon, time);
}

// Temporizador para el cupón de descuento
function temporizador_cupon(){
    var cupon = document.getElementById("popup_cupon");
    var tiempo = TIEMPO_RESTANTE;
    document.getElementById("tiempo_cupon").innerHTML = tiempo;
    var temporizador = setInterval(function(){
        tiempo--;
        if (tiempo == 0){
            cupon.style.display = "none";
            clearInterval(temporizador);
        }else{
            // Pone en tiempo_cupon el tiempo que queda
            document.getElementById("tiempo_cupon").innerHTML = tiempo;
        }
    }, 1000);
}

function accion_cupon(){
    var cupon = document.getElementById("popup_cupon");
    if (navigator.userAgent.indexOf(NAVEGADOR) != -1){
        alert("¡Cupón aplicado! Descuento del " + DESCUENTO_CUPON + "% en tu próxima compra.");
        document.getElementById("descuento_aplicado").innerHTML = DESCUENTO_CUPON;
        document.getElementById("resumen_carrito").style.display = "grid";
        document.getElementById("descuento_wrapper").style.display = "flex";
        descuento_pedido = DESCUENTO_CUPON;
        carrito.actualizar_precio_total();
    }else{
        alert("Usted no está usando " + NAVEGADOR + ". No se puede aplicar el cupón.");
    }
    cupon.style.display = "none";
}

// Ejecuta moveCupon al cargar la página
addEventListener("load", moveCupon);
addEventListener("load", temporizador_cupon);
addEventListener("resize", function (){
    // La transición se desactiva al cambiar el tamaño de la pantalla
    var cupon = document.getElementById("popup_cupon");
    cupon.style.transition = "none";
});
