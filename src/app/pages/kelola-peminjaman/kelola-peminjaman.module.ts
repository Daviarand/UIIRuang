import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { KelolaPeminjamanRoutingModule } from './kelola-peminjaman-routing.module';
import { KelolaPeminjamanComponent } from './kelola-peminjaman.component';
import { PeminjamanModule } from '../peminjaman/peminjaman.module';
import { DetailPeminjamanComponent } from './detail-peminjaman/detail-peminjaman.component';
import { PembayaranPeminjamanComponent } from './pembayaran-peminjaman/pembayaran-peminjaman.component'; // Import PeminjamanModule

@NgModule({
  declarations: [
    KelolaPeminjamanComponent,
    DetailPeminjamanComponent,
    PembayaranPeminjamanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KelolaPeminjamanRoutingModule,
    PeminjamanModule // Add to imports
  ]
})
export class KelolaPeminjamanModule { }
