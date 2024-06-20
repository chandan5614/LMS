import { Component, OnInit } from "@angular/core";
import { Book, Copy, CopyDetail } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AddBookDialogComponent } from "../add-book-dialog/add-book-dialog.component";
import { AddCopyDialogComponent } from "../add-copy-dialog/add-copy-dialog.component";

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

  openAddCopyDialog(book: Book): void {
    const dialogRef = this.dialog.open(AddCopyDialogComponent, {
      width: "50%",
      height: "50%",
      data: { book: book } // Pass the bookId here
    });

    dialogRef.afterClosed().subscribe((copy) => {
      if (copy) {
        console.log('dialog data', copy);
        this.addCopyToBook(book._id, copy);
      }
    });
  }

  addCopyToBook(bookId: string, copy: any): void {
    this.bookService.addCopyToBook(bookId, copy).subscribe({
      next: (updatedBook: Book) => {
        console.log(copy);
        const index = this.books.findIndex((book) => book._id === bookId);
        if (index !== -1) {
          console.log('updatedBook', updatedBook);
          this.books[index] = updatedBook;
          this.loadBooks();
        }
      },
      error: (error) => {
        console.error("Error adding copy to book:", error);
      },
    });
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
