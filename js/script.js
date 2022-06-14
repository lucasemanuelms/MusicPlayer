const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause")

let musicIndex = 4

window.addEventListener("load", ()=>{
    loadMusic(musicIndex) //Chama a função de carregar música quando a página é carregada
})

//Função de carregar música
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name
    musicArtist.innerText = allMusic[indexNumb-1].artist
    musicImg.src = `images/${allMusic[indexNumb-1].img}`
    mainAudio.src = `songs/${allMusic[indexNumb-1].src}`
}

function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
}

function pauseMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause()
}


playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused")

    isMusicPaused ? pauseMusic() : playMusic()
})