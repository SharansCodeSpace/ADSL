import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Import standalone components
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login.component';
import { DashboardComponent } from './app/components/dashboard.component';
import { QuestionBankComponent } from './app/components/question-bank.component';
import { TestCreationComponent } from './app/components/test-creation.component';
import { TestAdministrationComponent } from './app/components/test-administration.component';
import { ReportComponent } from './app/components/report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'question-bank', component: QuestionBankComponent },
  { path: 'test-creation', component: TestCreationComponent },
  { path: 'test-administration', component: TestAdministrationComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
