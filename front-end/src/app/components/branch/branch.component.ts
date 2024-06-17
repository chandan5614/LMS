// branch.component.ts
import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  branches: any[] = [];
  newBranch: any = { name: '', location: '' };
  isEditMode: boolean[] = [];
  displayedColumns: string[] = ['name', 'location', 'actions'];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        this.isEditMode = new Array(data.length).fill(false);
      },
      error: (error) => console.error('Error loading branches:', error)
    });
  }

  enableEditMode(index: number): void {
    this.isEditMode[index] = true;
  }

  saveBranch(branch: any): void {
    this.branchService.updateBranch(branch._id, branch).subscribe({
      next: () => this.loadBranches(),
      error: (error) => console.error('Error updating branch:', error)
    });
    this.isEditMode.fill(false);
  }

  addBranch(): void {
    this.branchService.addBranch(this.newBranch).subscribe({
      next: () => {
        this.loadBranches();
        this.newBranch = { name: '', location: '' };
      },
      error: (error) => console.error('Error adding branch:', error)
    });
  }

  deleteBranch(branchId: string): void {
    this.branchService.deleteBranch(branchId).subscribe({
      next: () => this.loadBranches(),
      error: (error) => console.error('Error deleting branch:', error)
    });
  }
}
