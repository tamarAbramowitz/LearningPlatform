import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number = 1, limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&limit=${limit}`, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getSubCategories(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sub-categories/${categoryId}`);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  generateLesson(data: { category_id: string, sub_category_id?: string, prompt: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/ai/generate`, data, this.getHeaders());
  }

  getHistory(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ai/history/${userId}`, this.getHeaders());
  }
  getAllHistory(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.baseUrl}/ai/all?page=${page}&limit=${limit}`, this.getHeaders());
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }
  createCategory(data: { name: string }) {
    return this.http.post(`${this.baseUrl}/categories`, data, this.getHeaders());
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`, this.getHeaders());
  }
  getAllPrompts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ai/all`, this.getHeaders());
  }
}