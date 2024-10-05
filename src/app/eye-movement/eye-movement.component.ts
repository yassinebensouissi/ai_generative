import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
    selector: 'app-eye-movement',
    templateUrl: './eye-movement.component.html',
    styleUrls: ['./eye-movement.component.scss']
})
export class EyeMovementComponent implements OnInit, OnDestroy {
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    private eyeTrackingInterval: any;

    ngOnInit() {
        this.loadFaceApiModels();
        this.startCamera();
    }

    async loadFaceApiModels() {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    }

    startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.videoElement.nativeElement.srcObject = stream;
                this.videoElement.nativeElement.play();
                this.trackEyes();
            })
            .catch(err => {
                console.error("Error accessing camera: ", err);
            });
    }

    async trackEyes() {
        const canvas = faceapi.createCanvasFromMedia(this.videoElement.nativeElement);
        document.body.append(canvas);

        const displaySize = { width: this.videoElement.nativeElement.width, height: this.videoElement.nativeElement.height };
        faceapi.matchDimensions(canvas, displaySize);

        this.eyeTrackingInterval = requestAnimationFrame(async () => {
            const detections = await faceapi.detectAllFaces(this.videoElement.nativeElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            if (detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();
                const averageX = (leftEye[0].x + rightEye[0].x) / 2;
                const averageY = (leftEye[0].y + rightEye[0].y) / 2;

                this.moveCursor({ x: averageX, y: averageY });
            }

            this.eyeTrackingInterval = requestAnimationFrame(this.trackEyes.bind(this));
        });
    }

    moveCursor(position: { x: number; y: number }) {
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: position.x,
            clientY: position.y
        });
        document.dispatchEvent(mouseEvent);
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.eyeTrackingInterval);
    }
}
