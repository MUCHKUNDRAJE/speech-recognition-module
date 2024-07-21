document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start-button');
    const resultPara = document.getElementById('result');
    const listen = document.getElementById('listen');

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;

    if (!SpeechRecognition || !SpeechSynthesis) {
        alert('Sorry, your browser does not support Speech Recognition or Speech Synthesis.');
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log('Voice recognition started. Try speaking into the microphone.');
        listen.innerHTML = " Listening Started :"

    };

    recognition.onspeechend = () => {
        console.log('Speech recognition has stopped.');
        listen.innerHTML = " Listening Stopped :"
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('You said: ', transcript);
        resultPara.innerHTML +=` <p> You Said : ${transcript} <p>`;
        speak(transcript);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
    };

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = SpeechSynthesis.getVoices();
        
        // Select a female voice
        const femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.gender === "female");
        
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        } else {
            console.log("Desired female voice not found, using default voice.");
        }

        SpeechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded
    SpeechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded.");
    };
});



