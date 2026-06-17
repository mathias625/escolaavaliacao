async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        if (!resposta.ok) {
            alert("Email ou senha inválidos");
            return;
        }

        const professor = await resposta.json();

        localStorage.setItem(
            "professor",
            JSON.stringify(professor)
        );

        alert("Login realizado com sucesso!");

        window.location.href = "professor.html";

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível conectar ao servidor.\nVerifique se o server.js está rodando."
        );

    }
}