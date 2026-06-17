const professor = JSON.parse(
    localStorage.getItem("professor")
);

const turmaId = Number(
    localStorage.getItem("turmaId")
);

if (!professor) {
    window.location.href = "login.html";
}

document.getElementById("nomeProfessor")
    .innerText = professor.nome;

async function carregarTurma() {

    const resposta = await fetch(
        `http://localhost:3000/turmas/${professor.id}`
    );

    const turmas = await resposta.json();

    const turma = turmas.find(
        t => t.id === turmaId
    );

    if(turma){
        document.getElementById("nomeTurma")
            .innerText = turma.nome;
    }
}

async function carregarAtividades() {

    const resposta = await fetch(
        `http://localhost:3000/atividades/${turmaId}`
    );

    const atividades = await resposta.json();

    const tabela =
        document.getElementById("listaAtividades");

    tabela.innerHTML = "";

    atividades.forEach(atividade => {

        tabela.innerHTML += `
            <tr>
                <td>${atividade.id}</td>
                <td>${atividade.descricao}</td>
            </tr>
        `;

    });

}

async function cadastrarAtividade() {

    const descricao =
        prompt("Descrição da atividade:");

    if (!descricao) return;

    await fetch(
        "http://localhost:3000/atividades",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                descricao,
                turmaId
            })
        }
    );

    carregarAtividades();
}

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";
}

carregarTurma();
carregarAtividades();