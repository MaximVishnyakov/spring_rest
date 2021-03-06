// DOM elements
let modal = document.getElementById('modalWindow');
let allUsersTable = document.getElementById('allUsersTable');
let saveNewUserForm = document.querySelector('.form');

let modalId = document.getElementById('modalId');
let modalName = document.getElementById('modalName');
let modalSurname = document.getElementById('modalSurname');
let modalUsername = document.getElementById('modalUsername');
let modalPassword = document.getElementById('modalPassword');
let modalRoles = document.getElementById('modalRoles');


// FETCH API методы
const fetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    getAllUsers: async () => await fetch('http://localhost:8080/api/users'),
    getUserById: async (id) => await fetch(`http://localhost:8080/api/users/${id}`),
    addNewUser: async (user) => await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: fetchService.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: fetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: fetchService.head
    }),

    getAllRoles: async () => await fetch('http://localhost:8080/api/roles'),

    getRoleById: async (id) => await fetch(`http://localhost:8080/api/roles/${id}`)

}

// App init
async function appInit() {
    await getTableWithAllUsers();
    await getRolesForForm('modalForm');
    await getRolesForForm('newUserForm');
}

appInit();


//загрузка таблицы с пользователями

async function getTableWithAllUsers() {

    await fetchService.getAllUsers()
        .then(res => res.json())
        .then(users => {
            document.getElementById('allUsersTableBody').innerHTML = '';

            users.forEach(user => {

                let roles = user.roles;
                let roleNames = '';
                roles.forEach(role => {
                    roleNames += role.name + ' ';
                })

                // Заполнение таблицы с юзерами
                let objectForRow = [user.id, user.name, user.surname, user.username, roleNames];

                let row = document.getElementById('allUsersTableBody').insertRow();

                for (let i = 0; i < 7; i++) {
                    let cell = document.createElement('td');
                    let cellData = '';
                    if (i === 5) {
                        cellData = document.createElement('btn');
                        cellData.setAttribute('data-bs-userid', user.id);
                        cellData.setAttribute('data-bs-action', 'edit');
                        cellData.setAttribute('class', 'btn btn-info');
                        cellData.setAttribute('data-bs-target', '#modalWindow');
                        cellData.setAttribute('id', 'modalButton');
                        cellData.setAttribute('data-bs-toggle', 'modal');
                        cellData.textContent = 'Edit';
                    } else if (i === 6) {
                        cellData = document.createElement('btn');
                        cellData.setAttribute('data-bs-userid', user.id);
                        cellData.setAttribute('data-bs-action', 'delete');
                        cellData.setAttribute('class', 'btn btn-danger');
                        cellData.setAttribute('data-bs-target', '#modalWindow');
                        cellData.setAttribute('id', 'modalButton');
                        cellData.setAttribute('data-bs-toggle', 'modal');
                        cellData.textContent = 'Delete';
                    } else {
                        cellData = document.createTextNode(objectForRow[i])
                    }

                    cell.appendChild(cellData);
                    row.appendChild(cell);
                }

            })


            let openModalButtons = allUsersTable.querySelectorAll('.btn');
            for (let button of openModalButtons) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    let targetButton = e.target;

                    let buttonUserAction = targetButton.getAttribute("data-bs-action");
                    let buttonUserId = targetButton.getAttribute("data-bs-userid");

                    modal.setAttribute('data-bs-userid', buttonUserId);
                    modal.setAttribute('data-bs-action', buttonUserAction);
                    modal.classList.add('show');

                    if (modal.classList.contains('show')) {
                        let userid = modal.getAttribute('data-bs-userid');
                        let action = modal.getAttribute('data-bs-action');

                        switch (action) {
                            case 'edit':
                                document.getElementById('modalLabel').textContent = 'Edit user';
                                editUser(modal, userid);
                                break;
                            case 'delete':
                                document.getElementById('modalLabel').textContent = 'Delete user';
                                deleteUser(modal, userid);
                                break;
                        }
                    }

                })

            }
        })
}

document.getElementById('modalCloseButton').addEventListener('click', async () => {
    let editButton =  document.getElementById('editButton');
    let deleteButton = document.getElementById('deleteButton');
    if (editButton != null) {
        editButton.remove();
    }
    if (deleteButton != null) {
        deleteButton.remove();
    }


})

document.getElementById('modalDismissButton').addEventListener('click', async () => {
    let editButton =  document.getElementById('editButton');
    let deleteButton = document.getElementById('deleteButton');
    if (editButton != null) {
        editButton.remove();
    }
    if (deleteButton != null) {
        deleteButton.remove();
    }
})

//Получение пустой формы для создания юзера (с ролями)
async function getRolesForForm(formType) {

    await fetchService.getAllRoles()
        .then(res => res.json())
        .then(roles => {
            let rolesData = ``;
            roles.forEach(role => {
                rolesData += `<option value="${role.id}" id="modalRolesInput">${role.name}</option>`
            })
            switch (formType) {
                case 'modalForm':
                    document.getElementById('modalRoles').innerHTML = rolesData;
                    break;
                case 'newUserForm':
                    document.getElementById('newUserRoles').innerHTML = rolesData;
                    break;
            }

        })
}

//Заполнение модального окна данными пользователя
async function fillModalForm(user, action) {
    switch (action) {
        case ('delete'):
            modalName.disabled = true;
            modalSurname.disabled = true;
            modalUsername.disabled = true;
            modalPassword.disabled = true;
            modalRoles.disabled = true;
            let deleteButton = document.createElement('btn');
            deleteButton.setAttribute('class', 'btn btn-danger');
            deleteButton.setAttribute('id', 'deleteButton');
            deleteButton.setAttribute('data-bs-dismiss', 'modal');
            deleteButton.textContent = 'Delete';
            document.getElementById('modalFooter')
                .insertBefore(deleteButton, document.getElementById('modalCloseButton'));
            break;
        case ('edit'):
            modalName.disabled = false;
            modalSurname.disabled = false;
            modalUsername.disabled = false;
            modalPassword.disabled = false;
            modalRoles.disabled = false;
            let editButton = document.createElement('btn');
            editButton.setAttribute('class', 'btn btn-success');
            editButton.setAttribute('id', 'editButton');
            editButton.setAttribute('data-bs-dismiss', 'modal');
            editButton.textContent = 'Edit';
            document.getElementById('modalFooter')
                .insertBefore(editButton, document.getElementById('modalCloseButton'));
            break;
    }

    modalId.setAttribute('value', user.id);
    modalName.setAttribute('value', user.name);
    modalSurname.setAttribute('value', user.surname);
    modalUsername.setAttribute('value', user.username);
    modalPassword.setAttribute('value', user.password);

}

//Сохранение ролей из select формы в массив
async function parsedRolesFromInput(rolesInputName) {
    let roles = [];
    let rolesSelected = document.getElementById(rolesInputName).selectedOptions;

    for (let i = 0; i < rolesSelected.length; i++) {
        let role = {
            id: document.getElementById(rolesInputName).selectedOptions[i].value,
            name: document.getElementById(rolesInputName).selectedOptions[i].text
        }
        roles.push(role)

    }
    return roles;
}

//Добавление нового юзера
async function addNewUserFormHandler() {

    let roles = await parsedRolesFromInput('newUserRoles');

    if (roles.length === 0) {
        let userRole = await fetchService.getRoleById(2)
            .then(res => res.json());
        roles.push(userRole);
    }

    let user = {
        name: document.getElementById('newUserInputName').value,
        surname: document.getElementById('newUserInputSurname').value,
        username: document.getElementById('newUserInputUsername').value,
        password: document.getElementById('newUserInputPassword').value,
        roles: roles
    };

    let response = await fetchService.addNewUser(user);

    if (response.ok) {
        await getTableWithAllUsers();
        document.getElementById('UsersTable').setAttribute("class", "tab-pane fade show active");
        document.getElementById('NewUser').setAttribute("class", "tab-pane fade");
        document.getElementById('UsersTableTab').setAttribute("class", "nav-link active");
        document.getElementById('NewUserTab').setAttribute("class", "nav-link");
        document.getElementById('newUserForm').reset();
    } else {
        console.log(response)
    }
}

//Обработка нажатия на кнопку сохранения юзера
saveNewUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    await addNewUserFormHandler();
});

//Изменение юзера
async function editUser(modal, id) {

    let currentUserRoles = '';
    await fetchService.getUserById(id)
        .then(res => res.json())
        .then(user => {
            fillModalForm(user, 'edit');
            currentUserRoles = user.roles;
        })

    document.getElementById('editButton').addEventListener('click', async (e) => {
        e.preventDefault();

        let roles = await parsedRolesFromInput('modalRoles');
        if(roles.length === 0) {
            roles = currentUserRoles;
        }

        let userUpdated = {
            id: modalId.value.trim(),
            name: modalName.value.trim(),
            surname: modalSurname.value.trim(),
            username: modalUsername.value.trim(),
            password: modalPassword.value.trim(),
            roles: roles
        }

        const response = await fetchService.updateUser(userUpdated, id);

        if (response.ok) {
            await getTableWithAllUsers();
            modal.classList.remove('show');
            document.getElementById('editButton').remove();

        } else {
            console.log('error in edit method');
            modal.classList.remove('show');
            document.getElementById('editButton').remove();
            alert('something went wrong');

        }
    })


}

//Удаление юзера
async function deleteUser(modal, id) {

    await fetchService.getUserById(id)
        .then(res => res.json())
        .then(user => {
            fillModalForm(user, 'delete');
        })


    document.getElementById('deleteButton').addEventListener('click', async (e) => {
        e.preventDefault();

        const response = await fetchService.deleteUser(id);
        if (response.ok) {
            await getTableWithAllUsers();
            modal.classList.remove('show');
            document.getElementById('deleteButton').remove();

        } else {
            console.log(response);
        }
    })


}










