import { Component } from '@angular/core';

interface Peminjaman {
  id: number;
  namaRuang: string;
  namaAcara: string;
  waktuAcara: string;
  waktuDetail: string;
  statusPengajuan: 'Diajukan' | 'Disetujui' | 'Ditolak';
  statusBayar?: 'Belum bayar' | 'Sudah bayar' | 'Menunggu Konfirmasi' | 'Tidak berbayar';
}

@Component({
  selector: 'app-daftar-peminjaman',
  templateUrl: './daftar-peminjaman.component.html',
  styleUrls: ['./daftar-peminjaman.component.scss']
})
export class DaftarPeminjamanComponent {
  selectedStatusBayar: string = 'Semua';
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Dummy data - similar to kelola-peminjaman
  borrowingList: Peminjaman[] = [
    {
      id: 1,
      namaRuang: 'R. Sidang Utara',
      namaAcara: 'Techtalk BSI',
      waktuAcara: '01 Maret 2024',
      waktuDetail: '01 Maret 2024 13.00-14.00\n08 Maret 2024 13.00-15.00',
      statusPengajuan: 'Diajukan'
    },
    {
      id: 2,
      namaRuang: 'Erasmus',
      namaAcara: 'Milad Informatika',
      waktuAcara: '25 Februari 2024',
      waktuDetail: '25 Februari 2024 09.00-12.00',
      statusPengajuan: 'Diajukan'
    },
    {
      id: 3,
      namaRuang: 'R. Audiovisual',
      namaAcara: 'Upgrading HMIF',
      waktuAcara: '25 Februari 2024',
      waktuDetail: '25 Februari 2024 08.00-16.00',
      statusPengajuan: 'Ditolak'
    },
    {
      id: 4,
      namaRuang: 'R. Audiovisual',
      namaAcara: 'PORSEMATIK',
      waktuAcara: '30 Januari 2024',
      waktuDetail: '30 Januari 2024 08.00-12.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Menunggu Konfirmasi'
    },
    {
      id: 5,
      namaRuang: 'R. Audiovisual',
      namaAcara: 'Electro Week',
      waktuAcara: '25 Januari 2024',
      waktuDetail: '25 Januari 2024 08.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Tidak berbayar'
    },
    {
      id: 6,
      namaRuang: 'Erasmus',
      namaAcara: 'Rapat Keuangan',
      waktuAcara: '25 Januari 2024',
      waktuDetail: '25 Januari 2024 13.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Menunggu Konfirmasi'
    },
    {
      id: 7,
      namaRuang: 'Erasmus',
      namaAcara: 'Pleno LEM FTI UII',
      waktuAcara: '26 Januari 2024',
      waktuDetail: '26 Januari 2024 08.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 8,
      namaRuang: 'R. Sidang VIP',
      namaAcara: 'Senat Mahasiswa',
      waktuAcara: '26 Januari 2024',
      waktuDetail: '26 Januari 2024 13.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 9,
      namaRuang: 'R. Sidang VIP',
      namaAcara: 'Rapat Marching Band',
      waktuAcara: '31 Januari 2024',
      waktuDetail: '31 Januari 2024 08.00-12.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 10,
      namaRuang: 'R. Sidang GKU',
      namaAcara: 'Praktikum',
      waktuAcara: '26 Januari 2024',
      waktuDetail: '26 Januari 2024 08.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    }
  ];

  // Stats
  get totalPengajuan(): number { return this.borrowingList.length; }
  get countDiajukan(): number { return this.borrowingList.filter(b => b.statusPengajuan === 'Diajukan').length; }
  get countDisetujui(): number { return this.borrowingList.filter(b => b.statusPengajuan === 'Disetujui').length; }
  get countDitolak(): number { return this.borrowingList.filter(b => b.statusPengajuan === 'Ditolak').length; }

  // Status Bayar Counts
  get countTidakBerbayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Tidak berbayar').length; }
  get countMenungguKonfirmasi(): number { return this.borrowingList.filter(b => b.statusBayar === 'Menunggu Konfirmasi').length; }
  get countBelumBayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Belum bayar').length; }
  get countSudahBayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Sudah bayar').length; }

  get filteredData(): Peminjaman[] {
    let data = this.borrowingList;

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      data = data.filter(item =>
        item.namaAcara.toLowerCase().includes(query) ||
        item.namaRuang.toLowerCase().includes(query)
      );
    }

    if (this.selectedStatusBayar !== 'Semua') {
      data = data.filter(item => item.statusBayar === this.selectedStatusBayar);
    }

    return data;
  }

  setStatusBayarFilter(status: string): void {
    this.selectedStatusBayar = this.selectedStatusBayar === status ? 'Semua' : status;
  }
}
