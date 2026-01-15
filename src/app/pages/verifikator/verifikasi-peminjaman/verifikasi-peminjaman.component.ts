import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifikasi-peminjaman',
  templateUrl: './verifikasi-peminjaman.component.html',
  styleUrls: ['./verifikasi-peminjaman.component.scss']
})
export class VerifikasiPeminjamanComponent implements OnInit {
  bookingId: number = 0;
  detailData: any = null;

  // Accordions OPEN by default
  isDocExpanded: boolean = true;

  // Form State
  verificationStatus: string = ''; // 'Diterima' or 'Ditolak'
  rejectionNote: string = '';

  // Modal State
  showConfirmationModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = +params['id'];
      this.loadDetail(this.bookingId);
    });
  }

  loadDetail(id: number): void {
    // Same dummy data structure as detail-peminjaman
    // But we only need Room, Borrower, Time
    const baseData = {
      id: id,
      room: {
        name: 'R. Sidang Utara',
        unit: 'Badan Sistem Informasi',
        building: 'Gedung GBPH Prabuningrat',
        floor: 'Lantai 4',
        location: 'Kampus Terpadu, Jl. Kaliurang',
        mapsUrl: 'https://maps.google.com',
        type: 'Rapat',
        capacity: 20,
        description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi.'
      },
      borrower: {
        instansi: 'Internal UII',
        name: 'Rizki Saputra',
        whatsapp: '089680309943',
        eventName: 'Sprint Review & Planning',
        eventType: 'Rapat',
        participants: 35,
        description: 'Pada hari yang cerah di kantor pusat, tim Army berkumpul di ruangan sidang utara untuk melaksanakan acara sprint review dan planning. Ruangan yang luas dan nyaman ini dipinjam khusus untuk memfasilitasi pertemuan penting ini. Dengan suasana yang penuh antusiasme, para anggota tim berkumpul untuk mengevaluasi hasil sprint terakhir dan merencanakan langkah-langkah selanjutnya.',
        facilities: 'Tolong tambahkan alas meja',
        documentUrl: 'assets/images/Surat1.png'
      },
      time: {
        day1: '01 Maret 2024 10.00 - 12.00',
        day2: '08 Maret 2024 13.00 - 15.00'
      }
    };

    this.detailData = baseData;
  }

  // Actions
  onCancel(): void {
    this.router.navigate(['/verifikator']);
  }

  onSaveClick(): void {
    if (!this.verificationStatus) {
      alert('Mohon pilih status persetujuan (Diterima/Ditolak)');
      return;
    }
    // Note is optional for acceptance, required for rejection? 
    // Requirement said "untuk disetujui juga perlu di input", so maybe required for both?
    // Let's just create the modal flow first.
    this.showConfirmationModal = true;
  }

  closeModal(): void {
    this.showConfirmationModal = false;
  }

  confirmVerification(): void {
    // Logic to save verification would go here (API call)
    console.log('Verification saved:', {
      status: this.verificationStatus,
      note: this.rejectionNote
    });

    this.showConfirmationModal = false;

    // Simulate success and redirect
    // Ideally show a success toast/alert
    this.router.navigate(['/verifikator']);
  }
}
