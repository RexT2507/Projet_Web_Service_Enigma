import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExempleComponent } from './components/exemple/exemple.component';

import { AuthGuard } from './services/auth.guard';
import { DecoderComponent } from './components/decoder/decoder.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'exemple',
    canActivate: [AuthGuard],
    component: ExempleComponent
  },
  {
    path: 'decoder',
    canActivate: [AuthGuard],
    component: DecoderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
