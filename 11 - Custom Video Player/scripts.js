/* 
  1) Get Elements
  2) Build functions
  3) Register event listeners in the right context and get them to fire at the right time.
*/

// 1) Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullScreen = player.querySelector('.full-screen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let isMouseDown = false;

// 2) Build functions
function setMouseIsDown() {
  isMouseDown = true
}
function setMouseIsUp() {
  isMouseDown = false;
}

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleFullScreen() {
  video.requestFullscreen()
}

function updatePlayButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  if (isMouseDown) {
    video[this.name] = this.value;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
}


// 3) Register event listeners in the right context and get them to fire at the right time.
document.addEventListener('mousedown', setMouseIsDown)
document.addEventListener('mouseup', setMouseIsUp)
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
  button.addEventListener('click', skip)
})
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate)
})
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate)
})
let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    scrub(e)
  }
})
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
fullScreen.addEventListener('click', toggleFullScreen)