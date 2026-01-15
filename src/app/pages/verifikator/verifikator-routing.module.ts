import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaftarPeminjamanComponent } from './daftar-peminjaman/daftar-peminjaman.component';
import { DetailPeminjamanComponent } from './detail-peminjaman/detail-peminjaman.component';
import { VerifikasiPeminjamanComponent } from './verifikasi-peminjaman/verifikasi-peminjaman.component';

const routes: Routes = [
  { path: '', component: DaftarPeminjamanComponent },
  { path: 'detail/:id', component: DetailPeminjamanComponent },
  { path: 'verifikasi/:id', component: VerifikasiPeminjamanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifikatorRoutingModule { }
