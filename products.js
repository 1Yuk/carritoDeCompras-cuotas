const productos = [
    { marca: 'Redragon', nombre: 'kumara k552', categoria: 'Teclado', precio: 65.490, imagen: './assets/redragonTeclado.webp' },
    { marca: 'HyperX', nombre: 'Alloy Origins QWERTY', categoria: 'Teclado', precio: 122.352, imagen: './assets/hyperxTeclado.webp' },
    { marca: 'Logitech', nombre: 'G Serie G G915 TKL QWERTY GL', categoria: 'Teclado', precio: 255.869, imagen: './assets/tecladoLogitech.webp' },
    { marca: 'HyperX', nombre: 'Cloud II Wireless HHSC2X-BA', categoria: 'Auriculares', precio: 329.999, imagen: './assets/hyperxAuriculares.webp' },
    { marca: 'Logitech', nombre: 'G Series G733 KDA', categoria: 'Auriculares', precio: 195.999, imagen: './assets/logitechAuriculares.webp' },
    { marca: 'Samsung', nombre: 'Monitor G4 25" 240hz 1ms', categoria: 'Pantallas', precio: 438.629, imagen: './assets/samsungMonitor-1.webp' },
    { marca: 'Asus', nombre: 'Monitor Vg248qg Pantalla 24" 240hz 3ms', categoria: 'Pantallas', precio: 269.999, imagen: '/assets/asusMonitor-1.webp' },
    { marca: 'Asus TUF', nombre: 'Monitor curvo VG24VQE Pantalla 23.6" 144hz 1ms', categoria: 'Pantallas', precio: 387.333, imagen: '/assets/asusMonitor-2.webp' }
];

const carrito = [];
const agregarAlCarrito = (productoIndex) => (producto = productos[productoIndex]) && typeof producto.precio === 'number' ? (carrito.push(producto), actualizarCarrito()) : null;

const actualizarCarrito = () => {
    const tablaCarrito = document.querySelector('#cart-body');
    const cantidadCarrito = document.querySelector('#carrito-cantidad');

    tablaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const modal = /*html*/ `
            <tr>
                <td><img class='icon-product' src='${producto.imagen}' alt='${producto.nombre}'></td>
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio.toFixed(3)}</td>
                <td><button type='button' class='btn btn-danger' data-index='${index}'>Eliminar</button></td>
            </tr>
        `;
        tablaCarrito.innerHTML += modal;
    });
    cantidadCarrito.textContent = carrito.length;
};

const comprar = () => {
    const totalGasto = carrito.reduce((total, producto) => total + producto.precio, 0);
    const formateadaTotal = formatearNumero(totalGasto, 3);
    Swal.fire({
        title: 'Compra realizada!',
        icon: 'success',
        text: `El costo total del gasto es: $${formateadaTotal}`
    });
    carrito.length = 0;
    actualizarCarrito();
};

const formatearNumero = (numero, decimales) => { return numero.toFixed(decimales).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
const eliminarDelCarrito = (eliminarIndex) => 
carrito[eliminarIndex] ? (carrito.splice(eliminarIndex, 1), actualizarCarrito()) : null;

const mostrarProductos = (producto, productoIndex) => {
    const container = document.querySelector('#productos-container');

    container.innerHTML += /*html*/ `
        <div class="col-md-3 mb-3">
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.marca}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">Precio: $${producto.precio.toFixed(3)}</p>
                    <button class="btn btn-primary mt-auto" data-index='${productoIndex}'>Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;
};

const filtrarProductos = () => {
    const categoriaSeleccionada = document.querySelector('#categoria').value;
    const textoBusqueda = document.querySelector('#barraBusqueda').value.toLowerCase();
    const container = document.querySelector('#productos-container');
    container.innerHTML = '';
    const productosFiltrados = productos.filter(producto => 
        (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada) &&
        (producto.marca.trim().toLowerCase().includes(textoBusqueda) || producto.nombre.toLowerCase().includes(textoBusqueda))
    );
    productosFiltrados.forEach((producto, index) => { mostrarProductos(producto, index); });
};

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('#productos-container');
    const categoriaContainer = document.querySelector('#categoria-container');
    
    categoriaContainer.innerHTML += /*html*/ `
        <article class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="colorTexto" for="barraBusqueda">Buscar productos por marcas:</label>
                    <input type="text" class="form-control" id="barraBusqueda" placeholder="Buscar productos">
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="colorTexto" for="categoria">Categoría:</label>
                    <select class="form-control" id="categoria">
                        <option>Todos</option>
                        <option>Auriculares</option>
                        <option>Teclado</option>
                        <option>Pantallas</option>
                    </select>
                </div>
            </div>
        </article>
    `;

    document.querySelector('#barraBusqueda').addEventListener('input', filtrarProductos);
    document.querySelector('#categoria').addEventListener('change', filtrarProductos);

    productos.forEach((producto, index) => mostrarProductos(producto, index));

    container.addEventListener('click', (evento) => evento.target.classList.contains('btn') && agregarAlCarrito(evento.target.getAttribute('data-index')));
    document.querySelector('#cart-body').addEventListener('click', (evento) => evento.target.classList.contains('btn') && eliminarDelCarrito(evento.target.getAttribute('data-index')));

});

document.querySelector('#comprar-btn').addEventListener('click', comprar);