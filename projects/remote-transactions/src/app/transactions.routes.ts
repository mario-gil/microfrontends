import { Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionErrorComponent } from './transaction-error/transaction-error.component';

// Exportamos las rutas como constante
export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: 'list',
    component: TransactionListComponent,
    data: { title: 'Listado de Transacciones' }
  },
  {
    path: 'detail',
    component: TransactionDetailComponent,
    data: { title: 'Detalle de Transacción' }
  },
  {
    path: 'detail/:id',
    component: TransactionDetailComponent,
    data: { title: 'Detalle de Transacción' }
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    // IMPORTANTE: Esto captura rutas como /transactions/detail
    path: 'transactions',
    children: [
      {
        path: 'list',
        component: TransactionListComponent
      },
      {
        path: 'detail',
        component: TransactionDetailComponent
      },
      {
        path: 'detail/:id',
        component: TransactionDetailComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: TransactionErrorComponent
      }
    ]
  },
  {
    path: '**',
    component: TransactionErrorComponent,
    data: { title: 'Error en Transacciones' }
  }
];

export const TRANSACTIONS_COMPONENTS = [
  TransactionListComponent,
  TransactionDetailComponent,
  TransactionErrorComponent
];
