const modalOrder = document.getElementById("requestModal");
const form = document.getElementById("requestForm");
let le_request;

const bid_a_success = document.getElementById('bid_a_success');
if (!!localStorage.getItem('authToken')) {
    bid_a_success.insertAdjacentHTML('beforeend', `<a href="#" id="le_request" class="header__contact-link">
                                <h5 class="header__contact-write">Оставить заявку</h5>
                            </a>`);
    le_request = document.getElementById('le_request');
    le_request.addEventListener('click', (e) => {
        e.preventDefault();
        modalOrder.style.display = "flex";
        clearErrorsOrder();
        resetFormOrder();
        loadServices();
    })

}

function closeModalOrder() {
    modalOrder.style.display = "none";
}

async function loadServices() {
    const serviceSelect = document.getElementById("serviceOrder");
    serviceSelect.innerHTML = "<option>Загрузка услуг...</option>";

    try {
        const response = await fetch(API_URL('pages/pagesload') + "?list=services");
        const data = await response.json();

        serviceSelect.innerHTML = "<option value=''>Выберите услугу</option>";

        data.list.forEach((order, index) => {
            const option = document.createElement("option");
            option.value = order.id;
            option.textContent = `${index + 1}. ${order.name}`;
            serviceSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка загрузки услуг:", error);
        serviceSelect.innerHTML = "<option>Не удалось загрузить услуги</option>";
    }
}

function validateFieldOrder(input) {
    const errorDiv = document.getElementById(input.id + "Error");
    if (!input.value.trim()) {
        errorDiv.style.display = "block";
    } else {
        errorDiv.style.display = "none";
    }
}

function clearErrorsOrder() {
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
}

function resetFormOrder() {
    form.reset();
    document.getElementById("phoneOrder").value = "";
}

function formatPhoneOrder(input) {
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
        input.value = formatIncompleteNumberOrder(value);
    }
}

function formatIncompleteNumberOrder(value) {
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

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearErrorsOrder();

    const fullName = document.getElementById("fullNameOrder").value.trim();
    const phone = document.getElementById("phoneOrder").value.replace(/\D/g, "");
    const service = document.getElementById("serviceOrder").value;

    let valid = true;

    if (!fullName) {
        document.getElementById("fullNameOrderError").style.display = "block";
        valid = false;
    }

    if (phone.length !== 11) {
        document.getElementById("phoneError").style.display = "block";
        console.log(phone)
        valid = false;
    }

    if (!service) {
        document.getElementById("serviceError").style.display = "block";
        valid = false;
    }

    if (valid) {
        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка...";

        const payload = {
            fio: fullName,
            phone: document.getElementById("phoneOrder").value,
            service: service,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(API_URL('user/sendbid'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Заявка успешно отправлена!");
                closeModalOrder();
            } else {
                throw new Error("Ошибка сервера");
            }
        } catch (err) {
            alert("Не удалось отправить заявку");
            console.error(err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Отправить заявку";
        }
    }
});

window.onclick = function (event) {
    if (event.target === modalOrder) {
        // closeModalOrder();
    }
};