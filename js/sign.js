const modal = document.getElementById("modalOverlaySign");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function openModal() {
    modal.style.display = "flex";
    loginForm.classList.add("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    document.getElementById("modalTitleSign").innerText = "Вход";
}

function closeModalSign() {
    modal.style.display = "none";
    clearErrorsSign();
    resetFormsSign();
}

function switchToRegisterSign() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    document.getElementById("modalTitleSign").innerText = "Регистрация";
}

function switchToLoginSign() {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    document.getElementById("modalTitleSign").innerText = "Вход";
}


function formatPhoneSign(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i === 0) {
            formatted += '+7';
        } else if (i === 1) {
            formatted += ` (${value[i]}`;
        } else if (i === 4) {
            formatted += `) ${value[i]}`;
        } else if (i === 7) {
            formatted += `-${value[i]}`;
        } else if (i === 9) {
            formatted += `-${value[i]}`;
        } else {
            formatted += value[i];
        }
    }

    input.value = formatted;

    if (value.length < 11) {
        input.value = formatIncompleteNumberSign(value);
    }
}

function formatIncompleteNumberSign(value) {
    let formatted = '+7';
    for (let i = 1; i < value.length; i++) {
        if (i === 1) {
            formatted += ` (${value[i]}`;
        } else if (i === 4) {
            formatted += `) ${value[i]}`;
        } else if (i === 7 || i === 9) {
            formatted += `-${value[i]}`;
        } else {
            formatted += value[i];
        }
    }
    return formatted;
}

function validateFieldSign(input) {
    const errorDiv = document.getElementById(input.id + "Error");
    if (!input.value.trim()) {
        errorDiv.style.display = "block";
    } else {
        errorDiv.style.display = "none";
    }
}

function checkPasswordSign(input) {
    const errorDiv = document.getElementById(input.id + "Error");
    if (input.value.length > 0 && input.value.length < 6) {
        errorDiv.style.display = "block";
    } else {
        errorDiv.style.display = "none";
    }
}

function togglePasswordVisibilitySign(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrorsSign();

    const phoneInput = document.getElementById("phoneSign").value.replace(/\D/g, "");
    const passwordInput = document.getElementById("passwordLogin").value;

    let valid = true;

    if (phoneInput.length !== 11) {
        document.getElementById("phoneError").style.display = "block";
        valid = false;
    }

    if (passwordInput.length < 6) {
        document.getElementById("passwordLoginError").style.display = "block";
        valid = false;
    }

    if (valid) {
        const submitBtn = document.querySelector("#loginForm .submit-btn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Вход...";

        const data = {
            type: 'authorization',
            phone: document.getElementById('phoneSign').value,
            password: document.getElementById('passwordLogin').value
        }

        const response = await fetch(API_URL('user/user'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        if (result.success === true) {
            localStorage.setItem('authToken', result.token);
            closeModalSign();
            return location.reload();
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Вход";
        alert("Повторите попытку входа");
    }
});

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrorsSign();

    const surname = document.getElementById("surname").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("regPhone").value.replace(/\D/g, "");
    const password = document.getElementById("regPassword").value;

    let valid = true;

    if (!surname) {
        document.getElementById("surnameError").style.display = "block";
        valid = false;
    }

    if (!name) {
        document.getElementById("nameError").style.display = "block";
        valid = false;
    }

    if (phone.length !== 11) {
        document.getElementById("regPhoneError").style.display = "block";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("regPasswordError").style.display = "block";
        valid = false;
    }

    if (valid) {
        const submitBtn = document.querySelector("#registerForm .submit-btn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Регистрация...";

        const data = {
            type: 'register',
            surName: document.getElementById('surname').value,
            firstName: document.getElementById('name').value,
            lastName: document.getElementById('patronymic').value,
            phone: document.getElementById('regPhone').value,
            password: document.getElementById('regPassword').value
        }
        const response = await fetch(API_URL('user/user'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        if (result.success === true) {
            return switchToLoginSign();
        } else {
            alert("Пользователь зарегистрирован или произошла ошибка")
        }


    }
});

function clearErrorsSign() {
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
}

function resetFormsSign() {
    loginForm.reset();
    registerForm.reset();
    document.getElementById("phoneSign").value = "";
    document.getElementById("regPhone").value = "";
}

window.onclick = function (event) {
    if (event.target === modal) {
        // closeModalSign();
    }
};