const init = () => {
    const container = document.querySelector('#productos-container');
    const categoriaContainer = document.querySelector('#categoria-container');

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

    categoriaContainer.innerHTML += /*html*/ `
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
};


/* ----------------------------- CODIGO ORIGINAL ---------------------------- */

// const mostrarProductos = (producto) => {
//     const container = document.querySelector('#productos-container');
//     container.innerHTML += /*html*/ `
//     <div class="col-md-3 mb-3">
//         <div class="card h-100">
//             <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
//             <div class="card-body d-flex flex-column">
//                 <h5 class="card-title">${producto.marca}</h5>
//                 <p class="card-text">${producto.nombre}</p>
//                 <p class="card-text">Precio: $${producto.precio}</p>
//                 <button class="btn btn-warning mt-auto">Agregar al carrito</button>
//             </div>
//         </div>
//     </div>
//     `;

// }


// const mostrarCategorias = () => {
//     const categoria = document.querySelector('#categoria-container');
//     categoria.innerHTML += /*html*/ `
//     <article class="row">
//         <div class="col-md-6">
//             <div class="mb-3">
//                 <label for="barraBusqueda">Buscar productos por marcas:</label>
//                 <input type="text" class="form-control" id="barraBusqueda" placeholder="Buscar productos">
//             </div>
//         </div>
//         <div class="col-md-6">
//             <div class="mb-3">
//                 <label for="categoria">Categoría:</label>
//                 <select class="form-control" id="categoria">
//                     <option>Todos</option>
//                     <option>Auriculares</option>
//                     <option>Teclado</option>
//                     <option>Pantallas</option>
//                 </select>
//             </div>
//         </div>
//     </article>
//     `;

//     document.querySelector('#barraBusqueda').addEventListener('input', filtrarProductos);
//     document.querySelector('#categoria').addEventListener('change', filtrarProductos);
//     for (let producto of productos) {
//         mostrarProductos(producto);
//     }
// }