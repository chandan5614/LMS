import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book, Copy, CopyDetail } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

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

  borrowCopy(copyDetail: CopyDetail, copy: Copy, bookId: string): void {
    const confirmation = window.confirm('Do you really want to borrow this copy?');
    const userDataString = localStorage.getItem('userData');
    let userId: string | undefined;
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      userId = userData.userId;
    }
  
    if (confirmation && userId) {
      const transaction = {
        user_id: userId,
        book_id: bookId,
        copy_id: copyDetail.copyNumber,
        branch_id: copy.branchName // Assuming branchName is the branch_id
      };
  
      this.bookService.borrowBook(transaction).subscribe({
        next: () => {
          this.loadBooks(); // Refresh the list
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          console.error('Error borrowing book:', error);
        }
      });
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
