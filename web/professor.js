const professor = JSON.parse(
    localStorage.getItem("professor")
);

if (!professor) {
    window.location.href = "login.html";
}

document.getElementById("nomeProfessor")
    .innerText = professor.nome;

async function carregarTurmas() {

    const resposta = await fetch(
        `http://localhost:3000/turmas/${professor.id}`
    );

    const turmas = await resposta.json();

    const tabela =
        document.getElementById("listaTurmas");

    tabela.innerHTML = "";

    turmas.forEach(turma => {

        tabela.innerHTML += `
            <tr>
                <td>${turma.id}</td>
                <td>${turma.nome}</td>
                <td>
                    <button onclick="excluirTurma(${turma.id})">
                        Excluir
                    </button>

                    <button onclick="visualizarTurma(${turma.id})">
                        Visualizar
                    </button>
                </td>
            </tr>
        `;

    });
}

async function cadastrarTurma() {

    const nome =
        prompt("Digite o nome da turma:");

    if (!nome) return;

    await fetch(
        "http://localhost:3000/turmas",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nome,
                professorId: professor.id
            })
        }
    );

    carregarTurmas();
}

async function excluirTurma(id) {

    const confirmar =
        confirm("Deseja excluir esta turma?");

    if (!confirmar) return;

    const resposta = await fetch(
        `http://localhost:3000/turmas/${id}`,
        {
            method:"DELETE"
        }
    );

    const dados =
        await resposta.json();

    if (dados.erro) {
        alert(dados.erro);
    }

    carregarTurmas();
}

function visualizarTurma(id) {

    localStorage.setItem(
        "turmaId",
        id
    );

    window.location.href =
        "atividades.html";
}

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";
}

carregarTurmas();