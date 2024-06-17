// user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: any; // Adjust the type based on your API response structure

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve userId from local storage
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.userId;

      if (userId) {
        this.userService.getUserDetails(userId).subscribe(
          (data) => {
            console.log('data', data);
            this.userProfile = data;
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
      } else {
        console.error('User ID not found in local storage');
      }
    } else {
      console.error('User data not found in local storage');
    }
  }
}
