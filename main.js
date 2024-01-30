const iniciarSesion = () => {
    const usuario = document.querySelector('#user').value;
    const contrasena = document.querySelector('#password').value;

    usuario && contrasena
        ? (guardarUsuarioEnLocalStorage(usuario), window.location.href = 'ecommerce.html')
        : alert('Por favor, ingresa un usuario y una contraseña');
};

const guardarUsuarioEnLocalStorage = (usuario) => localStorage.setItem('usuario', usuario);