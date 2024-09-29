import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { HttpClient } from '@angular/common/http';
import { EyeMovementResponse } from '../eye-movement.model';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
    eyeMovementActive = false;
    gazeHoldTimer: any; // Timer for gaze hold
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

    constructor(private dialog: MatDialog, private http: HttpClient) {}

    openCamera() {
        const dialogRef = this.dialog.open(TermsDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.eyeMovementActive = true;
                this.startVideoStream();
            } else {
                console.log('User did not agree to terms.');
            }
        });
    }

    startVideoStream() {
        const video = this.videoElement.nativeElement;
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                return video.play();
            })
            .then(() => {
                console.log("Video stream started successfully.");
                this.trackEyeMovement(video);
            })
            .catch(error => {
                console.error("Error accessing camera:", error);
            });
    }

    trackEyeMovement(video: HTMLVideoElement) {
        const canvas = this.canvasElement.nativeElement;
        const context = canvas.getContext('2d');

        // Set canvas size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        setInterval(() => {
            if (context) {
                context.drawImage(video, 0, 0);
                this.sendFrameToAPI(video);
            }
        }, 100); // Capture frame every 100 ms
    }

    sendFrameToAPI(video: HTMLVideoElement) {
        const canvas = this.canvasElement.nativeElement;
        canvas.toBlob(blob => {
            if (blob) {
                const formData = new FormData();
                formData.append('image', blob, 'frame.jpg');

                // Send the frame for both eye movement and handicap detection
                this.http.post<EyeMovementResponse>('http://localhost:5001/eye-movement', formData)
                    .subscribe(
                        response => {
                            console.log('Eye movement response:', response);
                            this.simulateNavigation(response.gaze);
                        },
                        error => {
                            console.error('Error sending frame for eye movement:', error);
                        }
                    );

                this.http.post<any>('http://localhost:5001/predict', formData)
                    .subscribe(
                        response => {
                            console.log('Handicap detection response:', response);
                            // You can handle handicap detection result here
                        },
                        error => {
                            console.error('Error sending frame for handicap detection:', error);
                        }
                    );
            }
        }, 'image/jpeg');
    }

    simulateNavigation(gaze: { screen_x: number; screen_y: number }) {
        console.log(`Gaze coordinates - X: ${gaze.screen_x}, Y: ${gaze.screen_y}`);
        this.checkGazeElement(gaze.screen_x, gaze.screen_y);
    }

    checkGazeElement(screen_x: number, screen_y: number) {
        const element = document.elementFromPoint(screen_x, screen_y) as HTMLElement; // Cast to HTMLElement
        if (element) {
            console.log(`Gaze detected on element: ${element.tagName}`);
            element.classList.add('highlight');

            // Clear previous timer if any
            clearTimeout(this.gazeHoldTimer);

            // Set a timer for gaze hold detection (e.g., 500 ms)
            this.gazeHoldTimer = setTimeout(() => {
                if (element.click) {
                    element.click(); // Simulate click or navigate
                    console.log('Element clicked:', element);
                } else {
                    console.warn('Element is not clickable');
                }
            }, 500); // Adjust duration as needed
        } else {
            console.warn('No element detected at gaze coordinates.');
        }
    }
}
