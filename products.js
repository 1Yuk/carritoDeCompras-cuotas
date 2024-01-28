const productos = [
    { marca: 'Redragon', nombre: 'kumara k552', categoria: 'Teclado', precio: 65.499, imagen: '/assets/redragonTeclado.webp' },
    { marca: 'HyperX', nombre: 'Alloy Origins QWERTY', categoria: 'Teclado', precio: 122.350, imagen: '/assets/hyperxTeclado.webp' },
    { marca: 'Logitech', nombre: 'G Serie G G915 TKL QWERTY GL', categoria: 'Teclado', precio: 255.869, imagen: '/assets/tecladoLogitech.webp' },
    { marca: 'HyperX', nombre: 'Cloud II Wireless HHSC2X-BA', categoria: 'Auriculares', precio: 329.999, imagen: '/assets/hyperxAuriculares.webp' },
    { marca: 'Logitech', nombre: 'G Series G733 KDA', categoria: 'Auriculares', precio: 195.999, imagen: '/assets/logitechAuriculares.webp' },
    { marca: 'Samsung', nombre: 'Monitor G4 25" 240hz 1ms', categoria: 'Pantallas', precio: 438.629, imagen: '/assets/samsungMonitor-1.webp' },
    { marca: 'Asus', nombre: 'Monitor Vg248qg Pantalla 24" 240hz 3ms', categoria: 'Pantallas', precio: 269.999, imagen: '/assets/asusMonitor-1.webp' },
    { marca: 'Asus TUF', nombre: 'Monitor curvo VG24VQE Pantalla 23.6" 144hz 1ms', categoria: 'Pantallas', precio: 387.330, imagen: '/assets/asusMonitor-2.webp' }
];

const mostrarProductos = (producto) => {
    const container = document.querySelector('#productos-container');
    container.innerHTML += /*html*/ `
    <div class="col-md-3 mb-3">
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.marca}</h5>
                <p class="card-text">${producto.nombre}</p>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn btn-warning mt-auto">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `;
}

const mostrarCategorias = () => {
    const categoria = document.querySelector('#categoria-container');
    categoria.innerHTML += /*html*/ `
    <article class="row">
        <div class="col-md-6">
            <div class="mb-3">
                <label for="barraBusqueda">Buscar productos por marcas:</label>
                <input type="text" class="form-control" id="barraBusqueda" placeholder="Buscar productos">
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-3">
                <label for="categoria">Categoría:</label>
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
    for (let producto of productos) {
        mostrarProductos(producto);
    }
}
const filtrarProductos = () => {
    const categoriaSeleccionada = document.querySelector('#categoria').value;
    const textoBusqueda = document.querySelector('#barraBusqueda').value.toLowerCase();
    const container = document.querySelector('#productos-container');
    container.innerHTML = '';
    const productosFiltrados = productos.filter(producto => 
        (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada) &&
        (producto.marca.toLowerCase().includes(textoBusqueda) || producto.nombre.toLowerCase().includes(textoBusqueda))
    );

    for (let producto of productosFiltrados) {
        mostrarProductos(producto);
    }
}

document.addEventListener("DOMContentLoaded", mostrarCategorias);