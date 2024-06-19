import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../models/transaction.model'; // Import the new Transaction model
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { Copy } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  dataSource: MatTableDataSource<Transaction>;
  transactions: Transaction[];
  displayedColumns: string[] = ['transactionId', 'userId', 'copyId', 'bookId', 'branchId', 'checkoutDate', 'checkinDate', 'lateFee', 'actions'];

  constructor(
    private transactionService: TransactionService,
    private bookService: BookService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Transaction>();
    this.transactions = [];
  }

  ngOnInit() {
    // Fetch transactions from your service
    this.fetchTransactions();
  }
  
  fetchTransactions() {
    console.log('Fetching transactions');
    this.transactionService.getUserTransactions().subscribe(
      (response: any) => {
        console.log('response', response);
        if (Array.isArray(response)) {
          this.transactions = response.map((transaction: any) => ({
            _id: transaction._id,
            user_id: transaction.user_id,
            copy_id: transaction.copy_id,
            book_id: transaction.book_id,
            branch_id: transaction.branch_name,
            checkout_date: new Date(transaction.checkout_date),
            checkin_date: transaction.checkin_date ? new Date(transaction.checkin_date) : null,
            late_fee: transaction.late_fee,
          }));
          this.dataSource.data = this.transactions;
        } else {
          this.transactions = [];
        }
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
  
  returnBook(transaction: Transaction) {
    const confirmation = window.confirm('Do you really want to return this book?');
    if (confirmation) {
      this.bookService.returnBook(transaction).subscribe({
        next: () => {
          this.fetchTransactions(); // Refresh the list
        },
        error: (error) => {
          console.error('Error returning book:', error);
        }
      });
    }
  }
}
