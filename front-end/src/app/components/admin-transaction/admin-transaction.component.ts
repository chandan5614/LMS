import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.scss']
})
export class AdminTransactionComponent {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
