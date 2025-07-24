const token = 'Bearer ' + localStorage.getItem('authToken');

function getUserData() {
    if (!token) {
        return location.href = "index.html"
    }
    fetch(API_URL("user/getRole"), {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.user.role === 'admin') {
                return;
            }
            return location.href = "index.html"
        })
        .catch(err => {
            console.error("Ошибка при получении данных пользователя:", err);
        })
        .finally(() => {
            document.getElementById('preloader').style.display = 'none';
            document.body.style.overflow = 'auto';
        })
}
getUserData();
loadPage('dashboard');

async function loadPage(page) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<p>Загрузка данных...</p>';

    const result = await fetch(API_URL('admin/load'), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    const data = await result.json();
    let dataUsersStrings = "";
    let dataOrderStrings = "";
    let dataServiceStrings = "";

    for (user of data.users) {
        dataUsersStrings += `
            <tr>
                <td>${user.id}</td>
                <td>${user.surname}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.phone}</td>
                <td><button class="delete-btn delete-btn-user" data-id="${user.id}">Удалить</button></td>
            </tr>
            `;
    }
    for (order of data.usersbid) {
        dataOrderStrings += `
            <tr>
                <td>${order.id}</td>
                <td>${order.fio}</td>
                <td>${order.phone}</td>
                <td>${order.service}</td>
                <td><button class="delete-btn delete-btn-order" data-id="${order.id}">Удалить</button></td>
            </tr>
            `
    }
    for (service of data.services) {
        dataServiceStrings += `<tr>
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td><span style="display: inline-block; max-width: 800px; word-wrap: break-wrap; white-space: pre-wrap; overflow-wrap: break-word;">${service.description}</span></td>
                <td><button class="delete-btn delete-btn-service" data-id="${service.id}">Удалить</button></td>
            </tr>
            `
    }

    if (page === 'dashboard') {
        mainContent.innerHTML = `
        <div class="header">
            <h1>Главная</h1>
            
        </div>
        <div class="card">
            <h3>Последние пользователи</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Номер телефона</th>
                    </tr>
                </thead>
                <tbody id="userTableBody"></tbody>
            </table>
        </div>
        <div class="card">
              <h3>Последние заявки</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Услуга</th>
                  </tr>
                </thead>
                <tbody id="orderTableBody"></tbody>
              </table>
            </div>
        `;

        const tbodyUser = document.getElementById('userTableBody');
        let userMainCount = 0, orderMainCount = 0;
        for (let i = data.users.length - 1; i >= 0; i--) {
            if (userMainCount >= 2) break;

            const user = data.users[i];
            tbodyUser.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.surname}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.phone}</td>
                </tr>
            `);
            userMainCount++;
        }
        const tbodyOrder = document.getElementById('orderTableBody');
        for (let i = data.usersbid.length - 1; i >= 0; i--) {
            if (orderMainCount >= 2) break;
            const order = data.usersbid[i];
            tbodyOrder.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.fio}</td>
                    <td>${order.phone}</td>
                    <td>${order.service}</td>
                </tr>
            `);
            orderMainCount++;
        }
        userMainCount = orderMainCount = 0;
    } else if (page === 'users') {
        mainContent.innerHTML = `
            <div class="header">
              <h1>Пользователи</h1>
              
            </div>
            <div class="card">
              <h3>Список пользователей</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Номер телефона</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>${dataUsersStrings}</tbody>
              </table>
            </div>
          `;
    } else if (page === 'orders') {
        mainContent.innerHTML = `
            <div class="header">
              <h1>Заявки</h1>
              
            </div>
            <div class="card">
              <h3>Список заявок</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Услуга</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>${dataOrderStrings}</tbody>
              </table>
            </div>
          `;
    } else if (page === 'services') {
        mainContent.innerHTML = `
            <div class="header">
              <h1>Услуги</h1>
              
            </div>
            <div class="card">
                <div class="services-div">
                    <h3>Добавление услуги</h3>
                    <button>Добавить услугу</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Название услуги</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="service-td-title">
                                <textarea class="service-textarea" id="add-text-title" placeholder="Введите название"></textarea>
                            </td>
                            <td class="service-td-description">
                                <textarea class="service-textarea" id="add-text-description" placeholder="Введите описание"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card">
                <h3>Список услуг</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Название услуги</th>
                    <th>Описание</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody id="tbody-service">${dataServiceStrings}</tbody>
              </table>
            </div>
          `;
    } else if (page === 'works') {
        const responseWorks = await fetch(API_URL('admin/works'), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const dataWorks = await responseWorks.json();
        let stringsWorks = '';
        for (const key of dataWorks) {
            stringsWorks += `<tr>
            <td>${key.id}</td>
            <td>path: image/img/works-images/${key.image}</td>
            <td><button class="delete-btn delete-btn-works" data-id="${key.id}">Удалить</button></td></td>
            <tr>`;
        }
        mainContent.innerHTML = `
            <div class="header">
              <h1>Наши работы</h1>
            </div>
            <div class="card">
                <div class="works-div">
                    <h3>Добавление работы</h3>
                    <button>Добавить работу</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Путь к изображению</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="works-td-title">
                                <input id="add-text-title-works" placeholder="Например WorkImage.png">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card">
                <h3>Список услуг</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Изображение</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>${stringsWorks}</tbody>
              </table>
            </div>
            `;
    } else if (page === 'reviews') {
        const responseRev = await fetch(API_URL('admin/reviews'), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const dataRev = await responseRev.json();
        let stringsRev = '';
        for (const key of dataRev) {
            stringsRev += `<tr>
            <td>${key.id}</td>
            <td>${key.name}</td>
            <td>${key.email}</td>
            <td>${key.text}</td>
            <td><button class="delete-btn delete-btn-reviews" data-id="${key.id}">Удалить</button></td></td>
            <tr>`;
        }
        mainContent.innerHTML = `
            <div class="header">
              <h1>Отзывы</h1>
            </div>
            <div class="card">
                <h3>Список услуг</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Имя пользователя</th>
                    <th>Email</th>
                    <th>Отзыв</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>${stringsRev}</tbody>
              </table>
            </div>
            `;
    }


    document.querySelectorAll('.delete-btn-user').forEach(btn => {
        btn.addEventListener('click', (e) => deleteUser(e.target));
    });
    document.querySelectorAll('.delete-btn-order').forEach(btn => {
        btn.addEventListener('click', (e) => deleteOrder(e.target));
    });
    document.querySelectorAll('.delete-btn-service').forEach(btn => {
        btn.addEventListener('click', (e) => deleteServices(e.target));
    });
    document.querySelectorAll('.delete-btn-reviews').forEach(btn => {
        btn.addEventListener('click', (e) => deleteReviews(e.target));
    });
    document.querySelectorAll('.delete-btn-works').forEach(btn => {
        btn.addEventListener('click', (e) => deleteWorks(e.target));
    });
    document.querySelectorAll('.services-div button').forEach(btn => {
        btn.addEventListener('click', () => addServices());
    });
    document.querySelectorAll('.works-div button').forEach(btn => {
        btn.addEventListener('click', () => addWorks());
    });
}

async function deleteUser(button) {
    const userId = button.dataset.id;
    const row = button.closest('tr');

    if (!confirm("Вы действительно хотите удалить этого пользователя?")) return;

    try {
        const response = await fetch(API_URL('user/delete'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ id: userId })
        });

        if (!response.ok) throw new Error('Ошибка при удалении');

        row.remove();
        alert('Пользователь успешно удален.');
    } catch (error) {
        alert('Не удалось удалить пользователя.');
        console.error(error);
    }
}

async function deleteReviews(button) {
    const revId = button.dataset.id;
    const row = button.closest('tr');

    if (!confirm("Вы действительно хотите удалить эту работу?")) return;

    try {
        const response = await fetch(API_URL('admin/reviews'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ id: revId })
        });

        if (!response.ok) throw new Error('Ошибка при удалении');

        row.remove();
        alert('Работа успешно удален.');
    } catch (error) {
        alert('Не удалось удалить работу.');
        console.error(error);
    }
}

async function deleteWorks(button) {
    const revId = button.dataset.id;
    const row = button.closest('tr');

    if (!confirm("Вы действительно хотите удалить этот отзыв?")) return;

    try {
        const response = await fetch(API_URL('admin/works'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ id: revId })
        });

        if (!response.ok) throw new Error('Ошибка при удалении');

        row.remove();
        alert('Отзыв успешно удален.');
    } catch (error) {
        alert('Не удалось удалить отзыв.');
        console.error(error);
    }
}

async function deleteOrder(button) {
    const orderId = button.dataset.id;
    const row = button.closest('tr');

    if (!confirm("Вы действительно хотите заявку?")) return;

    try {
        const response = await fetch(API_URL('user/deleteOrder'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ id: orderId })
        });

        if (!response.ok) throw new Error('Ошибка при удалении');

        row.remove();
        alert('Заявку успешно удалена.');
    } catch (error) {
        alert('Не удалось удалить заявку.');
        console.error(error);
    }
}

async function addServices() {
    const title = document.getElementById('add-text-title').value;
    const description = document.getElementById('add-text-description').value;

    if (title.length <= 0 || description <= 0) return alert("При добавление услуга не может быть пустой!")
    const payload = {
        title,
        description
    }

    const response = await fetch(API_URL('admin/services'), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success === true) {
        alert("Услуга успешно добавлена");
        return loadPage('services');
    }

    return alert("Ошибка при добавление услуги");

}

async function addWorks() {
    const image = document.getElementById('add-text-title-works').value;

    if (image.length <= 0) return alert("При добавление работы не может быть пустой!")
    const payload = {
        image,
    }

    const response = await fetch(API_URL('admin/works'), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success === true) {
        alert("Работа успешно добавлена");
        return loadPage('services');
    }

    return alert("Ошибка при добавление работа");

}

async function deleteServices(button) {
    const serviceId = button.dataset.id;
    const row = button.closest('tr');
    console.log(serviceId)

    if (!confirm("Вы действительно хотите услугу?")) return;

    try {
        const response = await fetch(API_URL('admin/services'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ id: serviceId })
        });

        if (!response.ok) throw new Error('Ошибка при удалении');

        row.remove();
        alert('Услуга успешно удалена.');
    } catch (error) {
        alert('Не удалось удалить услугу.');
        console.error(error);
    }
}