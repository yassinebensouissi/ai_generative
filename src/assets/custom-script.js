document.addEventListener('DOMContentLoaded', function() {
    // Ensure only one click listener is added for startBtn
    const startButton = document.querySelector('#startBtn');
    let ocrResult = ''; // Variable to store OCR result

    if (startButton) {
        startButton.addEventListener('click', function() {
            document.querySelector('.test2')?.classList.add('hidden');
        });
    }

    // Initialize speech recognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set language to English
    recognition.interimResults = false; // Only get final result

    // Start speech recognition when startBtn is clicked
    startButton.addEventListener('click', () => {
        recognition.start();
        console.log('Speech recognition started...');
    });

    // Speech recognition result event
    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.trim(); // Get spoken text
        console.log('Recognized text:', spokenText);

        const links = document.querySelectorAll('a'); // Get all links
        let matchFound = false;

        links.forEach(link => {
            if (link.textContent.toLowerCase() === spokenText.toLowerCase()) {
                link.click(); // Click the link if spoken text matches link text
                matchFound = true;
            }
        });

        if (!matchFound) {
            console.log('No matching link found for:', spokenText);
        }

        // Read the recognized text using responsiveVoice
        if (responsiveVoice) {
            console.log("Speaking recognized text:", spokenText);
            responsiveVoice.speak(spokenText, "UK English Female"); // Ensure voice and text are passed correctly
        } else {
            console.error("ResponsiveVoice not available.");
        }
    };

    // Handle speech recognition errors
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    // OCR button click event
    const ocrButton = document.getElementById('ocrBtn');
    if (ocrButton) {
        ocrButton.addEventListener('click', performOCR);
    }

    // TTS button click event
    const ttsButton = document.getElementById('ttsBtn');
    if (ttsButton) {
        ttsButton.addEventListener('click', () => {
            textToSpeech(ocrResult);
        });
    }

    // Perform OCR using Tesseract.js
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

    function performOCROnImage(img) {
        preprocessImage(img).then((processedFile) => {
            Tesseract.recognize(processedFile, 'eng', {
                logger: (m) => console.log(m),
            }).then(({ data: { text } }) => {
                const output = document.getElementById('output');
                output.innerText += `OCR Result for image: ${img.alt}\n${text}\n\n`;
                ocrResult = text; // Save OCR result for TTS
            }).catch(err => {
                console.error(err);
                alert('Error recognizing text in the image.');
            });
        }).catch(err => {
            console.error(err);
            alert('Error preprocessing the image.');
        });
    }

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
