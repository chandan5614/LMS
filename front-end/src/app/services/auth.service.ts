import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedValue: boolean = false;

  constructor(private router: Router) {}

  login() {
    // Implement your login logic here
    this.isAuthenticatedValue = true;
  }

  logout() {
    // Clear local storage
    localStorage.removeItem('userData');

    // Toggle the isAuthenticated flag
    this.isAuthenticatedValue = false;

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}
