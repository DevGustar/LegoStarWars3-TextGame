function tocarMusica() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById('MainTitle').volume = 0.3; // Define o volume para 50%
    document.getElementById('MainTitle').play();
    document.getElementById("intro").style.display = "flex";
}
