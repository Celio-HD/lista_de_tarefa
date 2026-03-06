export function criarItemLista(tarefa, removerFunc) {

    const item = document.createElement("li");

    item.innerHTML = `
        ${tarefa.descricao}
        <button class="delete">x</button>
        `;

    item.querySelector("button").addEventListener("click", () => {
        removerFunc(tarefa._id);
    });

    return item;
}

