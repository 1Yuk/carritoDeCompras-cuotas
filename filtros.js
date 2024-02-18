document.addEventListener("DOMContentLoaded", () => {
    const obtenerElemento = (id) => document.querySelector(`#${id}`);
    const container = obtenerElemento('productos-container');
    const categoriaContainer = obtenerElemento('categoria-container');
    
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

    const actualizarPrecioOutput = (valor) => obtenerElemento('precioOutput').textContent = valor.toFixed(3);
    const aplicarFiltros = () => {
        const categoriaSeleccionada = obtenerElemento('categoria').value;
        const textoBusqueda = obtenerElemento('barraBusqueda').value.toLowerCase();
        const envioGratisSeleccionado = obtenerElemento('envioGratis').checked;
        const llegaHoySeleccionado = obtenerElemento('llegaHoy').checked;
        const ordenAZSeleccionado = obtenerElemento('ordenAZ').checked;
        const rangoPrecioSeleccionado = parseFloat(obtenerElemento('rangoPrecio').value);
        actualizarPrecioOutput(rangoPrecioSeleccionado);

        const marcasSeleccionadas = ['Redragon', 'HyperX', 'Logitech'].filter(marca => obtenerElemento(`marca${marca}`).checked);
        container.innerHTML = '';
        const productosFiltrados = productos.filter(producto =>
            (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada) &&
            (marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca)) &&
            (producto.marca.trim().toLowerCase().includes(textoBusqueda) || producto.nombre.toLowerCase().includes(textoBusqueda)) &&
            (!envioGratisSeleccionado || producto.envioGratis) &&
            (!llegaHoySeleccionado || producto.llegaHoy) &&
            (producto.precio <= rangoPrecioSeleccionado)
        );

        ordenAZSeleccionado && productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        productosFiltrados.forEach((producto, index) => mostrarProductos({ ...producto }, index));
    };

    const agregarEvento = (id, evento, callback) => obtenerElemento(id).addEventListener(evento, callback);

    agregarEvento('barraBusqueda', 'input', aplicarFiltros);
    agregarEvento('categoria', 'change', aplicarFiltros);
    agregarEvento('envioGratis', 'change', aplicarFiltros);
    agregarEvento('llegaHoy', 'change', aplicarFiltros);
    agregarEvento('ordenAZ', 'change', aplicarFiltros);
    agregarEvento('marcaRedragon', 'change', aplicarFiltros);
    agregarEvento('marcaHyperX', 'change', aplicarFiltros);
    agregarEvento('marcaLogitech', 'change', aplicarFiltros);
    agregarEvento('rangoPrecio', 'input', aplicarFiltros);

    productos.forEach((producto, index) => mostrarProductos(producto, index));
    container.addEventListener('click', evento => {
        const botonAgregar = evento.target.closest('.btn-primary');
        if (botonAgregar) {
            const productId = botonAgregar.getAttribute('data-id');
            const selectedProduct = productos.find(producto => producto.id == productId);
            agregarAlCarrito(selectedProduct);
        }
    });

    obtenerElemento('cart-body').addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn')) {
            eliminarDelCarrito(evento.target.getAttribute('data-index'));
        }
    });
});