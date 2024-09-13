document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#startBtn').addEventListener('click', function() {
        alert("hello")
        document.querySelector('.test2').classList.add('hidden');
    });
    let ocrResult = ''; // Variable to store OCR result

    const recognition = new webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set language to English

    // Start button click event
    document.getElementById('startBtn').addEventListener('click', () => {
        recognition.start(); // Start speech recognition
    });

    // Speech recognition result event
    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.trim(); // Get spoken text
        const links = document.querySelectorAll('a'); // Get all links
        // Loop through links to find a match
        let matchFound = false;
        links.forEach(link => {
            if (link.textContent.toLowerCase() === spokenText.toLowerCase()) {
                link.click(); // Click the link if spoken text matches link text
                matchFound = true;
            }
        });

        // Optionally, display spoken text and handle no match found scenario
        console.log('Spoken Text:', spokenText);
        if (!matchFound) {
            console.log('No links found.');
        }
    };

    // Error handling
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    // OCR button click event
    document.getElementById('ocrBtn').addEventListener('click', () => {
        performOCR();
    });

    // TTS button click event
    document.getElementById('ttsBtn').addEventListener('click', () => {
        textToSpeech(ocrResult);
    });

    // Perform OCR using Tesseract.js
    document.addEventListener('DOMContentLoaded', (event) => {
        // This code will run after the DOM is fully loaded and parsed

        // Select the button and add an event listener
        const ocrButton = document.getElementById('ocrButton');
        if (ocrButton) {
            ocrButton.addEventListener('click', performOCROnAllImages);
        } else {
            console.error('Button with ID "ocrButton" not found.');
        }
    });
    window.onload = () => {
        // This code will run after the entire page (including resources) is fully loaded

        // Select the button and add an event listener
        const ocrButton = document.getElementById('ocrButton');
        if (ocrButton) {
            ocrButton.addEventListener('click', performOCROnAllImages);
        } else {
            console.error('Button with ID "ocrButton" not found.');
        }
    };

    // Define the OCR functions
    function performOCROnImage(img) {
        preprocessImage(img).then((processedFile) => {
            Tesseract.recognize(
                processedFile,
                'eng',
                {
                    logger: (m) => console.log(m),
                }
            ).then(({ data: { text } }) => {
                const output = document.getElementById('output');
                output.innerText += `OCR Result for image: ${img.alt}\n${text}\n\n`;
            }).catch(err => {
                console.error(err);
                alert('Error recognizing text in the image.');
            });
        }).catch(err => {
            console.error(err);
            alert('Error preprocessing the image.');
        });
    }

    function performOCROnAllImages() {
        const images = document.querySelectorAll('.ocr-image');
        images.forEach(img => {
            const imageClone = new Image();
            imageClone.src = img.src;
            imageClone.alt = img.alt;

            imageClone.onload = () => {
                performOCROnImage(imageClone);
            };
        });
    }

// Ensure the function is attached to the button after the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        const ocrButton = document.getElementById('ocrButton');
        if (ocrButton) {
            ocrButton.addEventListener('click', performOCROnAllImages);
        } else {
            console.error('Button with ID "ocrButton" not found.');
        }
    });

    // Convert text to speech
    function textToSpeech(text) {
        if (text.trim() === '') {
            alert('No text available for TTS. Please perform OCR first.');
            return;
        }
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        } else {
            console.error('Speech synthesis not supported.');
            alert('Speech synthesis not supported in this browser.');
        }
    }
});
