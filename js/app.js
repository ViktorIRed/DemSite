document.getElementById('register-user').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        type: 'register',
        surName: document.getElementById('regSurName').value,
        firstName: document.getElementById('regFirstName').value,
        lastName: document.getElementById('regLastName').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value
    }

    if (data.surName.length < 3 || data.firstName.length < 3 || data.lastName.length < 3) {
        return alert("Короче 3 символов");
    }
    if (data.phone.length < 9) {
        return alert("Номер телефона короче 9 символов");
    }
    if (data.password.length < 8) {
        return alert("Пароль должен быть минимум 8 символов");
    }

    fetch(API_URL("user/user"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
});
document.getElementById('authorization-user').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        type: 'authorization',
        phone: document.getElementById('authPhone').value,
        password: document.getElementById('authPassword').value
    }
    if (data.phone.length < 9) {
        return alert("Номер телефона короче 9 символов");
    }
    if (data.password.length < 8) {
        return alert("Пароль должен быть минимум 8 символов");
    }

    fetch(API_URL("user/user"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
});


document.addEventListener('DOMContentLoaded', () => {
    const linkToRegister = document.querySelector('#authorization-user a');
    const linkToAuth = document.querySelector('#register-user a');
    const authForm = document.getElementById('authorization-user');
    const registerForm = document.getElementById('register-user');


    linkToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        authForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    linkToAuth.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        authForm.style.display = 'block';
    });
});

