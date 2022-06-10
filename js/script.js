const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist")

let musicIndex = 1

window.addEventListener("load", ()=>{
    loadMusic(musicIndex) //Chama a função de carregar música quando a página é carregada
})

//Função de carregar música
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name
    musicArtist.innerText = allMusic[indexNumb-1].artist
    musicImg.src = `images/${allMusic[indexNumb-1].img}`
}
