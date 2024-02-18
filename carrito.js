const carrito = [];
let productos = [];

const agregarAlCarrito = (producto) => {
    if (producto && typeof producto.precio === 'number') {
        carrito.push(producto);
        actualizarCarrito();

        Toastify({
            text: `Se ha agregado ${producto.nombre} 🛒`,
            duration: 1500,
            gravity: "bottom"
        }).showToast();
    }
};

const actualizarCarrito = () => {
    const tablaCarrito = document.querySelector('#cart-body');
    const cantidadCarrito = document.querySelector('#carrito-cantidad');

    tablaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const modal =  /*html*/ `
            <tr>
                <td><img class='icon-product' src='${producto.imagen}' alt='${producto.nombre}'></td>
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio.toFixed(3)}</td>
                <td><button type='button' class='btn btn-danger' data-id='${index}'>Eliminar</button></td>
            </tr>
        `;
        tablaCarrito.innerHTML += modal;
    });
    cantidadCarrito.textContent = carrito.length;

    const eliminarBtn = document.querySelectorAll('#cart-body .btn-danger');
    eliminarBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const eliminarIndex = parseInt(button.getAttribute('data-id'));
            eliminarDelCarrito(eliminarIndex);
        });
    });
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
const formatearNumero = (numero, decimales) => {
    return numero.toFixed(decimales).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const eliminarDelCarrito = (eliminarIndex) => {
    if (carrito[eliminarIndex]) {
        carrito.splice(eliminarIndex, 1);
        actualizarCarrito();
    }
};

const mostrarProductos = ({ imagen, marca, nombre, precio, id }) => {
    const container = document.querySelector('#productos-container');
    container.innerHTML +=  /*html*/ `
        <div class="col-md-3 mb-3">
            <div class="card h-100">
                <img src="${imagen}" class="card-img-top" alt="${nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${marca}</h5>
                    <p class="card-text">${nombre}</p>
                    <p class="card-text">Precio: $${precio.toFixed(3)}</p>
                    <button class="btn btn-primary mt-auto" data-id='${id}'>Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;
};

const cargarProductosDesdeAPI = async () => {
    const url = 'productos.json';
    try {
        const respuesta = await fetch(url);
        if (respuesta.ok) {
            productos = await respuesta.json();
            productos.forEach((producto) => {
                mostrarProductos(producto);
            });
        } else {
            console.error('Error al obtener productos desde la API:', respuesta.status);
        }
    } catch (error) {
        console.error('Error de red:', error.message);
    }
};

window.addEventListener('DOMContentLoaded', cargarProductosDesdeAPI);
document.querySelector('#comprar-btn').addEventListener('click', comprar);
document.querySelector('#cerrarSesionButton').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});