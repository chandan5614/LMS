import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book, Copy, CopyDetail } from '../../models/book.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements AfterViewInit {
  newBook: Omit<Book, '_id'> = {
    title: '',
    author: '',
    isbn: '',
    copies: [{ branchName: '', copiesDetails: [{ copyNumber: 0, status: '' }] }],
  };
  branches: any[] = []; // Array to hold branches

  @ViewChild('addBookForm') addBookForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    private bookService: BookService,
    private branchService: BranchService
  ) {}

  ngAfterViewInit() {
    this.fetchBranches();
  }

  fetchBranches() {
    this.branchService.getBranches().subscribe(
      (response: any) => {
        this.branches = response; // Assuming response is an array of branches
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  addBranch() {
    this.newBook.copies.push({ branchName: '', copiesDetails: [{ copyNumber: 0, status: '' }] });
  }

  addCopyDetail(index: number) {
    this.newBook.copies[index].copiesDetails.push({ copyNumber: 0, status: '' });
  }

  removeCopyDetail(branchIndex: number, copyIndex: number) {
    this.newBook.copies[branchIndex].copiesDetails.splice(copyIndex, 1);
  }

  addBook() {
    if (this.addBookForm && this.addBookForm.valid) {
      this.bookService.addBook(this.newBook).subscribe(
        (addedBook: Book) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding book:', error);
          this.dialogRef.close(false);
        }
      );
    }
  }
}
