import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/peminjaman',
    pathMatch: 'full'
  },
  // Keep peminjaman path for explicit navigation if needed
  {
    path: 'peminjaman',
    loadChildren: () => import('./pages/peminjaman/peminjaman.module').then(m => m.PeminjamanModule)
  },
  {
    path: 'kelola-peminjaman',
    loadChildren: () => import('./pages/kelola-peminjaman/kelola-peminjaman.module').then(m => m.KelolaPeminjamanModule)
  },
  {
    path: 'verifikator',
    loadChildren: () => import('./pages/verifikator/verifikator.module').then(m => m.VerifikatorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
