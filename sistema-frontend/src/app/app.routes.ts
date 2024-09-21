import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { WorkSpacesComponent } from './dashboard/work-spaces/work-spaces.component';
import { SaveWorkSpaceComponent } from './dashboard/work-spaces/save/save.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { SaveTaskComponent } from './dashboard/tasks/save/save.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { AccountComponent } from './dashboard/account/account.component';

import { HomeGuard } from './guards/home.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/ingreso', pathMatch: 'full' },
  { path: 'ingreso', component: LoginComponent, canActivate: [HomeGuard] },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'espacios', component: WorkSpacesComponent },
      { path: 'espacios/nuevo', component: SaveWorkSpaceComponent },
      { path: 'espacios/:id_espacio/editar', component: SaveWorkSpaceComponent },
      { path: 'espacios/:id_espacio/tareas', component: TasksComponent },
      { path: 'espacios/:id_espacio/tareas/nuevo', component: SaveTaskComponent },
      { path: 'espacios/:id_espacio/tareas/:id_tarea/editar', component: SaveTaskComponent },
      { path: 'calendario', component: CalendarComponent },
      { path: 'cuenta', component: AccountComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }