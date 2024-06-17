// login.service.ts
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8080';

  private snackbarService: SnackbarService; // Declare SnackbarService

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private injector: Injector
  ) {
    // Use Injector to get SnackbarService
    this.snackbarService = this.injector.get(SnackbarService);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/users/login`;

    return this.http.post(url, credentials).pipe(
      map((response: any) => {
        // Store the token or user information in AuthService
        this.authService.login();
        // You can also store user information if needed: this.authService.setUser(response.user);
        return response;
      }),
      catchError((error) => {
        // Handle API errors using the manually injected SnackbarService
        this.snackbarService.showError('Login failed. Please check your credentials and try again.');
        return throwError(error);
      })
    );
  }
}
