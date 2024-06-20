import { Component, OnInit } from "@angular/core";
import { Book, CopyDetail } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AddBookDialogComponent } from "../add-book-dialog/add-book-dialog.component";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  panelOpenState: string | null = null;
  locationFilter: string = "";
  pageIndex: number = 0;
  pageSize: number = 5;
  pagedBooks: Book[] = [];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: "50%",
      height: "75%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBooks(); // Reload books if a new book was added
      }
    });
  }

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
          console.log("No books found.");
        }
      },
      error: (error) => {
        console.error("Error fetching books:", error);
      },
    });
  }

  editBook(book: Book): void {
    // Implement your edit logic here
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.books = this.books.filter((book) => book._id !== bookId);
        this.pagedBooks = this.pagedBooks.filter((book) => book._id !== bookId);
      },
      error: (error) => {
        console.error("Error deleting book:", error);
      },
    });
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
