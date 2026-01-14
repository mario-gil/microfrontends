import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/transaction.interface';

// Clave única para identificar eventos
const SERVICE_EVENTS = {
  BALANCE_UPDATED: 'BANK_USER_BALANCE_UPDATED',
  USER_UPDATED: 'BANK_USER_UPDATED'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // PRIMERO declaramos la propiedad sin inicializar
  private userSubject: BehaviorSubject<User>;

  // Luego declaramos las propiedades públicas que dependen de userSubject
  user$: Observable<User>;
  currentUser: User;

  constructor() {
    // Crear usuario inicial
    const initialUser: User = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      balance: 2500.00,
      accountNumber: 'ES12 3456 7890 1234 5678'
    };

    // AHORA inicializamos userSubject
    this.userSubject = new BehaviorSubject<User>(initialUser);

    // Inicializamos las propiedades que dependen de userSubject
    this.user$ = this.userSubject.asObservable();
    this.currentUser = initialUser;

    // Configurar comunicación global
    this.setupGlobalCommunication();
  }

  private setupGlobalCommunication(): void {
    if (typeof window !== 'undefined') {
      console.log('Configurando comunicación global para UserService');

      // 1. Escuchar eventos GLOBALES de otras instancias del servicio
      window.addEventListener(SERVICE_EVENTS.BALANCE_UPDATED, (event: any) => {
        console.log('Recibido evento global de balance:', event.detail);
        this.updateBalanceInternal(event.detail.amount, false);
      });

      window.addEventListener(SERVICE_EVENTS.USER_UPDATED, (event: any) => {
        console.log('Recibido evento global de usuario:', event.detail);
        this.userSubject.next(event.detail);
        this.currentUser = event.detail;
      });

      // 2. Exponer métodos globales
      (window as any).__bankUserService = {
        updateBalance: (amount: number) => this.updateBalance(amount),
        getCurrentBalance: () => this.getUser().balance,
        getUser: () => this.getUser(),
        forceUpdate: (user: User) => {
          this.userSubject.next(user);
          this.currentUser = user;
        }
      };

      console.log('Servicio global expuesto en window.__bankUserService');
    }
  }

  updateBalance(amount: number): void {
    console.log('UserService.updateBalance llamado con:', amount);

    // Actualizar localmente
    this.updateBalanceInternal(amount, true);

    // Emitir evento GLOBAL para otras instancias
    if (typeof window !== 'undefined') {
      const event = new CustomEvent(SERVICE_EVENTS.BALANCE_UPDATED, {
        detail: { amount }
      });
      window.dispatchEvent(event);
      console.log('Evento global BANK_USER_BALANCE_UPDATED emitido');
    }
  }

  private updateBalanceInternal(amount: number, emitGlobalEvent: boolean = true): void {
    const user = this.currentUser;
    const newBalance = user.balance + amount;

    // Validar que no quede saldo negativo
    const updatedUser = {
      ...user,
      balance: newBalance < 0 ? 0 : newBalance
    };

    this.userSubject.next(updatedUser);
    this.currentUser = updatedUser;

    console.log('Saldo actualizado internamente:', updatedUser.balance);

    // Emitir evento de usuario actualizado si es necesario
    if (emitGlobalEvent && typeof window !== 'undefined') {
      const event = new CustomEvent(SERVICE_EVENTS.USER_UPDATED, {
        detail: updatedUser
      });
      window.dispatchEvent(event);
    }
  }

  getUser(): User {
    return this.currentUser;
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    this.currentUser = user;

    // Emitir evento global
    if (typeof window !== 'undefined') {
      const event = new CustomEvent(SERVICE_EVENTS.USER_UPDATED, {
        detail: user
      });
      window.dispatchEvent(event);
    }
  }

  // Método para debug
  logState(): void {
    console.log('=== UserService State ===');
    console.log('Current user:', this.currentUser);
    console.log('Observers:', (this.userSubject as any)._observers?.length || 0);
    console.log('Window service:', (window as any).__bankUserService ? 'Presente' : 'Ausente');
  }
}
