// URL base do backend
const backendUrl = 'http://localhost:8080';

// Seleciona o formulário de adicionar usuário
const addUserForm = document.getElementById('addUserForm');
// Seleciona o botão de obter todos os usuários
const getAllUsersBtn = document.getElementById('getAllUsersBtn');
// Seleciona o corpo da tabela onde os usuários serão inseridos
const usersTableBody = document.querySelector('#usersTable tbody');

// Adiciona um listener para o evento de envio do formulário
addUserForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Envia uma requisição POST para adicionar um novo usuário
    fetch(`${backendUrl}/demo/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Exibe uma mensagem de sucesso
        addUserForm.reset(); // Limpa o formulário
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Adiciona um listener para o botão de obter todos os usuários
getAllUsersBtn.addEventListener('click', function() {
    // Envia uma requisição GET para obter todos os usuários
    fetch(`${backendUrl}/demo/all`)
    .then(response => response.json())
    .then(users => {
        // Limpa o conteúdo atual da tabela
        usersTableBody.innerHTML = '';

        // Itera sobre cada usuário e cria uma nova linha na tabela
        users.forEach(user => {
            const row = document.createElement('tr');

            // Cria as células para ID, nome e e-mail
            const idCell = document.createElement('td');
            idCell.textContent = user.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;

            // Adiciona as células à linha
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);

            // Adiciona a linha ao corpo da tabela
            usersTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
