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
  

  borrowCopy(copy: CopyDetail): void {
    const dialogRef = this.dialog.open(BorrowConfirmationDialogComponent, {
      data: { copy },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.borrowBook(copy);
          this.router.navigate(['/transactions']);
        }
      },
      error: (error) => {
        console.error('Error closing dialog:', error);
      }
    });
  }

  private async borrowBook(copy: any): Promise<void> {
    try {
      const response = await this.bookService.borrowBook(copy);

      if (response) {
        this.books = response.books;
        this.applyPagination();
        this.router.navigate(['/transactions']);
      } else {
        console.error('Failed to borrow the book.');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
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
