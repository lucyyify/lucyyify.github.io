var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;


var testBtn = document.querySelector('button');
var phrase = document.querySelector('.phrase');
var speech = document.querySelector('.speech');

function testSpeech() {
    console.log("initiating");
    if(!SpeechRecognition){
        speech.textContent = 'Upgrade browser to support SpeechRecognition';
        return;
    }
    speech.textContent = '';
    var recognition = new SpeechRecognition();

    testBtn.disabled = true;
    testBtn.textContent = 'Test in progress';
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    recognition.onresult = function(event) {
        var speechResult = event.results[0][0].transcript;
        phrase.textContent = 'Speech received: ' + speechResult + '.';
    }

    recognition.onspeechend = function() {
        recognition.stop();
        testBtn.disabled = false;
        testBtn.textContent = 'Start new test';
    }
}

testBtn.addEventListener('click', testSpeech);































// function testSpeech() {
//   testBtn.disabled = true;
//   testBtn.textContent = 'Test in progress';

//   var phrase = phrases[randomPhrase()];
//   phrasePara.textContent = phrase;
//   resultPara.textContent = 'Right or wrong?';
//   resultPara.style.background = 'rgba(0,0,0,0.2)';
//   diagnosticPara.textContent = '...diagnostic messages';

//   var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
//   var recognition = new SpeechRecognition();
//   var speechRecognitionList = new SpeechGrammarList();
//   speechRecognitionList.addFromString(grammar, 1);
//   recognition.grammars = speechRecognitionList;
//   recognition.lang = 'en-US';
//   recognition.interimResults = false;
//   recognition.maxAlternatives = 1;

//   recognition.start();

//   recognition.onresult = function(event) {
//     // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
//     // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
//     // It has a getter so it can be accessed like an array
//     // The first [0] returns the SpeechRecognitionResult at position 0.
//     // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
//     // These also have getters so they can be accessed like arrays.
//     // The second [0] returns the SpeechRecognitionAlternative at position 0.
//     // We then return the transcript property of the SpeechRecognitionAlternative object 
//     var speechResult = event.results[0][0].transcript;
//     diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
//     if(speechResult === phrase) {
//       resultPara.textContent = 'I heard the correct phrase!';
//       resultPara.style.background = 'lime';
//     } else {
//       resultPara.textContent = 'That didn\'t sound right.';
//       resultPara.style.background = 'red';
//     }

//     console.log('Confidence: ' + event.results[0][0].confidence);
//   }

//   recognition.onspeechend = function() {
//     recognition.stop();
//     testBtn.disabled = false;
//     testBtn.textContent = 'Start new test';
//   }

//   recognition.onerror = function(event) {
//     testBtn.disabled = false;
//     testBtn.textContent = 'Start new test';
//     diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
//   }

// }