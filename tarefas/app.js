// 🔹 pega o ID salvo no sessionStorage
const userId = sessionStorage.getItem("userId");

//verificacao de login
if (!userId) {
    alert("Usuário não logado");
    window.location.href = "login.html";
}

//URL
const URL_TAREFAS = `https://crudcrud.com/api/db2670b7ca214364bacb2ecb62f5af3d/usuarios/${userId}/tarefas`;

//importacao
import { Tarefa } from "./classes.js";
import { criarItemLista } from "./utils.js"



const lista = document.getElementById("listaTarefas");
const btn = document.getElementById("btn");

function carregarTarefas() {

    fetch(URL_TAREFAS)
        .then(res => res.json())
        .then(tarefas => {

        lista.innerHTML = "";

        tarefas.forEach(tarefa => {

            const item = criarItemLista(tarefa, removerTarefa);

            lista.appendChild(item);

        });

    });

}

function adicionarTarefa() {

    const descricao = document.getElementById("inputTarefa").value;

    const novaTarefa = new Tarefa(descricao, userId);

    fetch(URL_TAREFAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTarefa)
    })
    .then(() => carregarTarefas());

}

function removerTarefa(id) {

    fetch(`${URL_TAREFAS}/${id}`, {
        method: "DELETE"
    })
    .then(() => carregarTarefas());

}

btn.addEventListener("click", adicionarTarefa);

carregarTarefas();
