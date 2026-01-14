import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'peminjaman',
    pathMatch: 'full'
  },
  {
    path: 'peminjaman',
    loadChildren: () => import('./pages/peminjaman/peminjaman.module').then(m => m.PeminjamanModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
