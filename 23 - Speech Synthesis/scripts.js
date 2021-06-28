const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setOption))
speakButton.addEventListener('click', () => toggle(true, msg))
stopButton.addEventListener('click', () => toggle(false))

function populateVoices() {
  voices = this.getVoices();
  const voiceOptions = voices
    .filter(voice => voice.lang.includes('en') || voice.lang.includes('es'))
    .map(voice => 
      `<option value="${voice.name}">${voice.name} (${voice.lang})`
    ).join('')
  voicesDropdown.innerHTML = voiceOptions;  
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name == this.value)
  toggle(true, msg)
}

function stopVoice() {
  speechSynthesis.cancel()
}

function toggle(startOver = true, msg) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg)
  }
}

function setOption() {
  msg[this.name] = this.value;
  toggle(true, msg)
}
