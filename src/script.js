// Cancela qualquer fala previamente programada
speechSynthesis.cancel();

// Função para iniciar a música com base no ID do elemento de áudio e o volume desejado
function startMusic(idMusic, volume = 0.3) {
    const music = document.getElementById(idMusic); // Obtém o elemento de áudio pelo ID
    if (music) { // Se o elemento de áudio existir
        music.volume = volume; // Ajusta o volume da música
        music.play(); // Inicia a reprodução da música
    }
}

// Função para pausar a música com base no ID do elemento de áudio
function pauseMusic(idMusic) {
    const music = document.getElementById(idMusic); // Obtém o elemento de áudio pelo ID
    if (music) { // Se o elemento de áudio existir
        music.pause(); // Pausa a música
    }
}

// Função para exibir ou esconder elementos na tela com base no tempo de atraso
function display(idElement, display, ms = 0) {
    setTimeout(() => { // Aguarda o tempo em milissegundos antes de executar
        const element = document.getElementById(idElement); // Obtém o elemento pelo ID
        if (element) { // Se o elemento existir
            element.style.display = display; // Altera a propriedade display do elemento
        }
    }, ms);
}

// Função para iniciar a introdução do jogo
function startIntro() {
    display('tela-inicial', 'none'); // Esconde a tela inicial
    startMusic('MainTitle', 1); // Inicia a música "MainTitle" com volume máximo
    display('intro', 'flex'); // Exibe a tela de introdução
    display('skip-button', 'flex', 10000); // Exibe o botão de "skip" após 10 segundos
    setTimeout(() => {
        skipIntro(); // Após 35 segundos, pula a introdução automaticamente
    }, 35000);
}

// Função para pular a introdução
function skipIntro() {
    display('intro', 'none'); // Esconde a tela de introdução
    display('skip-button', 'none'); // Esconde o botão de "skip"
    pauseMusic('MainTitle'); // Pausa a música "MainTitle"
    startMusic('CantinaBand'); // Inicia a música "CantinaBand" com volume máximo
    arenaGeonosiana(); // Chama a função para exibir a arena Geonosiana
}

// Função para exibir a tela da arena Geonosiana
function arenaGeonosiana() {
    const finalScreen = document.getElementById('final-screen'); // Obtém a tela final

    // Se a tela final já estiver visível, retorna sem fazer nada
    if (finalScreen && finalScreen.style.display === 'flex') {
        return;
    }

    display('intro', 'none'); // Esconde a tela de introdução
    display('tela-ArenaGeonosiana', 'flex'); // Exibe a tela da arena Geonosiana
    updateScenario( // Atualiza o cenário com a primeira escolha
        "Obi-Wan, Anakin e Padmé estão acorrentados na Arena Geonosiana. Três criaturas ferozes se aproximam: um Reek, um Nexu e um Acklay. O que fazer?",
        [
            { text: "Tentar se soltar das correntes", action: () => chooseArena(1) },
            { text: "Esperar por uma oportunidade", action: () => chooseArena(2) },
        ]
    );
    // Cancela qualquer fala
    speechSynthesis.cancel();
}

// Função para lidar com as escolhas feitas pelo jogador na arena
function chooseArena(option) {
    let text = "";
    let buttons = [];
    let character = null;
    let character2 = null;

    // Dependendo da opção escolhida, a história muda e novas opções aparecem
    switch (option) {
        case 1:
            text = "Você consegue se soltar das correntes! O Nexu avança em direção a Padmé. O que fazer?";
            buttons = [
                { text: "Atacar o Nexu com a corrente", action: () => chooseArena(3) },
                { text: "Tentar distrair o Nexu", action: () => chooseArena(4) },
            ];
            character = "Nexu";
            character2 = "Padme";
            break;
        case 2:
            text = "Os Jedi chegam para ajudar! Mace Windu lidera um ataque surpresa contra os Separatistas. O que fazer?";
            buttons = [
                { text: "Pegar uma lança e lutar contra o Acklay", action: () => chooseArena(5) },
                { text: "Ajudar a libertar Obi-Wan e Anakin", action: () => chooseArena(6) },
            ];
            character = "MaceWindu";
            break;
        case 3:
            text = "Você derrota o Nexu, mas o Reek está descontrolado e avança em sua direção. O que fazer?";
            buttons = [
                { text: "Tentar domar o Reek", action: () => chooseArena(7) },
                { text: "Desviar e procurar uma arma", action: () => chooseArena(8) },
            ];
            character = "Reek";
            break;
        case 4:
            text = "O Nexu se distrai, mas o Acklay agora está atacando Obi-Wan. O que fazer?";
            buttons = [
                { text: "Atacar o Acklay com uma lança", action: () => chooseArena(9) },
                { text: "Chamar Anakin para ajudar", action: () => chooseArena(10) },
            ];
            character = "Acklay";
            character2 = "ObiWan";
            break;
        case 5:
            text = "Você enfrenta o Acklay e o derrota, mas os droids estão cercando a arena. O que fazer?";
            buttons = [
                { text: "Roubar uma speeder bike", action: () => chooseArena(11) },
                { text: "Correr em direção às naves Jedi", action: () => chooseArena(12) },
            ];
            character = "Acklay";
            break;
        case 6:
            text = "Você liberta Obi-Wan e Anakin! Juntos, vocês enfrentam os droids. O que fazer?";
            buttons = [
                { text: "Lutar até a chegada dos clones", action: () => chooseArena(13) },
                { text: "Procurar uma saída da arena", action: () => chooseArena(14) },
            ];
            character = "ObiWan";
            character2 = "Anakin";
            break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
            text = "Os clones chegam liderados por Yoda, e a batalha se intensifica. Vocês conseguem escapar da arena e entram em uma nave Jedi. A guerra começou!";
            buttons = [{ text: "Fugir de Geonosis", action: endArena }];
            character = "Yoda";
            break;
    }

    updateScenario(text, buttons, character, character2); // Atualiza o cenário com o novo texto e opções
}

// Função para encerrar a arena e exibir o final
function endArena() {
    updateScenario(
        "Obi-Wan, Anakin e Padmé escapam de Geonosis em uma nave Jedi! A guerra está só começando...",
        []
    );
    display('tela-ArenaGeonosiana', 'none', 8500); // Esconde a tela da arena após 8,5 segundos
    display('cenario', 'none', 8500); // Esconde o cenário após 8,5 segundos
    setTimeout(() => {
        const cenario = document.getElementById('cenario');
        if (cenario) {
            cenario.innerHTML = ''; // Limpa o conteúdo do cenário
        }
        showFinalScreen(); // Exibe a tela final
    }, 8500);
}

// Função para atualizar o cenário com texto, botões e imagens dos personagens
function updateScenario(text, buttons, character = null, character2 = null) {
    const screen = document.getElementById('tela-ArenaGeonosiana'); // Obtém a tela da arena
    if (screen) {
        screen.innerHTML = `
            <div class="cenario" id="cenario">
                <p>${text}</p>
                <div class="botoes"></div>
                <div class="character-container"></div> <!-- Contêiner para as imagens -->
            </div>
        `;

        narrateText(text); // Narra o texto

        const buttonsContainer = screen.querySelector('.botoes'); // Obtém o contêiner dos botões

        buttons.forEach((button, index) => { // Cria os botões baseados nas escolhas
            const buttonElement = document.createElement('button');
            buttonElement.className = 'btn-escolha';
            buttonElement.id = `btn-${index}`;
            buttonElement.textContent = button.text;

            buttonElement.addEventListener('click', button.action); // Adiciona o evento de clique para cada botão

            buttonsContainer.appendChild(buttonElement); // Adiciona o botão à tela
        });

        const characterContainer = screen.querySelector('.character-container'); // Obtém o contêiner de personagens

        if (character) {
            const characterImage = document.createElement('img');
            characterImage.src = `../imagens/personagens/png/${character}.png`; // Define a imagem do personagem
            characterImage.alt = character; // Define o texto alternativo da imagem
            characterImage.className = 'character-image';
            characterContainer.appendChild(characterImage); // Adiciona a imagem à tela
        }

        if (character2) { // Se houver outro personagem
            const character2Image = document.createElement('img');
            character2Image.src = `../imagens/personagens/png/${character2}.png`; // Define a imagem do segundo personagem
            character2Image.alt = character2;
            character2Image.className = 'character-image';
            characterContainer.appendChild(character2Image);
        }
    }
}

// Evento que escuta quando o documento é carregado e configura os eventos dos botões
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-button").addEventListener("click", startIntro); // Inicia a introdução ao clicar no botão
    document.getElementById("skip-button").addEventListener("click", skipIntro); // Pula a introdução ao clicar no botão
});

// Função para exibir a tela final com informações do personagem
function showFinalScreen() {
    const finalScreen = document.getElementById('final-screen');
    finalScreen.style.display = 'flex'; // Exibe a tela final

    document.getElementById('search-character').addEventListener('click', () => {
        const characterName = document.getElementById('character-input').value; // Obtém o nome do personagem
        if (characterName) {
            fetchCharacterInfo(characterName); // Busca informações do personagem
        }
    });
}

// Evento que reinicia o jogo ao clicar no botão de reinício
document.getElementById('restart-button').addEventListener('click', () => {
    window.location.reload(); // Recarrega a página para reiniciar o jogo
});

// Função para narrar o texto usando a síntese de fala do navegador
function narrateText(text) {
    speechSynthesis.cancel(); // Cancela qualquer fala anterior

    const utterance = new SpeechSynthesisUtterance(text); // Cria a fala com o texto passado
    utterance.lang = 'pt-BR'; // Define o idioma para português
    speechSynthesis.speak(utterance); // Reproduz a fala
}

// Função assíncrona para buscar informações de um personagem usando a API
async function fetchCharacterInfo(characterName) {
    const characterInfo = document.getElementById('character-info');
    characterInfo.innerHTML = 'Buscando informações...'; // Exibe mensagem de carregando

    try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${characterName}`); // Faz a requisição para buscar o personagem
        const data = await response.json(); // Converte a resposta para JSON

        if (data.results.length > 0) { // Se o personagem for encontrado
            const character = data.results[0];

            const genderTranslation = { // Traduz os valores de gênero
                male: 'Masculino',
                female: 'Feminino',
                'n/a': 'Não aplicável',
                none: 'Nenhum'
            };

            const gender = genderTranslation[character.gender] || character.gender; // Traduz o gênero ou usa o valor original

            // Exibe as informações do personagem
            characterInfo.innerHTML = `
                <p><strong>Nome:</strong> ${character.name}</p>
                <p><strong>Altura:</strong> ${character.height} cm</p>
                <p><strong>Peso:</strong> ${character.mass} kg</p>
                <p><strong>Ano de nascimento:</strong> ${character.birth_year}</p>
                <p><strong>Gênero:</strong> ${gender}</p>
            `;
        } else {
            characterInfo.innerHTML = 'Personagem não encontrado.'; // Se não encontrar o personagem
        }
    } catch (error) {
        characterInfo.innerHTML = 'Erro ao buscar informações. Tente novamente.'; // Se ocorrer um erro
    }
}

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 1 + 0.2,
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
animateStars();
