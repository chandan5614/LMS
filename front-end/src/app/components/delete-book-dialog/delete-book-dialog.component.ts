// delete-book-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-delete-book-dialog',
  templateUrl: './delete-book-dialog.component.html',
  styleUrls: ['./delete-book-dialog.component.scss'],
})
export class DeleteBookDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteBookDialogComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {}

  deleteBook() {
    this.bookService.deleteBook(this.data.book._id).subscribe(
      () => {
        this.dialogRef.close(true); // Close the dialog with a success signal
      },
      (error) => {
        console.error('Error deleting book:', error);
        this.dialogRef.close(false); // Close the dialog with a failure signal
      }
    );
  }
}
