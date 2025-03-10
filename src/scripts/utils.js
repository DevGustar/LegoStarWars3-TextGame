function tocarMusica(idAudio) {
    document.getElementById("tela-inicial").style.display = "none";

    let musica = document.getElementById(idAudio);
    musica.volume = 0.05;
    musica.play();

    // Aguarda 15 segundos antes de exibir o botão de pular
    setTimeout(() => {
        document.getElementById("skip-button").style.display = "flex";
    }, 15000);
    // Exibe a introdução
    document.getElementById("intro").style.display = "flex";
    // Para a música e muda o display ao fim da animação
    document.querySelector(".crawl").addEventListener("animationend", () => {
        pularIntro();
    });
}

function pularIntro() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("skip-button").style.display = "none";

    let musica = document.getElementById("MainTitle");
    musica.pause();
    musica.currentTime = 0;
}
