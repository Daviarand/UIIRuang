import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Peminjaman {
  id: number;
  namaAcara: string;
  namaRuang: string;
  waktuAcara: string;
  waktuDetail: string; // e.g. "01 Maret 2024 13.00-14.00"
  statusPengajuan: 'Diajukan' | 'Disetujui' | 'Ditolak';
  statusBayar?: 'Belum bayar' | 'Sudah bayar' | 'Menunggu Konfirmasi' | 'Tidak berbayar';
}

@Component({
  selector: 'app-kelola-peminjaman',
  templateUrl: './kelola-peminjaman.component.html',
  styleUrls: ['./kelola-peminjaman.component.scss']
})
export class KelolaPeminjamanComponent {
  // Current Filter
  selectedStatusBayar: string = 'Semua';
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Dummy Data
  borrowingList: Peminjaman[] = [
    {
      id: 1,
      namaAcara: 'Sprint Review & Planning',
      namaRuang: 'R. Sidang Utara',
      waktuAcara: '01 Maret 2024',
      waktuDetail: '01 Maret 2024 13.00-14.00\n08 Maret 2024 13.00-15.00',
      statusPengajuan: 'Diajukan'
    },
    {
      id: 2,
      namaAcara: 'Milad Informatika',
      namaRuang: 'Erasmus',
      waktuAcara: '25 Februari 2024',
      waktuDetail: '25 Februari 2024 09.00-12.00',
      statusPengajuan: 'Diajukan'
    },
    {
      id: 3,
      namaAcara: 'Upgrading HMIF',
      namaRuang: 'R. Audiovisual',
      waktuAcara: '25 Februari 2024',
      waktuDetail: '25 Februari 2024 08.00-16.00',
      statusPengajuan: 'Ditolak'
    },
    {
      id: 4,
      namaAcara: 'PORSEMATIK',
      namaRuang: 'R. Audiovisual',
      waktuAcara: '30 Januari 2024',
      waktuDetail: '30 Januari 2024 08.00-12.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Belum bayar'
    },
    {
      id: 5,
      namaAcara: 'Electro Week',
      namaRuang: 'R. Audiovisual',
      waktuAcara: '25 Januari 2024',
      waktuDetail: '25 Januari 2024 08.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Tidak berbayar'
    },
    {
      id: 6,
      namaAcara: 'Rapat Keuangan',
      namaRuang: 'Erasmus',
      waktuAcara: '25 Januari 2024',
      waktuDetail: '25 Januari 2024 13.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Menunggu Konfirmasi'
    },
    {
      id: 7,
      namaAcara: 'Pleno LEM FTI UII',
      namaRuang: 'Erasmus',
      waktuAcara: '26 Januari 2024',
      waktuDetail: '26 Januari 2024 08.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 8,
      namaAcara: 'Senat Mahasiswa',
      namaRuang: 'R. Sidang VIP',
      waktuAcara: '26 Januari 2024',
      waktuDetail: '26 Januari 2024 13.00-16.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 9,
      namaAcara: 'Rapat Marching Band',
      namaRuang: 'R. Sidang VIP',
      waktuAcara: '31 Januari 2024',
      waktuDetail: '31 Januari 2024 08.00-12.00',
      statusPengajuan: 'Disetujui',
      statusBayar: 'Sudah bayar'
    },
    {
      id: 10,
      namaAcara: 'Praktikum',
      namaRuang: 'R. Sidang GKU',
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

  // Counts for Filter Tabs
  get countTidakBerbayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Tidak berbayar').length; }
  get countMenungguKonfirmasi(): number { return this.borrowingList.filter(b => b.statusBayar === 'Menunggu Konfirmasi').length; }
  get countBelumBayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Belum bayar').length; }
  get countSudahBayar(): number { return this.borrowingList.filter(b => b.statusBayar === 'Sudah bayar').length; }

  get filteredData(): Peminjaman[] {
    let data = this.borrowingList;

    // Search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      data = data.filter(item =>
        item.namaAcara.toLowerCase().includes(query) ||
        item.namaRuang.toLowerCase().includes(query)
      );
    }

    // Filter Status Bayar (Optional - User didn't specify behavior but UI implies filtering)
    // If "Semua" is selected or tabs interact
    if (this.selectedStatusBayar !== 'Semua') {
      data = data.filter(item => item.statusBayar === this.selectedStatusBayar);
    }

    return data;
  }

  setStatusBayarFilter(status: string): void {
    // Toggle if needed, or simple selection.
    // If clicking same tab, maybe clear filter? Assuming selection mode.
    this.selectedStatusBayar = this.selectedStatusBayar === status ? 'Semua' : status;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onEdit(id: number): void {
    // Navigate relative to currently active route -> /kelola-peminjaman/edit/:id
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  // Cancel Modal State
  showCancelModal: boolean = false;
  cancelItemId: number | null = null;
  cancelItemName: string = '';

  // Open cancel confirmation modal
  openCancelModal(item: Peminjaman): void {
    this.cancelItemId = item.id;
    this.cancelItemName = item.namaAcara;
    this.showCancelModal = true;
  }

  // Close cancel modal
  closeCancelModal(): void {
    this.showCancelModal = false;
    this.cancelItemId = null;
    this.cancelItemName = '';
  }

  // Confirm cancel action
  confirmCancel(): void {
    if (this.cancelItemId !== null) {
      // Remove item from list (simulate cancel)
      this.borrowingList = this.borrowingList.filter(item => item.id !== this.cancelItemId);
      console.log('Cancelled booking ID:', this.cancelItemId);
      // Could show success notification here
    }
    this.closeCancelModal();
  }
}
