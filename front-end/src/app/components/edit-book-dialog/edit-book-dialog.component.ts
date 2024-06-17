// edit-book-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss'],
})
export class EditBookDialogComponent {
  editedBook: Book;

  constructor(
    public dialogRef: MatDialogRef<EditBookDialogComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.editedBook = { ...data.book };
  }

  saveChanges() {
    this.bookService.updateBook(this.editedBook).subscribe(
      (updatedBook: Book) => {
        this.dialogRef.close(true); // Close the dialog with a success signal
      },
      (error) => {
        console.error('Error updating book:', error);
        this.dialogRef.close(false); // Close the dialog with a failure signal
      }
    );
  }
}
