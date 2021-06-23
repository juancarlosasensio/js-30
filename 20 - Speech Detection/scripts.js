window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('end', recognition.start)
recognition.start()

let p = document.createElement('p');
let words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')

    p.textContent = transcript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }

    // Fun actions triggered by "speech commands"...
    // if (e.results[0].isFinal && transcript == "clear all") {
    //   words.innerHTML = '';
    // } else if (e.results[0].isFinal && transcript == "clear") {
    //   p.textContent = ""
    // } else if (e.results[0].isFinal && transcript == "clear previous") {
    //   let previous = p.previousElementSibling;
    //   p.parentNode.removeChild(previous)
    //   p.innerText = ""
    // } else if (e.results[0].isFinal) {
    //   p = document.createElement('p')
    //   words.appendChild(p)
    // }
})