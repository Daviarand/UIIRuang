import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DaftarGedungComponent } from './daftar-gedung/daftar-gedung.component';
import { JadwalRuangComponent } from './jadwal-ruang/jadwal-ruang.component';
import { FormPeminjamanComponent } from './form-peminjaman/form-peminjaman.component';

const routes: Routes = [
    { path: '', component: DaftarGedungComponent },
    { path: 'jadwal/:gedungId', component: JadwalRuangComponent },
    { path: 'form/:roomId/:timeSlot', component: FormPeminjamanComponent }
];

@NgModule({
    declarations: [
        DaftarGedungComponent,
        JadwalRuangComponent,
        FormPeminjamanComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class PeminjamanModule { }
