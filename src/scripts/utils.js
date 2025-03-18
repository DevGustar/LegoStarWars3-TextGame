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
        display('skip-button', 'flex', 14000); // Exibe o botão de pular após 15 segundos
    }
    if (history == '1') {
        display(displayDown, 'none'); // Esconde a tela inicial
        startMusic('MainTitle', 1); // Inicia a música com volume máximo
        display('intro', 'flex'); // Exibe a tela de introdução
        display('skip-button', 'flex', 15000); // Exibe o botão de pular após 15 segundos
    }
    if (history == '2') {
        display(displayDown, 'none'); // Esconde a tela inicial
        startMusic('MainTitle', 1); // Inicia a música com volume máximo
        display('intro', 'flex'); // Exibe a tela de introdução
        display('skip-button', 'flex', 15000); // Exibe o botão de pular após 15 segundos
    }
    if (history != 'none') {
        document.querySelector('.crawl').addEventListener('animationend', () => { // Quando a animação terminar
            skipIntro(); // Chama a função para pular a introdução
        });
    }
}


// Função para pular a introdução
function skipIntro() {
    document.querySelector(".intro").style.display = 'none'; // Esconde a tela de introdução
    display('skip-button', 'none'); // Esconde o botão de pular
    pauseMusic('MainTitle'); // Pausa a música de introdução
}
