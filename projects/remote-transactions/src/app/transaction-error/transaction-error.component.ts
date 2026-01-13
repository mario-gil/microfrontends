import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-error',
  templateUrl: './transaction-error.component.html',
  styleUrls: ['./transaction-error.component.css']
})
export class TransactionErrorComponent implements OnInit {
  currentPath: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener la ruta actual
    this.currentPath = this.router.url;
  }

  goBack(): void {
    this.location.back();
  }

  goToList(): void {
    // Navegar dentro del mismo módulo
    this.router.navigate(['list'], { relativeTo: this.route.root });
  }
}
