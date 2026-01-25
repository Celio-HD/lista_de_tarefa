// 🔹 pega o ID salvo no sessionStorage
const userId = sessionStorage.getItem("userId");

if (!userId) {
    alert("Usuário não logado");
    window.location.href = "login.html";
}

//  URLs
const URL_USUARIO = `https://crudcrud.com/api/db2670b7ca214364bacb2ecb62f5af3d/usuarios/${userId}`;
const URL_TAREFAS = `https://crudcrud.com/api/db2670b7ca214364bacb2ecb62f5af3d/tarefas`;

// busca dados do usuário
fetch(URL_USUARIO)
    .then(res => res.json())
    .then(usuario => {
        console.log(usuario.nome, usuario.email);
    })
    .catch(err => console.error("Erro ao acessar usuário:", err));

//  lista tarefas
const lista = document.getElementById("listaTarefas");

fetch(URL_TAREFAS)
    .then(res => res.json())
    .then(tarefas => {
        tarefas.forEach(tarefa => {
            const item = document.createElement("li");
            item.innerHTML = `
                ${tarefa.descricao}
                <button class="delete" onclick="remove('${tarefa._id}')">x</button>
            `;
            lista.appendChild(item);
        });
    });

//  cria tarefa
document.getElementById("btn").addEventListener("click", () => {
    const descricao = document.getElementById("inputTarefa").value;

    fetch(URL_TAREFAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: descricao,
            userId: userId
        })
    })
    .then(res => res.json())
    .then(tarefa => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${tarefa.descricao}
            <button class="delete" onclick="remove('${tarefa._id}')">x</button>
        `;
        lista.appendChild(item);
    });
});

//  remove tarefa
function remove(id) {
    fetch(`${URL_TAREFAS}/${id}`, {
        method: "DELETE"
    }).then(() => {
        location.reload();
    });
}

