import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  Roles: any = ["Admin", "Member"];

  // Define route paths for each role
  roleRoutes: any = {
    admin: "/admin-dashboard",
    member: "/member-dashboard",
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login(userLoginForm: NgForm): void {
    if (userLoginForm.valid) {
      const { email, password, role } = userLoginForm.value;
      const credentials = {
        email,
        password,
        role,
      };

      this.loginService.login(credentials).subscribe(
        (response) => {
          console.log("Login successful:", response);

          const userData = {
            userId: response.userId,
            role: response.role.toString().toLowerCase(),
          };

          // Save user data in local storage
          localStorage.setItem("userData", JSON.stringify(userData));

          const routePath = this.roleRoutes[response.role.toLowerCase()];

          // Navigate to the appropriate dashboard component based on the role
          this.router.navigate([routePath]).then(() => {
            console.log("Current route:", this.router.url);
          });
        },
        (error) => {
          console.error("Login failed:", error);
        }
      );
    }
  }
}
