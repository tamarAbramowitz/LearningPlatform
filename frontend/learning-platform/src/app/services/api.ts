import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // שליחת הפרומפט לשרת
  generateLesson(categoryId: string, subCategoryId: string, promptText: string): Observable<any> {
    const payload = {
      category_id: categoryId,
      sub_category_id: subCategoryId,
      prompt: promptText
    };
    return this.http.post(`${this.baseUrl}/prompts`, payload);
  }
}