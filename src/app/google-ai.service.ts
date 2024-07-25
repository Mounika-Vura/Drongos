// google-ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAiService {
  private apiKey = environment.googleAiApiKey;
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

  constructor(private http: HttpClient) { }

  generateLayoutCode(jsonData: string): Observable<any> {
    const params = new HttpParams().set('key', this.apiKey);

    const body = {
      contents: [{
        parts: [{
          text: `Generate HTML, CSS, and TypeScript code for the following layout configurations. Return only the code without any explanations. Separate HTML, CSS, and TypeScript with '---HTML---', '---CSS---', and '---TS---' markers.And i dont want to link stylesheet and ts file in html and also i want separate color for each div. JSON input: ${jsonData}`
        }]
      }]
    };

    return this.http.post(this.apiUrl, body, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}