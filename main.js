/* ---------------------- Inicio del carrito de compras --------------------- */
let carrito = [];
let total = 0;
let seleccion;

const productos = [
    { id: 1, nombre: '43" UHD 4K Smart TV', marca: '📺Samsung', precio: 540000 },
    { id: 2, nombre: 'Galaxy A23', marca: '📱Samsung', precio: 365000 },
    { id: 3, nombre: 'Notebook Vivobook 15', marca: '💻Asus', precio: 445000 },
    { id: 4, nombre: '13 Pro Max', marca: '📱Iphone', precio: 220500 },
    { id: 5, nombre: 'Reloj Smartwatch', marca: '⌚Noganet', precio: 30500 },
];

const cuotasDisponibles = [
    { cuotas: 1, tasa: 0 },
    { cuotas: 3, tasa: 5 },
    { cuotas: 6, tasa: 8 },
];

/* -------------- Funcion para seleccionar los productos -------------- */
const mostrarProductos = () => {
    let mensaje = 'Seleccione un producto, indicando su número correspondiente: 📌\n'
    for (const producto of productos) {
        mensaje += ` ${producto.id}. ${producto.marca} ${producto.nombre} -💲${producto.precio}\n`;
    }
    return mensaje;
};
mostrarProductos();

/* ------------- Funcion actualizar el carrito de los productos ------------- */
const actualizarCarrito = () => {
    total = carrito.reduce((acc, productId) => {
        const producto = productos.find(p => p.id === productId);
        return acc + producto.precio;
    }, 0);

    let mensajeCarrito = 'El total de los productos en tu carrito es: 🛒\n';

    for (const productId of carrito) {
        const producto = productos.find(p => p.id === productId);
        mensajeCarrito += `${producto.nombre} -💲${producto.precio}\n`;
    }

    mensajeCarrito += `MONTO TOTAL: 💲${total}`;

    alert(mensajeCarrito);
}

/* ------------- Funcion para agregar los productos al carritos ------------- */
const agregarAlCarrito = () => {
    const mensajeProductos = mostrarProductos();
    let productoElegido = prompt(mensajeProductos);

    if (productoElegido === null || isNaN(productoElegido)) {
        alert('Entrada no válida. Inténtelo de nuevo. ❌');
        return;
    }

    productoElegido = parseInt(productoElegido);

    const producto = productos.find(p => p.id === productoElegido);

    if (!producto) {
        alert('Número de producto no válido. Inténtelo de nuevo. ❌');
        return;
    }

    carrito.push(producto.id);
    actualizarCarrito();
};
agregarAlCarrito();

/* ----------- Calcular las cuotas de los productos mas las tasas ----------- */
function calcularCuotas() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. 🛒\nAgregue productos antes de calcular las cuotas');
        return;
    }

    let mensajeCuotas = 'Seleccione la cantidad de cuotas: 📌\n';
    cuotasDisponibles.forEach((opcion, index) => {
        mensajeCuotas += `${index + 1}. ${opcion.cuotas} cuotas - Tasa: ${opcion.tasa}%\n`;
    });

    let opcionCuotas = prompt(mensajeCuotas);
    if (opcionCuotas === null || isNaN(opcionCuotas) || opcionCuotas <= 0 || opcionCuotas > cuotasDisponibles.length) {
        alert('Opción de cuotas no válida. Inténtelo de nuevo. ❌');
        return;
    }

    const cuotasSeleccionadas = cuotasDisponibles[opcionCuotas - 1];
    const precioTotalConInteres = total * (1 + cuotasSeleccionadas.tasa / 100);

    alert(`Total a pagar en ${cuotasSeleccionadas.cuotas} cuotas con tasa del ${cuotasSeleccionadas.tasa}%:\n💲${precioTotalConInteres.toFixed(2)} (cuotas de💲${(precioTotalConInteres / cuotasSeleccionadas.cuotas).toFixed(2)})`);
}

/* -------------------- Bucle de las opciones de compras -------------------- */
while (true) {
    seleccion = prompt(`Seleccione una acción: \n 1. Agregar producto al carrito 🛒\n 2. Hacer el pago en cuotas 🔢\n 3. Salir ❌\n`);

    
    if (seleccion === null || isNaN(seleccion)) {
        alert('Entrada no válida. Inténtelo de nuevo. ❌');
    }

    seleccion = parseInt(seleccion);

    if (seleccion === 1) {
        agregarAlCarrito();
    } else if (seleccion === 2) {
        calcularCuotas();
    } else if (seleccion === 3) {
        alert('¡Muchas gracias por tu compra! ✅🛒');
        break;
    } else {
        alert('Acción no válida. Inténtelo de nuevo. ❌');
    }
}