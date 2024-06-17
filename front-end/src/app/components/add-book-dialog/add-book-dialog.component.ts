// add-book-dialog.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book, Copy, CopyDetail } from '../../models/book.model';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements AfterViewInit {
  newBook: Book = {
    _id: '',
    title: '',
    author: '',
    isbn: '',
    copies: [{ branchName: '', copiesDetails: [{ copyNumber: 0, status: '' }] }],
  };

  // Use ! to tell TypeScript that addBookForm will be initialized
  @ViewChild('addBookForm') addBookForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    private bookService: BookService
  ) {}

  ngAfterViewInit() {
    // Fetch branches when the form is initialized
    this.fetchBranches();
  }

  fetchBranches() {
    // Call the library service to fetch branches
    this.bookService.getAllLibraries().subscribe(
      (response: any) => {
        this.newBook.copies = response.libraries.map((branch: any) => ({
          branchName: branch.name,
          copiesDetails: [{ copyNumber: 0, status: '' }],
        }));
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  formatIsbn() {
    // Remove existing hyphens and format ISBN with hyphens
    this.newBook.isbn = this.newBook.isbn.replace(/-/g, '');
    if (this.newBook.isbn.length >= 3) {
      this.newBook.isbn =
        this.newBook.isbn.substring(0, 3) +
        '-' +
        this.newBook.isbn.substring(3);
    }
    if (this.newBook.isbn.length >= 6) {
      this.newBook.isbn =
        this.newBook.isbn.substring(0, 6) +
        '-' +
        this.newBook.isbn.substring(6);
    }
    if (this.newBook.isbn.length >= 11) {
      this.newBook.isbn =
        this.newBook.isbn.substring(0, 11) +
        '-' +
        this.newBook.isbn.substring(11);
    }
    // Limit the ISBN length to 13 characters
    this.newBook.isbn = this.newBook.isbn.substring(0, 13);
  }

  addBook() {
    // Check if the form is valid before proceeding
    if (this.addBookForm && this.addBookForm.valid) {
      this.bookService.addBook(this.newBook).subscribe(
        (addedBook: Book) => {
          this.dialogRef.close(true); // Close the dialog with a success signal
        },
        (error) => {
          console.error('Error adding book:', error);
          this.dialogRef.close(false); // Close the dialog with a failure signal
        }
      );
    }
  }
}
