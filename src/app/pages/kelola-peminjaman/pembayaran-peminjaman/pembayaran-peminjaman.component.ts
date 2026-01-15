import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pembayaran-peminjaman',
  templateUrl: './pembayaran-peminjaman.component.html',
  styleUrls: ['./pembayaran-peminjaman.component.scss']
})
export class PembayaranPeminjamanComponent implements OnInit {
  bookingId: number = 0;

  // Accordion states
  isDocExpanded: boolean = false;
  isProofExpanded: boolean = true; // Default open for payment upload

  // Form Data
  formData = {
    namaPengirim: '',
    namaBank: ''
  };

  // Uploaded file
  uploadedFileName: string = '';
  uploadedFileUrl: string = '';

  // Bank list
  bankList: string[] = ['Mandiri', 'BCA', 'BNI', 'BRI', 'CIMB Niaga', 'Bank Lainnya'];

  // Booking Detail Data
  detailData: any = null;

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
    // Simulate data loading - similar to detail-peminjaman
    this.detailData = {
      id: id,
      room: {
        name: 'R. Sidang Utara',
        unit: 'Badan Sistem Informasi',
        building: 'Gedung GBPH Prabuningrat',
        floor: 'Lantai 4',
        location: 'Kampus Terpadu, Jl. Kaliurang',
        type: 'Rapat',
        capacity: 20
      },
      borrower: {
        instansi: 'Rizki Saputra',
        name: 'Rizki Saputra',
        whatsapp: '085267899219',
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
      },
      payment: {
        bankName: 'Mandiri',
        accountNumber: '6747474637282',
        rate: 'Rp100.000/jam',
        duration: '1 jam',
        total: 'Rp100.000'
      }
    };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;

      // Check if image for preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedFileUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.uploadedFileUrl = '';
      }
    }
  }

  removeFile(): void {
    this.uploadedFileName = '';
    this.uploadedFileUrl = '';
  }

  onBatal(): void {
    this.router.navigate(['/kelola-peminjaman']);
  }

  // Confirmation Modal State
  showConfirmModal: boolean = false;

  openConfirmModal(): void {
    // Validate form first
    if (!this.formData.namaPengirim || !this.formData.namaBank || !this.uploadedFileName) {
      alert('Mohon lengkapi semua data pembayaran');
      return;
    }
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmSubmit(): void {
    // Simulate submission
    console.log('Payment submitted:', {
      bookingId: this.bookingId,
      ...this.formData,
      proofFile: this.uploadedFileName
    });

    this.closeConfirmModal();
    // Navigate back with success message
    alert('Pembayaran berhasil disubmit!');
    this.router.navigate(['/kelola-peminjaman']);
  }
}
