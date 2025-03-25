// Configuração inicial de perguntas
const questions = [
    {
        question: "Quem é o mestre de Obi-Wan Kenobi?",
        options: ["Anakin Skywalker", "Qui-Gon Jinn", "Yoda", "Mace Windu"],
        answer: 1
    },
    {
        question: "Qual é o nome do caçador de recompensas que captura Han Solo?",
        options: ["Boba Fett", "Darth Maul", "Jango Fett", "Greedo"],
        answer: 0
    },
    {
        question: "Qual planeta é o lar de Yoda?",
        options: ["Dagobah", "Tatooine", "Endor", "Naboo"],
        answer: 0
    }
];

// Função para atualizar a interface com a pontuação e as vidas
function updateScoreLives() {
    const score = localStorage.getItem("score") || 0;
    const lives = localStorage.getItem("lives") || 3;

    document.getElementById("score").textContent = `Pontuação: ${score}`;
    document.getElementById("lives").textContent = `Vidas: ${lives}`;
}

// Função para iniciar o quiz
function startQuiz() {
    document.getElementById("start-quiz").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    document.getElementById("restart-quiz").style.display = "none";

    // Inicializar pontuação e vidas se não existirem no LocalStorage
    if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", 0);
    }
    if (localStorage.getItem("lives") === null) {
        localStorage.setItem("lives", 3);
    }

    updateScoreLives();
    showQuestion();
}

// Função para exibir uma pergunta
function showQuestion() {
    // Sortear uma pergunta aleatória
    const questionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[questionIndex];

    document.getElementById("question").textContent = question.question;

    // Exibir as opções de resposta
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(index, question.answer));
        optionsContainer.appendChild(button);
    });
}

// Função para verificar a resposta do jogador
function checkAnswer(selectedIndex, correctIndex) {
    const lives = parseInt(localStorage.getItem("lives"));
    const score = parseInt(localStorage.getItem("score"));
    const feedback = document.getElementById("feedback");

    if (selectedIndex === correctIndex) {
        // Resposta correta
        localStorage.setItem("score", score + 1);
        feedback.textContent = "Você acertou!";
    } else {
        // Resposta errada
        localStorage.setItem("lives", lives - 1);
        feedback.textContent = "Você errou!";
    }

    updateScoreLives();

    // Verificar se o jogador perdeu todas as vidas
    if (lives <= 1) {
        endGame();
    } else {
        setTimeout(() => {
            feedback.textContent = "";
            showQuestion();
        }, 1500);
    }
}

// Função para encerrar o jogo
function endGame() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "Você perdeu todas as vidas!";

    document.getElementById("restart-quiz").style.display = "block";
    document.getElementById("restart-button").style.display = "block";

    // Limpar pontuação e vidas
    localStorage.removeItem("score");
    localStorage.removeItem("lives");
}

// Função para reiniciar o jogo
function restartQuiz() {
    localStorage.setItem("score", 0);
    localStorage.setItem("lives", 3);
    updateScoreLives();
    document.getElementById("feedback").textContent = "";
    document.getElementById("restart-quiz").style.display = "none";
    showQuestion();
}

// Inicializa o evento de clique do botão "Iniciar Quiz"
document.getElementById("start-quiz").addEventListener("click", startQuiz);

// Inicializa o evento de clique do botão "Recomeçar"
document.getElementById("restart-quiz").addEventListener("click", restartQuiz);
