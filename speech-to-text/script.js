// const grammar =
//   " public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
//   const speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
// recognition.lang = "en-US";
// //make lang hindi 
// // recognition.lang = "hi-IN";
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

// const diagnostic = document.querySelector(".output");
// const bg = document.querySelector("html");
// const button = document.querySelector(".button");
// button.onclick = () => {
//   alert('say something');
//   recognition.start();
//   console.log("Ready to receive a color command.");
// };

// recognition.onresult = (event) => {
//    console.log(event);
//   const color = event.results[0][0].transcript;
//   diagnostic.textContent = `Result received: ${color}`;
//   bg.style.backgroundColor = color;
// };

const languageSelect = document.querySelector('[data-langSelect]');
const recordBtn = document.querySelector('[data-startBtn]');
const result = document.querySelector('[data-resultText]');
const downloadBtn = document.querySelector('[data-downloadBtn]');
const clearBtn = document.querySelector('[data-clearBtn]');


function addLanguages(){
  languages.forEach((language)=>{
    const option = document.createElement('option');
    option.value= language.code;
    option.innerHTML = language.name;
    languageSelect.appendChild(option);
  })
}

addLanguages();

let SpeechRecongnition = window.SpeechRecognition || window.webkitSpeechRecognition,
recognition,recording=false;


function speechToText(){
  try {
    recognition = new SpeechRecongnition();
    recognition.lang = languageSelect.value;
    recognition.interimResults = true;
    
    recordBtn.querySelector("p").innerHTML = "Listening...";
    recordBtn.classList.add("recording");
    recognition.start();

    recognition.onresult = (event) =>{
      const speechResult = event.results[0][0].transcript;
      //detect when intrim result
      if(event.results[0].isFinal){
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      }
      else{
        if(!document.querySelector(".interim")){
          const interim = document.createElement('p');
          interim.classList.add('interim');
          result.appendChild(interim);
        }

        document.querySelector('.interim').innerHTML  = " " + speechResult;
      }

      downloadBtn.disabled = false;
    };

    recognition.onspeechend = () =>{
      speechToText();
    };

    recognition.onerror = (event) =>{
      stopRecording();
      if(event.error === "no-speech"){
        alert("No speech was detected.Stopping....");
      }
      else if(event.error === "audio-capture"){
        alert("No microphone was found. Ensure that a microphone is installed")
      }
      else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    }

  } catch (error) {
    recording = false;
    console.log(error)
  }
  
}

recordBtn.addEventListener("click",()=>{
  if(!recording){
    speechToText();
    recording = true;
  }
  else{
    stopRecording();
  }
})

function stopRecording(){
  recognition.stop();
  recordBtn.querySelector("p").innerText= "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}

function download(){
  const text = result.innerText;
  const fileName = "speech.txt";

  const element = document.createElement('a');
  element.setAttribute('href',"data:text/plain:charset=utf-8,"+encodeURIComponent(text));
  element.setAttribute("download",fileName);
  element.style.display= "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

downloadBtn.addEventListener("click",download);

clearBtn.addEventListener("click",()=>{
  result.innerHTML = "";
  downloadBtn.disabled = true;
})