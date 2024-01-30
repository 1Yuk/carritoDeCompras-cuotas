const iniciarSesion = () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const credenciales = email && password ? { email, password } : null;
    credenciales
    ? (guardarCredencialesEnLocalStorage(credenciales), (window.location.href = 'ecommerce.html'))
    : alert('Por favor, ingresa un correo y una contraseña');
};

const guardarCredencialesEnLocalStorage = (credenciales) => {
    localStorage.setItem('credenciales', JSON.stringify(credenciales));
};

document.querySelector('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    iniciarSesion();
});