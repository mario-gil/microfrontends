import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionErrorComponent } from './transaction-error/transaction-error.component';
import { TRANSACTIONS_ROUTES } from './transactions.routes';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionDetailComponent,
    TransactionErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTIONS_ROUTES)
  ],
  exports: [
    RouterModule,
    TransactionListComponent,
    TransactionDetailComponent,
    TransactionErrorComponent
  ]
})
export class TransactionsModule { }
