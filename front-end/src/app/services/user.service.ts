// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any>(url);
  }

  getUserDetails(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }
}
