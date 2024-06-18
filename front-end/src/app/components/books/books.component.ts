import { Component, OnInit } from '@angular/core';
import { Book, CopyDetail } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrowConfirmationDialogComponent } from '../borrow-confirmation-dialog/borrow-confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  panelOpenState: string | null = null;
  locationFilter: string = '';
  pageIndex: number = 0;
  pageSize: number = 5;
  pagedBooks: Book[] = [];

  constructor(private bookService: BookService, public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          this.books = response;
          this.applyPagination();
        } else {
          // No data
          this.books = [];
          console.log('No books found.');
        }
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  editBook(book: Book): void {
    // Implement your edit logic here
  }

  deleteBook(bookId: string): void {
    // Implement your delete logic here
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  applyPagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBooks = this.books.slice(startIndex, endIndex);
  }
}
