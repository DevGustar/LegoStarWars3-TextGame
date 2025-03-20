function startMusic(idMusic, volume = 0.3) {
    let music = document.getElementById(idMusic);
    music.volume = volume;
    music.play();
}

function pauseMusic(idMusic) {
    let music = document.getElementById(idMusic);
    music.pause();
}

function display(idElement, display, ms = 0) {
    setTimeout(() => {
        document.getElementById(idElement).style.display = display;
    }, ms);
}

function startIntro() {
    display('tela-inicial', 'none');
    startMusic('MainTitle', 1);
    display('intro', 'flex');
    display('skip-button', 'flex', 14000);
    setTimeout(() => {
        skipIntro();
    }, 35000);
}

function skipIntro() {
    document.querySelector(".intro").style.display = 'none';
    display('skip-button', 'none');
    pauseMusic('MainTitle');
    arenaGeonosiana();
}

function arenaGeonosiana() {
    display('intro', 'none');
    display('tela-ArenaGeonosiana', 'block');
    document.getElementById('tela-ArenaGeonosiana').innerHTML = `
        <div class="cenario">
            <p>Obi-Wan, Anakin e Padmé estão acorrentados na Arena Geonosiana. Criaturas ferozes se aproximam. O que fazer?</p>
            <button class="btn-escolha" onclick="escolhaArena(1)">Tentar escapar</button>
            <button class="btn-escolha" onclick="escolhaArena(2)">Aguardar ajuda Jedi</button>
        </div>
    `;
}

function escolhaArena(opcao) {
    let texto = "";
    let botoes = "";

    if (opcao === 1) {
        texto = "Os heróis tentam se soltar das correntes, mas os guardas geonosianos percebem. Como agir?";
        botoes = `
            <button class="btn-escolha" onclick="escolhaArena(3)">Lutar contra os guardas</button>
            <button class="btn-escolha" onclick="escolhaArena(4)">Roubar uma lança e se defender</button>
        `;
    } else if (opcao === 2) {
        texto = "Os Jedi chegam para ajudar! Mace Windu lidera um ataque surpresa. O que fazer?";
        botoes = `
            <button class="btn-escolha" onclick="escolhaArena(5)">Pegar um sabre de luz e lutar</button>
            <button class="btn-escolha" onclick="escolhaArena(6)">Ajudar a libertar outros prisioneiros</button>
        `;
    } else if (opcao === 3 || opcao === 5) {
        texto = "A batalha se intensifica, mas os droids estão chegando! Como escapar?";
        botoes = `
            <button class="btn-escolha" onclick="escolhaArena(7)">Roubar uma speeder bike</button>
            <button class="btn-escolha" onclick="escolhaArena(8)">Correr em direção às naves Jedi</button>
        `;
    } else if (opcao === 4 || opcao === 6) {
        texto = "Mais aliados foram libertados, mas os Separatistas chamaram reforços! Precisamos sair daqui.";
        botoes = `
            <button class="btn-escolha" onclick="escolhaArena(7)">Roubar uma speeder bike</button>
            <button class="btn-escolha" onclick="escolhaArena(8)">Correr em direção às naves Jedi</button>
        `;
    } else if (opcao === 7 || opcao === 8) {
        texto = "Os heróis conseguem escapar da arena e entram em uma nave. Agora a batalha continua nos céus!";
        botoes = `<button class="btn-escolha" onclick="fimArena()">Fugir de Geonosis</button>`;
    }

    document.getElementById('tela-ArenaGeonosiana').innerHTML = `
        <div class="cenario">
            <p>${texto}</p>
            ${botoes}
        </div>
    `;
}

function fimArena() {
    document.getElementById('tela-ArenaGeonosiana').innerHTML = `
        <div class="cenario">
            <p>Obi-Wan, Anakin e Padmé escapam de Geonosis em uma nave Jedi! A guerra está só começando...</p>
        </div>
    `;
}