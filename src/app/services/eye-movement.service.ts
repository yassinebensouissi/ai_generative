import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
    constructor(private dialog: MatDialog, private http: HttpClient) {}

    openCamera() {
        const dialogRef = this.dialog.open(TermsDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // User agreed to the terms, proceed to open the camera
                const cameraWindow = window.open('', 'Camera', 'width=640,height=480');

                if (cameraWindow) {
                    cameraWindow.document.write(`
                        <html>
                            <body>
                                <video id="video" autoplay style="width:100%; height:auto;"></video>
                                <canvas id="canvas" style="display:none;"></canvas>
                                <div id="prediction" style="position: absolute; bottom: 10px; left: 10px; color: white; background: rgba(0, 0, 0, 0.7); padding: 10px; border-radius: 5px;">
                                    <h3 id="handicap-label">Handicap: N/A</h3>
                                    <p id="handicap-confidence">Confidence: N/A</p>
                                    <h3 id="deaf-label">Deaf: N/A</h3>
                                    <p id="deaf-confidence">Confidence: N/A</p>
                                </div>
                                <script>
                                    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
                                        .then(stream => {
                                            const video = document.getElementById('video');
                                            video.srcObject = stream;

                                            let lastProcessedTime = 0;

                                            const processFrame = () => {
                                                const canvas = document.getElementById('canvas');
                                                const context = canvas.getContext('2d');
                                                canvas.width = video.videoWidth;
                                                canvas.height = video.videoHeight;
                                                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                                const currentTime = Date.now();
                                                if (currentTime - lastProcessedTime >= 1000) {
                                                    lastProcessedTime = currentTime;

                                                    canvas.toBlob((blob) => {
                                                        if (blob) {
                                                            const formData = new FormData();
                                                            formData.append('image', blob, 'image.jpg');

                                                            fetch('http://127.0.0.1:5000/predict', {
                                                                method: 'POST',
                                                                body: formData,
                                                                headers: { 'Accept': 'application/json' }
                                                            })
                                                            .then(response => {
                                                                if (!response.ok) {
                                                                    throw new Error('Network response was not ok');
                                                                }
                                                                return response.json();
                                                            })
                                                            .then(result => {
                                                                document.getElementById('handicap-label').innerText = 'Handicap: ' + result.handicap_label;
                                                                document.getElementById('handicap-confidence').innerText = 'Confidence: ' + result.handicap_confidence + '%';
                                                                document.getElementById('deaf-label').innerText = 'Deaf: ' + result.deaf_label;
                                                                document.getElementById('deaf-confidence').innerText = 'Confidence: ' + result.deaf_confidence + '%';

                                                                // Move the cursor based on eye movement detection
                                                                // Add your eye movement code here
                                                            })
                                                            .catch(error => {
                                                                console.error('Error during fetch:', error);
                                                            });
                                                        }
                                                    }, 'image/jpeg');
                                                }
                                                requestAnimationFrame(processFrame);
                                            };
                                            requestAnimationFrame(processFrame);
                                        })
                                        .catch(error => {
                                            console.error('Error accessing the camera', error);
                                        });
                                </script>
                            </body>
                        </html>
                    `);
                    cameraWindow.document.close(); // Ensure the document is properly closed
                }
            } else {
                console.log('User did not agree to terms.');
            }
        });
    }
}
