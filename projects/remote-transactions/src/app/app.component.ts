import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'remote-transactions';
  isStandaloneMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar si estamos en modo standalone (accediendo directamente al remote)
    // Esto es útil para desarrollo/debug
    this.isStandaloneMode = window.location.port === '4201';

    // Si estamos en modo standalone y en la raíz, redirigir a /list
    if (this.isStandaloneMode && this.router.url === '/') {
      this.router.navigate(['/list']);
    }
  }
}
