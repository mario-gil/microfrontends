import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent implements OnInit {
  invalidPath: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener la ruta que causó el error
    this.invalidPath = this.router.url;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  goBack(): void {
    window.history.back();
  }
}
