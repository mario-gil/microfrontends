import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  currentSection: string = '';
  showBreadcrumbs: boolean = true;
  isLoadingRemote: boolean = false;

  constructor(private router: Router) {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateBreadcrumbs(event.url);
        this.checkRemoteLoading(event.url);
      });
  }

  private updateBreadcrumbs(url: string): void {
    if (url === '/') {
      this.currentSection = '';
      this.showBreadcrumbs = false;
    } else if (url.startsWith('/transactions')) {
      this.currentSection = 'Transacciones';
      this.showBreadcrumbs = true;
    } else {
      this.currentSection = '';
      this.showBreadcrumbs = true;
    }
  }

  private checkRemoteLoading(url: string): void {
    this.isLoadingRemote = url.startsWith('/transactions');

    // Simular tiempo de carga y luego ocultar
    if (this.isLoadingRemote) {
      setTimeout(() => {
        this.isLoadingRemote = false;
      }, 1000); // Ajustar según necesidad real
    }
  }
}
