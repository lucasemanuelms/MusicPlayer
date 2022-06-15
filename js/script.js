const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next")

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

//Função de dar play na música
function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
}

//Função de dar pause na música
function pauseMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause()
}

//Função para ir para a próxima música / pular música
function nextMusic(){
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

//Função para ir para a música anterior / voltar música
function prevMusic(){
    musicIndex--
    musicIndex < 1? musicIndex = allMusic.length : musicIndex = musicIndex 
    loadMusic(musicIndex)
    playMusic()
}

//Função que faz a verificação se a música está pausada ou não, para que saiba como proceder
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused")

    isMusicPaused ? pauseMusic() : playMusic()
})

//Chama a função para ir para a próxima música
nextBtn.addEventListener("click", ()=>{
    nextMusic()
})

//Chama a função para ir para a música anterior
prevBtn.addEventListener("click", ()=>{
    prevMusic()
})

