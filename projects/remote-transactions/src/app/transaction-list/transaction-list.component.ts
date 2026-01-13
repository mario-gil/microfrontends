import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [
    {
      id: 1,
      date: new Date('2024-01-15'),
      description: 'Transferencia a Juan Pérez',
      amount: -150.00,
      status: 'completed'
    },
    {
      id: 2,
      date: new Date('2024-01-14'),
      description: 'Depósito nómina',
      amount: 2500.00,
      status: 'completed'
    },
    {
      id: 3,
      date: new Date('2024-01-13'),
      description: 'Compra Amazon',
      amount: -89.99,
      status: 'pending'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetail(id: number): void {
    this.router.navigate(['/transactions/detail'], {
      queryParams: { id }
    });
  }
}
