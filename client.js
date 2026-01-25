const URL = "https://crudcrud.com/api/db2670b7ca214364bacb2ecb62f5af3d/usuarios";


document.getElementById("btn").addEventListener("click", function() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // validação simples do email
    if (!(email.includes("@") && email.includes("."))) {
        return alert("Email inválido");
    }

    // pega todos os usuários
    fetch(URL)
        .then(res => res.json())
        .then(usuarios => {
            // procura se o email já existe
            const existe = usuarios.find(u => u.email === email);

            if (existe) {
                sessionStorage.setItem("userId",existe._id);
            } else {
                // cadastra só se não existir
                fetch(URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email })

                })
                .then(() => alert("Usuário cadastrado com sucesso! Tente fazer login."))
                .catch(err => console.error("Erro ao cadastrar:", err));
            }
        })
        .catch(err => console.error("Erro ao acessar CrudCrud:", err));
});
