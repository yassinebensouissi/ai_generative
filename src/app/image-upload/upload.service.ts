import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private apiUrl = 'http://127.0.0.1:5000/predict';  // Update to your Flask API endpoint

    constructor(private http: HttpClient) {}

    uploadImage(image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image, image.name);

        return this.http.post<any>(this.apiUrl, formData);
    }
}
