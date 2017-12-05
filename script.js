var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var recordBtn = document.querySelector('.recordBtn');
var text = document.querySelector('.text');
var speech = document.querySelector('.speech');
var clickTxt = document.querySelector('.clickTxt');

var clickReg = /click/gi;
var enterReg = /enter/gi;
var scrollReg = /scroll/gi;
var appleReg = /apple/gi;
var orangeReg = /orange/gi;
var plumReg = /plum/gi;

function testSpeech() {
    console.log('initializing');
    if(!SpeechRecognition){
        speech.textContent = 'Upgrade browser to support SpeechRecognition';
        return;
    }

    speech.textContent = '';
    var recognition = new SpeechRecognition();

    recordBtn.disabled = true;
    recordBtn.textContent = 'Recording in progress';
    recognition.lang = 'en-US';

    recognition.start();
    recognition.onresult = function(event) {
        var speechResult = event.results[0][0].transcript;
        // speech.textContent = 'Speech received: ' + speechResult + '.';

        // var error = true;

        var clickResult = speechResult.match(clickReg);
        var enterResult = speechResult.match(enterReg);
        var scrollResult = speechResult.match(scrollReg);
        if(clickResult){
            speech.textContent = 'Speech received: ' + speechResult + '.';
            var index = speechResult.search(clickReg) + 6; //6 is length of 'click '
            var item = speechResult.substring(index).split()[0];
            // error = false;
            if(item.match(appleReg)){
                changeClickText('apple');
            } else if(item.match(orangeReg)){
                changeClickText('orange');
            } else if(item.match(plumReg)){
                changeClickText('plum');
            } else {
                error = true;
                speech.textContent += "\n That click object doesnt exist!";
            }
        }
        if(enterResult){
            speech.textContent = 'Speech received: ' + speechResult + '.';
            var index = speechResult.search(enterReg) + 6; //6 is length of 'enter '
            var enterText = speechResult.substring(index);
            text.textContent = enterText;
            // error = false;
        }
        if(scrollResult){
            speech.textContent = 'Speech received: ' + speechResult + '.';
            var index = speechResult.search(scrollReg) + 7; //7 is length of 'scroll '
            var scrollDir = speechResult.substring(index).split()[0];
            if(scrollDir == 'up'){
                error = false;
                window.scrollBy(0, -50);
            }else if (scrollDir == 'down'){
                // error = false;
                window.scrollBy(0, 50);
            }
        }
        else {
            speech.textContent = "Sorry invalid command, you said:" + speechResult;
        }
    }
    recognition.onspeechend = function() {
        recognition.stop();
        recordBtn.disabled = false;
        recordBtn.textContent = 'Press and Say Command';
    }
}
function changeClickText(newStr){
    clickTxt.textContent = newStr;
}


recordBtn.addEventListener('click', testSpeech);

