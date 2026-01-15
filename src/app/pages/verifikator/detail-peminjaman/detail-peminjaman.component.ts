import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface HistoryItem {
  date: string;
  status: string;
  active: boolean;
  current?: boolean;
}

@Component({
  selector: 'app-detail-peminjaman',
  templateUrl: './detail-peminjaman.component.html',
  styleUrls: ['./detail-peminjaman.component.scss']
})
export class DetailPeminjamanComponent implements OnInit {
  bookingId: number = 0;

  // Accordions OPEN by default for admin verifikator
  isDocExpanded: boolean = true;
  isProofExpanded: boolean = true;

  // Dummy Data
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
        description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.'
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
      },
      history: [
        { date: '05 Februari 2023 13.30 WIB', status: 'Selesai', active: true, current: true },
        { date: '05 Februari 2023 13.30 WIB', status: 'Pembayaran dikonfirmasi', active: true },
        { date: '04 Februari 2023 10.30 WIB', status: 'Pembayaran dilakukan', active: true },
        { date: '04 Februari 2023 10.30 WIB', status: 'Permohonan peminjaman ruang disetujui', active: true },
        { date: '04 Februari 2023 10.30 WIB', status: 'Permohonan peminjaman ruang berhasil diajukan', active: true }
      ] as HistoryItem[],
      payment: {
        isPaid: true,
        bankName: 'Mandiri',
        accountNumber: '6747474637282',
        rate: 'Rp100.000/jam',
        duration: '1 jam',
        total: 'Rp100.000',
        senderName: 'Sulistyo Budi',
        senderBank: 'Mandiri',
        proofUrl: 'assets/images/BuktiPembayaran.jpeg'
      }
    };

    this.detailData = baseData;
  }

  onBack(): void {
    this.router.navigate(['/verifikator']);
  }
}
