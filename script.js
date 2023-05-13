const videos = [
  {
    src: "assets/video/sistemas.mp4",
    title: "sistemas",
  },
  {
    src: "assets/video/antimateria.mp4",
    title: "antimateria",
  },
  {
    src: "assets/video/aurora.mp4",
    title: "aurora",
  },
  {
    src: "assets/video/construto-1.mp4",
    title: "construto",
  },
  {
    src: "assets/video/DEGENERATE-1.mp4",
    title: "DEGENERATE-1",
  },
  {
    src: "assets/video/degenerate-4.mp4",
    title: "degenerate-4",
  },
  {
    src: "assets/video/detalhe.mp4",
    title: "detalhe",
  },
  {
    src: "assets/video/escadas.mp4",
    title: "escadas",
  },
  {
    src: "assets/video/espectro.mp4",
    title: "espectro",
  },
  {
    src: "assets/video/estruturas.mp4",
    title: "estruturas",
  },
  {
    src: "assets/video/neurose.mp4",
    title: "neurose",
  }
];

const videoPlayer = document.getElementById("video-player");
const videoList = document.getElementById("video-list");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;

function playVideo() {
  videoPlayer.src = videos[currentIndex].src;
  videoPlayer.play();
  const currentVideo = videos[currentIndex].title;
  document.getElementById("text-box").innerHTML = currentVideo;
}

function loadVideoList() {
  let listItems = "";
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i].title;
    listItems += `<div class="video-item">${video}</div>`;
  }
  videoList.innerHTML = listItems;
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  playVideo();
}

nextBtn.addEventListener("click", nextVideo);

loadVideoList();
playVideo();
