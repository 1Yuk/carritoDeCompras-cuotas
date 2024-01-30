const iniciarSesion = () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    email && password
        ? (guardarCredencialesEnLocalStorage(email, password), window.location.href = 'ecommerce.html')
        : alert('Por favor, ingresa un correo y una contraseña');
};

const guardarCredencialesEnLocalStorage = (email, password) => (
    localStorage.setItem('email', email),
    localStorage.setItem('password', password)
);

document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarSesion();
});