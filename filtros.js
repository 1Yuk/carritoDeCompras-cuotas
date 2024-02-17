const aplicarFiltros = () => {
    const obtenerElemento = (id) => document.querySelector(`#${id}`);
    const categoriaSeleccionada = obtenerElemento('categoria').value;
    const textoBusqueda = obtenerElemento('barraBusqueda').value.toLowerCase();
    const envioGratisSeleccionado = obtenerElemento('envioGratis').checked;
    const llegaHoySeleccionado = obtenerElemento('llegaHoy').checked;
    const ordenAZSeleccionado = obtenerElemento('ordenAZ').checked;

    const rangoPrecioSeleccionado = parseFloat(obtenerElemento('rangoPrecio').value);
    document.getElementById('precioOutput').textContent = rangoPrecioSeleccionado.toFixed(3);

    const marcasSeleccionadas = ['Redragon', 'HyperX', 'Logitech'].filter(marca => obtenerElemento(`marca${marca}`).checked);

    const container = obtenerElemento('productos-container');
    container.innerHTML = '';

    const productosFiltrados = productos.filter(producto =>
        (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada) &&
        (marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca)) &&
        (producto.marca.trim().toLowerCase().includes(textoBusqueda) || producto.nombre.toLowerCase().includes(textoBusqueda)) &&
        (!envioGratisSeleccionado || producto.envioGratis) &&
        (!llegaHoySeleccionado || producto.llegaHoy) &&
        (producto.precio <= rangoPrecioSeleccionado)
    );

    ordenAZSeleccionado ? productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre)) : null;
    productosFiltrados.forEach((producto, index) => mostrarProductos({ ...producto }, index));
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

    document.querySelector('#barraBusqueda').addEventListener('input', aplicarFiltros);
    document.querySelector('#categoria').addEventListener('change', aplicarFiltros);

    document.querySelector('#envioGratis').addEventListener('change', aplicarFiltros);
    document.querySelector('#llegaHoy').addEventListener('change', aplicarFiltros);
    document.querySelector('#ordenAZ').addEventListener('change', aplicarFiltros);
    document.querySelector('#marcaRedragon').addEventListener('change', aplicarFiltros);
    document.querySelector('#marcaHyperX').addEventListener('change', aplicarFiltros);
    document.querySelector('#marcaLogitech').addEventListener('change', aplicarFiltros);

    document.querySelector('#rangoPrecio').addEventListener('input', aplicarFiltros);

    productos.forEach((producto, index) => mostrarProductos(producto, index));

    container.addEventListener('click', (evento) => evento.target.classList.contains('btn') && agregarAlCarrito(evento.target.getAttribute('data-index')));
    document.querySelector('#cart-body').addEventListener('click', (evento) => evento.target.classList.contains('btn') && eliminarDelCarrito(evento.target.getAttribute('data-index')));
});