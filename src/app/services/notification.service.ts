import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  private nextId = 1;

  show(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.nextId++,
      timestamp: new Date()
    };

    const current = this.notifications.value;
    this.notifications.next([...current, newNotification]);

    // Auto-remove si tiene duración
    if (notification.duration) {
      setTimeout(() => {
        this.remove(newNotification.id);
      }, notification.duration);
    }
  }

  remove(id: number): void {
    const current = this.notifications.value.filter(n => n.id !== id);
    this.notifications.next(current);
  }

  clear(): void {
    this.notifications.next([]);
  }
}
