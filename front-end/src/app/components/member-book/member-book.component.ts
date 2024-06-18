import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book, CopyDetail } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { BorrowConfirmationDialogComponent } from '../borrow-confirmation-dialog/borrow-confirmation-dialog.component';

@Component({
  selector: 'app-member-book',
  templateUrl: './member-book.component.html',
  styleUrls: ['./member-book.component.scss']
})
export class MemberBookComponent {
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
    this.bookService.getAllAvailableBooks().subscribe({
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
