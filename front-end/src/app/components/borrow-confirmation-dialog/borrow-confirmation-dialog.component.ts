import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Copy } from 'src/app/models/book.model';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-borrow-confirmation-dialog',
  templateUrl: './borrow-confirmation-dialog.component.html',
})
export class BorrowConfirmationDialogComponent {
  onConfirmBorrow: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<BorrowConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { copy: Copy },
    private router: Router
  ) {}

  onConfirm(): void {
    console.log('Confirm button clicked');
    this.dialogRef.close('confirm');
    // Emit the event when the user confirms borrowing
    this.onConfirmBorrow.emit();
  }
  

  onCancel(): void {
    this.dialogRef.close('cancel');
    this.router.navigate(['/books']);
  }
}
