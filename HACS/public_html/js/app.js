// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el formulario de login
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío automático del formulario

            // Capturar los valores de email y password del formulario
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Email:', email);
            console.log('Password:', password);

            try {
                // Realizar la solicitud de login al servidor
                const response = await fetch('https://hacs-server.bdemir.net/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                console.log('Response status:', response.status);
                console.log('Response data:', data);

                if (response.ok) {
                    alert('Login successful!');

                    // Redirigir según el rol del usuario
                    const userRole = data.data.role;
                    switch (userRole) {
                        case 'donor':
                            window.location.href = 'actors/donor.html';
                            break;
                        case 'aidOrg':
                            window.location.href = 'actors/aidOrg.html';
                            break;
                        case 'volunteer':
                            window.location.href = 'actors/volunteer.html';
                            break;
                        case 'government':
                            window.location.href = 'actors/government.html';
                            break;
                        case 'affected':
                            window.location.href = 'actors/affected.html';
                            break;
                        default:
                            alert('Unknown role. Please contact support.');
                    }
                } else {
                    alert(`Login failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Server error. Please try again later.');
            }
        });
    } else {
        console.error('loginForm not found');
    }

    // Lógica para el registro
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío automático del formulario

            // Capturar los valores del formulario de registro
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            };

            console.log('Registering user:', userData);

            try {
                // Realizar la solicitud de registro al servidor
                const response = await fetch('https://hacs-server.bdemir.net/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                console.log('Response status:', response.status);
                console.log('Response data:', data);

                if (response.ok) {
                    alert('Registration successful! You can now log in.');
                    window.location.href = 'login.html';
                } else {
                    alert(`Registration failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Server error. Please try again later.');
            }
        });
    } else {
        console.error('registerForm not found');
    }
});
