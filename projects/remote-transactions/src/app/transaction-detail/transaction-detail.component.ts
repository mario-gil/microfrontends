import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
  recipient?: string;
  account?: string;
}

interface TransferEventData {
  amount: number;
  description: string;
  recipient: string;
  transactionId: number;
  timestamp: Date;
}

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  standalone: false  // Componente tradicional (no standalone)
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | null = null;
  transactionId: string | null = null;

  // Datos de ejemplo para transacciones
  private transactionsData: Transaction[] = [
    {
      id: 1,
      date: new Date('2024-01-15T10:30:00'),
      description: 'Transferencia a Juan Pérez',
      amount: -150.00,
      status: 'completed',
      category: 'Transferencia',
      recipient: 'Juan Pérez',
      account: 'ES12 3456 7890 1234 5678'
    },
    {
      id: 2,
      date: new Date('2024-01-14T09:15:00'),
      description: 'Depósito de nómina',
      amount: 2500.00,
      status: 'completed',
      category: 'Ingreso',
      recipient: 'Empresa S.A.',
      account: 'Nómina'
    },
    {
      id: 3,
      date: new Date('2024-01-13T14:20:00'),
      description: 'Compra en Amazon',
      amount: -89.99,
      status: 'pending',
      category: 'Compras online',
      recipient: 'Amazon EU Sarl',
      account: 'VISA **** 1234'
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la ruta
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.transactionId = params['id'];
        this.loadTransaction(parseInt(params['id'], 10));
      } else {
        // Si no hay ID, cargar una transacción por defecto o la primera
        this.loadTransaction(1);
      }
    });

    // También podemos obtener query parameters
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['id']) {
        this.transactionId = queryParams['id'];
        this.loadTransaction(parseInt(queryParams['id'], 10));
      }
    });
  }

  private loadTransaction(id: number): void {
    // Buscar la transacción por ID
    const foundTransaction = this.transactionsData.find(t => t.id === id);

    if (foundTransaction) {
      this.transaction = foundTransaction;
    } else {
      // Si no se encuentra, usar una por defecto
      this.transaction = {
        id: id,
        date: new Date(),
        description: 'Transacción no encontrada',
        amount: 0,
        status: 'failed',
        category: 'Desconocida',
        recipient: 'No disponible',
        account: 'No disponible'
      };
    }
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return 'status-unknown';
    }
  }

  getAmountClass(amount: number): string {
    if (amount > 0) return 'amount-positive';
    if (amount < 0) return 'amount-negative';
    return 'amount-zero';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack(): void {
    this.router.navigate(['/transactions/list']);
  }

   confirmTransfer(): void {
    if (!this.transaction) return;

    // Crear datos del evento
    const transferData: TransferEventData = {
      amount: Math.abs(this.transaction.amount), // Valor absoluto
      description: this.transaction.description,
      recipient: this.transaction.recipient || 'Desconocido',
      transactionId: this.transaction.id,
      timestamp: new Date()
    };

    // Emitir Custom Event al navegador
    const transferEvent = new CustomEvent('bank-transfer-confirmed', {
      detail: transferData,
      bubbles: true,
      cancelable: true
    });

    // Dispatch en window
    window.dispatchEvent(transferEvent);

    console.log('Evento emitido:', transferData);

  }

}
