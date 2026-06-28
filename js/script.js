const btnJogar = document.getElementById("btnJogar");
const areaJogo = document.getElementById("jogo");
const pontos = document.getElementById("pontos");
const tempo = document.getElementById("tempo");
const mensagemFinal = document.getElementById("mensagemFinal");

let pontuacao = 0;
let tempoRestante = 30;
let cronometro;

btnJogar.addEventListener("click", iniciarJogo);

function iniciarJogo() {

    pontuacao = 0;
    tempoRestante = 30;

    pontos.textContent = pontuacao;
    tempo.textContent = tempoRestante;

    mensagemFinal.innerHTML = "";

    areaJogo.innerHTML = "";
    areaJogo.style.pointerEvents = "auto";

    clearInterval(cronometro);
    cronometro = setInterval(contarTempo, 1000);

    gerarGrid();
}

function gerarGrid() {

    const diferente = Math.floor(Math.random() * 16);

    for (let i = 0; i < 16; i++) {

        const quadrado = document.createElement("div");
        quadrado.classList.add("quadrado");

        quadrado.textContent = (i === diferente) ? "😎" : "😀";

        quadrado.addEventListener("click", function () {

            if (tempoRestante <= 0) return;

            if (i === diferente) {
                pontuacao += 10;
            } else {
                pontuacao -= 3;
            }

            pontos.textContent = pontuacao;

            areaJogo.innerHTML = "";
            gerarGrid();

        });

        areaJogo.appendChild(quadrado);
    }
}

function contarTempo() {

    tempoRestante--;

    tempo.textContent = tempoRestante;

    if (tempoRestante <= 0) {

        clearInterval(cronometro);

        areaJogo.innerHTML = "";
        areaJogo.style.pointerEvents = "none";

        const nome = document.getElementById("nomeJogador").value;

        mensagemFinal.innerHTML = `
            <h2>Fim de jogo!</h2>
            <p>Jogador: ${nome}</p>
            <p>Pontuação: ${pontuacao}</p>
            <button id="reiniciar">Jogar novamente</button>
        `;

        document.getElementById("reiniciar").onclick = iniciarJogo;
    }
}