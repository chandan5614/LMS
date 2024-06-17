import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  Roles: any = ["Admin", "Member"];
  
  constructor(private registrationService: RegistrationService, private router: Router) {}

  registerUser(registrationForm: NgForm): void {
    console.log('registrationForm.value', registrationForm.value);
    if (registrationForm.valid) {
      const { first_name, last_name, dob, email, password, confirmPassword, role } = registrationForm.value;

      if (password !== confirmPassword) {
        registrationForm.controls.confirmPassword.setErrors({ passwordMismatch: true });
        return;
      }

      const registrationData = { first_name, last_name, dob, email, password, role };


      this.registrationService.register(registrationData).subscribe(
        response => {
          console.log('Registration successful:', response);
          // Handle successful registration, e.g., navigate to login page
          this.router.navigate(['/login'])
        },
        error => {
          console.error('Registration failed:', error);
          // Handle registration error
        }
      );
    }
  }
}
