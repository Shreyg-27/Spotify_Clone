console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay"); 
let myProgressBar = document.getElementById("myProgressBar"); 
let gif = document.getElementById("gif"); 
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tu Muskuraye", filePath:"songs/1.mp3", coversPath: "covers/1.png"},
    {songName: "Befiker", filePath:"songs/2.mp3", coversPath: "covers/2.jpg"},
    {songName: "Aziyat", filePath:"songs/3.mp3", coversPath: "covers/3.jpg"},
    {songName: "Lagan Lagi Re", filePath:"songs/4.mp3", coversPath: "covers/4.jpg"},
    {songName: "Madhubala", filePath:"songs/5.mp3", coversPath: "covers/5.jpg"},
    {songName: "Waqt Ki Baatein", filePath:"songs/6.mp3", coversPath: "covers/6.jpg"},
    {songName: "Kho Gye", filePath:"songs/7.mp3", coversPath: "covers/7.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coversPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})




// audioElement.play()

// handle play/pause/click
// masterPlay.addEventListener('click',()=>{
//     if (audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.classList.remove('fa-regular fa-circle-play fa-3x');
//         masterPlay.classList.add('fa-solid fa-pause fa-3x');
        
//     }
// });

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-regular', 'fa-circle-play', 'fa-3x');
        masterPlay.classList.add('fa-solid', 'fa-pause', 'fa-3x');
        gif.style.opacity=1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-solid', 'fa-pause', 'fa-3x');
        masterPlay.classList.add('fa-regular', 'fa-circle-play', 'fa-3x');
        gif.style.opacity=0;
    }
});


// Listen to Events 
audioElement.addEventListener('timeupdate', ()=>{
    // update the seek bar by calc the percentage 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress
});

// if clicked randomly on progress bar, the song should play from that side

myProgressBar.addEventListener('change', ()=>{
    // rhs lhs the above formulae to get the current time
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
});

const makeAllPlays = ()=>{
    // e.target.classList.add('fa-solid', 'fa-pause', 'fa-3x');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-solid', 'fa-pause');
        element.classList.add('fa-regular', 'fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-regular', 'fa-circle-play');
        e.target.classList.add('fa-solid', 'fa-pause');
        // audioElement.src='songs/${index}.mp3';
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-regular', 'fa-circle-play', 'fa-3x');
        masterPlay.classList.add('fa-solid', 'fa-pause', 'fa-3x');
    })   
})

// forward

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play', 'fa-3x');
    masterPlay.classList.add('fa-solid', 'fa-pause', 'fa-3x');
})

// previous 

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play', 'fa-3x');
    masterPlay.classList.add('fa-solid', 'fa-pause', 'fa-3x');
})



