import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../models/transaction.model'; // Import the new Transaction model
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrowConfirmationDialogComponent } from '../borrow-confirmation-dialog/borrow-confirmation-dialog.component';
import { Copy } from 'src/app/models/book.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  dataSource: MatTableDataSource<Transaction>;
  transactions: Transaction[];

  constructor(
    private transactionService: TransactionService,
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
            branch_id: transaction.branch_id,
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
}
