function tocarMusica(idAudio) {
    document.getElementById("tela-inicial").style.display = "none"; // 

    let musica = document.getElementById(`${idAudio}`);
    musica.volume = 0.1;
    musica.play();

    document.getElementById("intro").style.display = "flex";

    // Para a música e muda o display
    document.querySelector(".crawl").addEventListener("animationend", () => {
        document.getElementById("intro").style.display = "none";
        musica.pause();
        musica.currentTime = 0;
    });
}
