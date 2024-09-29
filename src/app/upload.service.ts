import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    private apiUrl = 'http://127.0.0.1:5000/predict';  // Flask API URL

    constructor(private http: HttpClient) {}

    uploadImage(imageFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', imageFile);  // 'image' should match the key in Flask

        return this.http.post(this.apiUrl, formData);
    }
}
