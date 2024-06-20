import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BookService } from "../../services/book.service";
import { BranchService } from "../../services/branch.service";
import { NgForm } from "@angular/forms";
import { Book } from "../../models/book.model";

@Component({
  selector: "app-add-copy-dialog",
  templateUrl: "./add-copy-dialog.component.html",
  styleUrls: ["./add-copy-dialog.component.scss"],
})
export class AddCopyDialogComponent implements OnInit {
  copy: any = {
    branchName: '',
    copyDetail: {
      copyNumber: '',
      status: 'Available'
    }
  };

  branches: any[] = [];

  @ViewChild('addBookForm') addBookForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<AddCopyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.fetchBranches();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.copy);
  }

  fetchBranches(): void {
    this.branchService.getBranches().subscribe(
      (response: any) => {
        this.branches = response; // Assuming response is an array of branches
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }
}
