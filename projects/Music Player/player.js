const dayNight = document.getElementById("themeToggle");
const playerWrapper = document.querySelector(".player-wrapper")
const audio = new Audio();
const cover = document.querySelector(".cover-img");
const title = document.querySelector(".song-title");
const artiste = document.querySelector(".artist-name");
const play = document.getElementById("playBtn");
const nextButton = document.getElementById("nextBtn");
const previousButton = document.getElementById("prevBtn");
const icon = document.querySelector(".fa-solid");
let progressBar = document.getElementById("progressBar");
let initialTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".total-time");


dayNight.addEventListener("click",() =>{
    playerWrapper.classList.toggle("dark");
    dayNight.classList.toggle("night");
})




allSongs = [
    {
    id: 1,
    title:"Ebezina",
    artiste:'Preye',
    src: "music-list/Ebezina.mp3",
    cover: "covers/ebezina.webp"
    },
     {
    id: 2,
    title:"Woara",
    artiste:'Kwesi Arthur',
    src: "music-list/woara.mp3",
    cover: "covers/woara.jpg"
    },
    {
    id: 3,
    title:"Pray 4 Me",
    artiste:'Kwesi Arthur',
    src: "music-list/pray4me.mp3",
    cover: "covers/pray for me.jpg"
    },
    {
    id: 4,
    title:"Kingdom Come",
    artiste:'Tommy Lee Sparta',
    src: "music-list/kingdom come.mp3",
    cover: "covers/kingdom come.jpg"
    },
    {
    id: 5,
    title:"Yaya",
    artiste:'Black Sherif',
    src: "music-list/yaya.mp3",
    cover: "covers/yaya.jpg"
    },
    {
    id: 6,
    title:"Shut Up",
    artiste:'Black Sherif',
    src: "music-list/shutup.mp3",
    cover: "covers/shut up.webp"
    },
];

let currentSongNumber = 0; 

function loadSong(index){
    const song = allSongs[index];
    title.textContent = song.title;
    artiste.textContent = song.artiste;
    audio.src = song.src;
    cover.src = song.cover
    setActiveTrack(index);
}
function playSong(currentSongNumber){
    audio.play();
    togglePlay();
    
    
}

function pauseSong(currentSongNumber){
    audio.pause();
    togglePlay();
}

function togglePlay(){
    if(audio.paused){
        icon.classList.add("fa-play");
        icon.classList.remove("fa-pause");
    }else{
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    }
}

function nextSong(){
    currentSongNumber ++;
    if(currentSongNumber >= allSongs.length){
        currentSongNumber = 0;
    }
    loadSong(currentSongNumber);
    playSong();
    setActiveTrack(index);
}

function previousSong(){
    currentSongNumber --;
    if(currentSongNumber < 0){
        currentSongNumber = allSongs.length - 1;
    }
    loadSong(currentSongNumber);
    playSong();
}

play.addEventListener("click", () =>{
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});

nextButton.addEventListener("click",() =>{
    nextSong();
});

previousButton.addEventListener("click",() =>{
    previousSong();
});

audio.addEventListener("timeupdate",() =>{
    if(audio.duration){
        let progressPercent = (audio.currentTime / audio.duration)*100;
        progressBar.value = progressPercent;
        

    }
    initialTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input",() =>{
    const seekTime = (progressBar.value/100)*audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener("ended",() =>{
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    nextSong();
})


function formatTime(seconds){
    const mins = Math.floor(seconds/60);
    const secs = Math.floor(seconds%60);
    return `${mins}:${secs < 10 ? "0" + secs:secs}`;
};

let playListContainer = document.querySelector(".play-list-container");
allSongs.forEach(track => {
    let trackList = document.createElement("li");
    trackList.className = "track";
    let image = document.createElement("img");
    image.src = track.cover;
    let title_artiste_Container = document.createElement("div");
    let t_title = document.createElement("p");
    t_title.className = "t-title";
    t_title.textContent = track.title;
    let t_artiste = document.createElement("p");
    t_artiste.className = "t-artist";
    t_artiste.textContent = track.artiste;

    title_artiste_Container.appendChild(t_title);
    title_artiste_Container.appendChild(t_artiste);
    trackList.appendChild(image);
    trackList.appendChild(title_artiste_Container);

    playListContainer.appendChild(trackList);


    
});
// play list elements
let singleTrack = document.querySelectorAll(".track");
console.log(singleTrack);

singleTrack.forEach((item,index) =>{
    item.addEventListener("click",() =>{
        currentSongNumber = index;
        loadSong(currentSongNumber);
        playSong();
        setActiveTrack(index);

        
    });
});
function setActiveTrack(index) {
            singleTrack.forEach(track => track.classList.remove("active"));
            singleTrack[index].classList.add("active");
}
loadSong(currentSongNumber)

