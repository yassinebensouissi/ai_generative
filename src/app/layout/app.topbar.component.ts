import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private dialog: MatDialog) {}

    openTermsDialog() {
        const dialogRef = this.dialog.open(TermsDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.openCamera(); // Open camera if the user agreed
            }
        });
    }

    openCamera() {
        const dialogRef = this.dialog.open(TermsDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
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
                            <div id="timer" style="position: absolute; top: 10px; left: 10px; color: white; background: rgba(0, 0, 0, 0.7); padding: 10px; border-radius: 5px;">
                                <h3>Time Remaining: <span id="countdown">10</span> seconds</h3>
                            </div>
                            <script>
                                navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
                                    .then(stream => {
                                        const video = document.getElementById('video');
                                        video.srcObject = stream;

                                        let lastProcessedTime = 0;
                                        let countdown = 10;  // Countdown from 10 seconds

                                        // Countdown Timer
                                        const countdownInterval = setInterval(() => {
                                            document.getElementById('countdown').innerText = countdown;
                                            countdown--;

                                            if (countdown < 0) {
                                                clearInterval(countdownInterval);
                                                captureFinalFrame();  // Capture the frame when countdown reaches 0
                                            }
                                        }, 1000);

                                        const processFrame = () => {
                                            const canvas = document.getElementById('canvas');
                                            const context = canvas.getContext('2d');
                                            canvas.width = video.videoWidth;
                                            canvas.height = video.videoHeight;
                                            context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                            // Draw tracking lines
                                            context.strokeStyle = 'red'; // Line color
                                            context.lineWidth = 2; // Line width

                                            // Example: Draw horizontal and vertical lines in the center
                                            const centerX = canvas.width / 2;
                                            const centerY = canvas.height / 2;

                                            // Vertical line
                                            context.beginPath();
                                            context.moveTo(centerX, 0);
                                            context.lineTo(centerX, canvas.height);
                                            context.stroke();

                                            // Horizontal line
                                            context.beginPath();
                                            context.moveTo(0, centerY);
                                            context.lineTo(canvas.width, centerY);
                                            context.stroke();

                                            requestAnimationFrame(processFrame);
                                        };
                                        requestAnimationFrame(processFrame);

                                        function captureFinalFrame() {
                                            const canvas = document.getElementById('canvas');
                                            const context = canvas.getContext('2d');
                                            context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                            canvas.toBlob((blob) => {
                                                if (blob) {
                                                    const formData = new FormData();
                                                    formData.append('image', blob, 'image.jpg');

                                                    console.log('Sending final frame to API...');
                                                    fetch('http://127.0.0.1:5000/predict', {
                                                        method: 'POST',
                                                        body: formData,
                                                        headers: { 'Accept': 'application/json' }
                                                    })
                                                    .then(response => {
                                                        console.log('Received response from API:', response);
                                                        if (!response.ok) {
                                                            throw new Error('Network response was not ok');
                                                        }
                                                        return response.json();
                                                    })
                                                    .then(result => {
                                                        console.log('API Prediction Result:', result);
                                                        document.getElementById('handicap-label').innerText = 'Handicap: ' + result.handicap_label;
                                                        document.getElementById('handicap-confidence').innerText = 'Confidence: ' + result.handicap_confidence + '%';
                                                        document.getElementById('deaf-label').innerText = 'Deaf: ' + result.deaf_label;
                                                        document.getElementById('deaf-confidence').innerText = 'Confidence: ' + result.deaf_confidence + '%';
                                                    })
                                                    .catch(error => {
                                                        console.error('Error during fetch:', error);
                                                    });
                                                } else {
                                                    console.error('Failed to capture frame');
                                                }
                                            }, 'image/jpeg');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error accessing the camera', error);
                                    });
                            </script>
                        </body>
                    </html>
                `);
                }
            } else {
                console.log('User did not agree to terms.');
            }
        });
    }

}
