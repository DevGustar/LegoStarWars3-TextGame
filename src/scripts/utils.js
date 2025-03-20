function startMusic(idMusic, volume = 0.3) {
    let music = document.getElementById(idMusic); // Pega o elemento pelo id
    music.volume = volume; // Volume da música
    music.play(); // Inicia a música
}


// Função para pausar a música
function pauseMusic(idMusic) {
    let music = document.getElementById(idMusic); // Pega o elemento pelo id
    music.pause(); // Pausa a música
}


// Função para alterar o estilo de exibição de um elemento após um tempo
function display(idElement, display, ms = 0) {
    setTimeout(() => {
        document.getElementById(idElement).style.display = display; // Muda o estilo display do elemento
    }, ms); // Espera o tempo definido (ms) antes de aplicar
}


// Função para iniciar a introdução
function startIntro(displayDown, history = 'none') {
    if (history == 'Arena Geonosiana') {
        display(displayDown, 'none'); // Esconde a tela inicial
        startMusic('MainTitle', 1); // Inicia a música com volume máximo
        display('intro', 'flex'); // Exibe a tela de introdução
        display('skip-button', 'flex', 14000); // Exibe o botão de pular após 14 segundos
    }
    else if (history == '1') {
        display(displayDown, 'none'); // Esconde a tela inicial
        startMusic('MainTitle', 1); // Inicia a música com volume máximo
        display('intro', 'flex'); // Exibe a tela de introdução
        display('skip-button', 'flex', 15000); // Exibe o botão de pular após 15 segundos
    }
    else if (history == '2') {
        display(displayDown, 'none'); // Esconde a tela inicial
        startMusic('MainTitle', 1); // Inicia a música com volume máximo
        display('intro', 'flex'); // Exibe a tela de introdução
        display('skip-button', 'flex', 15000); // Exibe o botão de pular após 15 segundos
    }
    if (history != 'none') {
        setTimeout(() => {
            skipIntro(); // Chama a função para pular a introdução
        }, 35000); // Espera o tempo definido (ms) antes de aplicar
    };
}


// Função para pular a introdução
function skipIntro() {
    document.querySelector(".intro").style.display = 'none'; // Esconde a tela de introdução
    display('skip-button', 'none'); // Esconde o botão de pular
    pauseMusic('MainTitle'); // Pausa a música de introdução
    arenaGeonosiana(); // Começa o capítulo da Arena Geonosiana
}


function arenaGeonosiana() {
    fadeTransition(() => {
        display('intro', 'none'); // Esconde a introdução
        display('tela-ArenaGeonosiana', 'block'); // Exibe a arena
        document.getElementById('tela-ArenaGeonosiana').innerHTML = `
            <div class="cenario">
                <p>Obi-Wan, Anakin e Padmé estão acorrentados na Arena Geonosiana. Criaturas ferozes se aproximam. O que fazer?</p>
                <button onclick="escolhaArena(1)">Tentar escapar</button>
                <button onclick="escolhaArena(2)">Aguardar ajuda Jedi</button>
            </div>
        `;
    });
}

function escolhaArena(opcao) {
    let texto = "";
    let botoes = "";

    if (opcao === 1) {
        texto = "Os heróis tentam se soltar das correntes, mas os guardas geonosianos percebem. Como agir?";
        botoes = `
            <button onclick="escolhaArena(3)">Lutar contra os guardas</button>
            <button onclick="escolhaArena(4)">Roubar uma lança e se defender</button>
        `;
    } else if (opcao === 2) {
        texto = "Os Jedi chegam para ajudar! Mace Windu lidera um ataque surpresa. O que fazer?";
        botoes = `
            <button onclick="escolhaArena(5)">Pegar um sabre de luz e lutar</button>
            <button onclick="escolhaArena(6)">Ajudar a libertar outros prisioneiros</button>
        `;
    } else if (opcao === 3 || opcao === 5) {
        texto = "A batalha se intensifica, mas os droids estão chegando! Como escapar?";
        botoes = `
            <button onclick="escolhaArena(7)">Roubar uma speeder bike</button>
            <button onclick="escolhaArena(8)">Correr em direção às naves Jedi</button>
        `;
    } else if (opcao === 4 || opcao === 6) {
        texto = "Mais aliados foram libertados, mas os Separatistas chamaram reforços! Precisamos sair daqui.";
        botoes = `
            <button onclick="escolhaArena(7)">Roubar uma speeder bike</button>
            <button onclick="escolhaArena(8)">Correr em direção às naves Jedi</button>
        `;
    } else if (opcao === 7 || opcao === 8) {
        texto = "Os heróis conseguem escapar da arena e entram em uma nave. Agora a batalha continua nos céus!";
        botoes = `<button onclick="fimArena()">Fugir de Geonosis</button>`;
    }

    document.getElementById('tela-ArenaGeonosiana').innerHTML = `
        <div class="cenario">
            <p>${texto}</p>
            ${botoes}
        </div>
    `;
}

function fimArena() {
    fadeTransition(() => {
        document.getElementById('tela-ArenaGeonosiana').innerHTML = `
            <div class="cenario">
                <p>Obi-Wan, Anakin e Padmé escapam de Geonosis em uma nave Jedi! A guerra está só começando...</p>
            </div>
        `;
    });
}

function fadeTransition(callback) {
    let fade = document.getElementById('fade');
    fade.style.opacity = 1;
    setTimeout(() => {
        callback();
        fade.style.opacity = 0;
    }, 1000);
}
