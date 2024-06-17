// global-header.component.ts

import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent {
  @Input() pageTitle: string = '';
  @Input() showBackButton: boolean = true;

  constructor(private router: Router) {}

  goBack(): void {
    const userDataString: string | null = localStorage.getItem('userData');

    if (userDataString === null) {
      // Handle the case when userDataString is null (user data not found)
      console.error('User data not found in localStorage');
      // Depending on your requirement, you can return an empty observable or handle appropriately
      return;
    }

    const userData = JSON.parse(userDataString);
    const role = userData.role;

    if (!role) {
      // Handle the case when the role is not available
      console.error('Role not found in user data');
      // Depending on your requirement, you can return an empty observable or handle appropriately
      return;
    }

    const dashboardRoute = `/${role}-dashboard`;
    this.router.navigate([dashboardRoute]);
  }
}
