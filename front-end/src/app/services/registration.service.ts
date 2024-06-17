import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    const url = `${this.apiUrl}/users/register`;
    return this.http.post(url, user);
  }
}
