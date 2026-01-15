import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifikatorRoutingModule } from './verifikator-routing.module';
import { DaftarPeminjamanComponent } from './daftar-peminjaman/daftar-peminjaman.component';
import { DetailPeminjamanComponent } from './detail-peminjaman/detail-peminjaman.component';
import { VerifikasiPeminjamanComponent } from './verifikasi-peminjaman/verifikasi-peminjaman.component';

@NgModule({
  declarations: [
    DaftarPeminjamanComponent,
    DetailPeminjamanComponent,
    VerifikasiPeminjamanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    VerifikatorRoutingModule
  ]
})
export class VerifikatorModule { }

