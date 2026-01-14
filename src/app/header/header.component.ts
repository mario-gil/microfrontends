import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@bank/shared-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  // ← Añadir esto
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = '';
  userBalance: number = 0;
  accountNumber: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
    // DEBUG: Verificar el servicio en el shell
    console.log('UserService en shell:', this.userService);
    console.log('Instancia ID:', (this.userService as any)._id || 'no id');

  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe({
      next: (user) => {
        console.log('Header actualizando...', user.balance);
        this.userName = user.name;
        this.userBalance = user.balance;
        this.accountNumber = user.accountNumber;

        // Forzar la detección de cambios
        this.cdr.detectChanges();  // ← Añadir esto

        // También puedes usar markForCheck
        // this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err)
    });

    // Valor inicial
    const initialUser = this.userService.getUser();
    this.updateUserData(initialUser);
  }

  private updateUserData(user: any): void {
    this.userName = user.name;
    this.userBalance = user.balance;
    this.accountNumber = user.accountNumber;
    this.cdr.markForCheck();  // Marcar para verificación
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatBalance(): string {
    return this.userBalance.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
  }

  formatAccountNumber(): string {
    return this.accountNumber.replace(/(.{4})/g, '$1 ').trim();
  }
}
