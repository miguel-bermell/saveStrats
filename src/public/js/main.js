const form = document.querySelector("form");
const btn = document.querySelector("button");
const key = document.querySelector("#key");
const value = document.querySelector("#value");
const result = document.querySelector(".result");
const voiceSelect = document.querySelector("select");
var synth = window.speechSynthesis;

if (!("webkitSpeechRecognition" in window)) {
  alert("Tu navegador no admite esta API");
}
const recognitionVoice =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition;

const recognition = new recognitionVoice();
recognition.maxAlternatives = 5;

recognition.onstart = () => {
  result.innerHTML = "Grabando voz..";
};

recognition.onresult = (e) => {
  let dataKey = key.value;
  let dataValue = value.value;
  let message = e.results[0][0].transcript;
  // read(message);
  console.log(dataKey);
  console.log(dataValue);
  readCondition(message, dataKey, dataValue);
};

const readCondition = (msg, key = "hola", value = "hola mundo") => {
  console.log(key);
  const voice = new SpeechSynthesisUtterance();
  if (msg.includes(key.toString())) {
    voice.text = value.toString();
  } else {
    voice.text = "No te he entendido";
  }
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      voice.voice = voices[i];
      break;
    }
  }
  synth.speak(voice);
};

const read = (msg) => {
  const voice = new SpeechSynthesisUtterance();
  voice.text = msg;
  synth.speak(voice);
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
});

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";
    if (voices[i].lang == "es-ES") {
      option.textContent += " -- DEFAULT --";
    }
    console.log(voices[i]);

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
