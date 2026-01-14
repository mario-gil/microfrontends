import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bank-shell';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Escuchar eventos del navegador
    window.addEventListener('bank-transfer-confirmed', this.handleTransferEvent.bind(this));
  }

  ngOnDestroy(): void {
    // Limpiar event listener
    window.removeEventListener('bank-transfer-confirmed', this.handleTransferEvent.bind(this));
  }

  private handleTransferEvent(event: Event): void {
    const customEvent = event as CustomEvent;
    const transferData = customEvent.detail;

    console.log('Shell recibió evento:', transferData);

    // Mostrar notificación en el shell
    this.notificationService.show({
      type: 'success',
      title: 'Transferencia Confirmada',
      message: `Se ha transferido ${transferData.amount.toFixed(2)}€ a ${transferData.recipient}`,
      duration: 5000
    });
  }
}
