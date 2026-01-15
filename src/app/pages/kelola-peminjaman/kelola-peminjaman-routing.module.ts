import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KelolaPeminjamanComponent } from './kelola-peminjaman.component';
import { DetailPeminjamanComponent } from './detail-peminjaman/detail-peminjaman.component';
import { PembayaranPeminjamanComponent } from './pembayaran-peminjaman/pembayaran-peminjaman.component';
import { FormPeminjamanComponent } from '../peminjaman/form-peminjaman/form-peminjaman.component';

const routes: Routes = [
  { path: '', component: KelolaPeminjamanComponent },
  { path: 'detail/:id', component: DetailPeminjamanComponent },
  { path: 'pembayaran/:id', component: PembayaranPeminjamanComponent },
  { path: 'edit/:bookingId', component: FormPeminjamanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KelolaPeminjamanRoutingModule { }
