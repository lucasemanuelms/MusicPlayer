const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar")


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

//Atualiza a barra de progresso de acordo com o tempo atual da música
mainAudio.addEventListener('timeupdate', (e)=>{
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = wrapper.querySelector(".current"), 
    musicDuration = wrapper.querySelector(".duration")
    
    mainAudio.addEventListener('loadeddata', ()=>{

        // Atualização da duração total da música
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10){
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`

    })

    // Atualização do tempo atual da música que está tocando
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if(currentSec < 10){
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration

    playMusic()
})

const repeatBtn = wrapper.querySelector("#repeat-plist")

repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText
    
    switch(getText){
        case "repeat": 
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText

    switch(getText){
        case "repeat": 
            nextMusic()
            break;
        case "repeat_one":
            mainAudio.currentTime = 0
            loadMusic(musicIndex)
            playMusic()
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random()*allMusic.length) + 1)

            do{
                randIndex = Math.floor((Math.random()*allMusic.length) + 1)
            }while(musicIndex == randIndex)
            musicIndex = randIndex
            loadMusic(musicIndex)
            playMusic()
            break;
    }
})