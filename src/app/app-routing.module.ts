import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
