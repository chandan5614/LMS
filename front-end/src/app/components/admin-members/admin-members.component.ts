import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent {
  members: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.members = response;
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      },
    });
  }
}
