import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './services/notification.service';

// Función simple de carga del módulo remote
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Inicio - Banco Digital' }
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('transactions/TransactionsModule')
        .then(m => m.TransactionsModule)
  },
  {
    path: '**',
    component: GlobalErrorComponent,
    data: { title: 'Error del Sistema' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GlobalErrorComponent,
    LayoutComponent,
    HeaderComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
