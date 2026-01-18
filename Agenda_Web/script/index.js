 // Cuando se registra un usuario
 document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // evitar que se recargue

    // Obtener valores del formulario de registro
    const user = document.getElementById('registerUser').value;
    const email = document.getElementById('registerEmail').value;
    const pass = document.getElementById('registerPass').value;

    // Guardarlos en el localStorage (como si fuera una "base de datos temporal")
    const userData = {
        user: user,
        email: email,
        password: pass
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");

    // Opcional: limpiar los campos
    document.getElementById('registerForm').reset();
    });

    // Cuando se intenta hacer login
    document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // evitar que se recargue

    const emailLogin = document.getElementById('loginEmail').value;
    const passLogin = document.getElementById('loginPass').value;

    // Leer los datos del localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && emailLogin === storedData.email && passLogin === storedData.password) {
        alert("¡Inicio de sesión exitoso!");
        window.location.href = "index/contacto.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
    });