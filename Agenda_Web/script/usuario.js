// Obtener usuario guardado
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        document.getElementById('username').value = userData.user;
        document.getElementById('email').value = userData.email;
        document.getElementById('password').value = userData.password;
    } else {
        // Si no hay usuario logueado
        alert("Debes iniciar sesión");
        window.location.href = "index.html"; // ajusta ruta
    }