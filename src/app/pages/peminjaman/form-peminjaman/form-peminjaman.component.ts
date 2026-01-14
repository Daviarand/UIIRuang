import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Room {
    id: number;
    name: string;
    unit: string;
    gedung: string;
    floor: number;
    location: string;
    mapsUrl: string;
    type: string;
    capacity: number;
    description: string;
    facilities: string[];
    imageUrl: string;
}

interface Booking {
    roomId: number;
    dayOfWeek: number; // 1=Senin, 2=Selasa,..., 7=Ahad
    startHour: number;
    endHour: number;
    eventType: string;
    unit: string;
    status: 'verified' | 'pending';
}

interface FormData {
    // Penanggung Jawab
    instansi: 'internal' | 'eksternal';
    namaPenanggungJawab: string;
    noWhatsapp: string;

    // Detail Acara
    namaAcara: string;
    jenisAcara: string;
    jumlahPeserta: number | null;
    deskripsiAcara: string;
    fasilitasTambahan: string;
    dokumenPendukung: File | null;

    // Waktu Acara
    tanggalAcara: string;
    jamMulai: string;
    jamSelesai: string;

    // Pernyataan
    agreement: boolean;
}

@Component({
    selector: 'app-form-peminjaman',
    templateUrl: './form-peminjaman.component.html',
    styleUrls: ['./form-peminjaman.component.scss']
})
export class FormPeminjamanComponent implements OnInit {
    activeTab: 'form' | 'ketersediaan' | 'aturan' = 'form';

    roomId: number = 0;
    timeSlot: number = 0;

    selectedRoom: Room | null = null;

    // Options
    jenisAcaraList: string[] = [
        'Rapat',
        'Seminar',
        'Workshop',
        'Kuliah',
        'Ujian',
        'Acara Organisasi',
        'Lainnya'
    ];

    // Week days and time slots for ketersediaan tab
    weekDays: string[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Ahad'];
    ketersediaanTimeSlots: { hour: number, label: string }[] = [];

    // Weekly bookings dummy data (for tab ketersediaan) - sesuai dengan Gedung KH. Mas Mansyur
    weeklyBookings: Booking[] = [
        // Ruang Lecture A (roomId: 1)
        { roomId: 1, dayOfWeek: 1, startHour: 8, endHour: 10, eventType: 'Kuliah', unit: 'Teknik Sipil', status: 'verified' },

        // Ruang Lecture B (roomId: 2)
        { roomId: 2, dayOfWeek: 3, startHour: 13, endHour: 15, eventType: 'Kuliah', unit: 'Arsitektur', status: 'verified' },

        // Lab Komputer 1 (roomId: 3)
        { roomId: 3, dayOfWeek: 2, startHour: 8, endHour: 10, eventType: 'Praktikum', unit: 'Teknik Informatika', status: 'verified' },

        // Ruang Seminar (roomId: 5) - utama
        { roomId: 5, dayOfWeek: 4, startHour: 8, endHour: 10, eventType: 'Techtalk BSI UII', unit: 'Badan Sistem Informasi', status: 'verified' },
        { roomId: 5, dayOfWeek: 4, startHour: 13, endHour: 16, eventType: 'Rapat', unit: 'Badan Sistem Informasi', status: 'pending' },
        { roomId: 5, dayOfWeek: 1, startHour: 13, endHour: 15, eventType: 'Review Tim', unit: 'Badan Sistem Informasi', status: 'verified' },

        // Ruang Rapat Dekan (roomId: 6)
        { roomId: 6, dayOfWeek: 5, startHour: 9, endHour: 11, eventType: 'Rapat Pimpinan', unit: 'Dekanat FTSP', status: 'verified' }
    ];



    // Form data
    formData: FormData = {
        instansi: 'internal',
        namaPenanggungJawab: '',
        noWhatsapp: '',
        namaAcara: '',
        jenisAcara: '',
        jumlahPeserta: null,
        deskripsiAcara: '',
        fasilitasTambahan: '',
        dokumenPendukung: null,
        tanggalAcara: '',
        jamMulai: '',
        jamSelesai: '',
        agreement: false
    };

    uploadedFileName: string = '';

    // Dummy rooms data - sesuaikan dengan Gedung KH. Mas Mansyur di scheduler
    allRooms: Room[] = [
        {
            id: 1,
            name: 'Ruang Lecture A',
            unit: 'Fakultas Teknik Sipil dan Perencanaan',
            gedung: 'Gedung KH. Mas Mansyur',
            floor: 1,
            location: 'Kampus Terpadu, Jl. Kaliurang',
            mapsUrl: 'https://maps.google.com',
            type: 'Ruang Kelas',
            capacity: 50,
            description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.',
            facilities: ['AC', 'TV', 'Meja Kursi', 'Whiteboard'],
            imageUrl: 'assets/images/gedung1.jpg'
        },
        {
            id: 2,
            name: 'Ruang Lecture B',
            unit: 'Fakultas Teknik Sipil dan Perencanaan',
            gedung: 'Gedung KH. Mas Mansyur',
            floor: 1,
            location: 'Kampus Terpadu, Jl. Kaliurang',
            mapsUrl: 'https://maps.google.com',
            type: 'Ruang Kelas',
            capacity: 45,
            description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.',
            facilities: ['AC', 'TV', 'Meja Kursi', 'Whiteboard'],
            imageUrl: 'assets/images/gedung2.jpg'
        },
        {
            id: 3,
            name: 'Lab Komputer 1',
            unit: 'Fakultas Teknologi Industri',
            gedung: 'Gedung KH. Mas Mansyur',
            floor: 2,
            location: 'Kampus Terpadu, Jl. Kaliurang',
            mapsUrl: 'https://maps.google.com',
            type: 'Laboratorium',
            capacity: 40,
            description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.',
            facilities: ['AC', 'Komputer', 'Proyektor', 'Whiteboard'],
            imageUrl: 'assets/images/gedung3.jpg'
        },
        {
            id: 5,
            name: 'Ruang Seminar',
            unit: 'Badan Sistem Informasi',
            gedung: 'Gedung KH. Mas Mansyur',
            floor: 3,
            location: 'Kampus Terpadu, Jl. Kaliurang',
            mapsUrl: 'https://maps.google.com',
            type: 'Seminar',
            capacity: 100,
            description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.',
            facilities: ['AC', 'TV', 'Meja Kursi', 'Whiteboard', 'Sound System'],
            imageUrl: 'assets/images/gedung4.jpg'
        },
        {
            id: 6,
            name: 'Ruang Rapat Dekan',
            unit: 'Dekanat FTSP',
            gedung: 'Gedung KH. Mas Mansyur',
            floor: 3,
            location: 'Kampus Terpadu, Jl. Kaliurang',
            mapsUrl: 'https://maps.google.com',
            type: 'Rapat',
            capacity: 30,
            description: 'Ruangan ini dirancang khusus untuk menyediakan lingkungan yang optimal untuk pertemuan dan presentasi. Dengan kombinasi desain yang ergonomis, fasilitas canggih, dan perhatian terhadap kebersihan.',
            facilities: ['AC', 'TV', 'Meja Kursi', 'Whiteboard'],
            imageUrl: 'assets/images/gedung5.jpg'
        }
    ];



    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Get route params
        this.route.params.subscribe(params => {
            this.roomId = +params['roomId'] || 0;
            this.timeSlot = +params['timeSlot'] || 0;

            this.loadRoomDetails();
            this.setDefaultDateTime();
            this.initKetersediaanTimeSlots();
        });
    }

    loadRoomDetails(): void {
        // Load room details based on roomId
        this.selectedRoom = this.allRooms.find(r => r.id === this.roomId) || this.allRooms[0];
    }

    setDefaultDateTime(): void {
        // Set default tanggal (today)
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.formData.tanggalAcara = `${year}-${month}-${day}`;

        // Set jam based on timeSlot
        if (this.timeSlot > 0) {
            this.formData.jamMulai = `${this.timeSlot.toString().padStart(2, '0')}:00`;
            this.formData.jamSelesai = `${(this.timeSlot + 2).toString().padStart(2, '0')}:00`;
        }
    }

    setActiveTab(tab: 'form' | 'ketersediaan' | 'aturan'): void {
        this.activeTab = tab;
    }

    initKetersediaanTimeSlots(): void {
        // Initialize time slots from 07:00 to 22:00  
        for (let hour = 7; hour <= 22; hour++) {
            this.ketersediaanTimeSlots.push({
                hour: hour,
                label: `${hour.toString().padStart(2, '0')}.00 WIB`
            });
        }
    }

    getWeeklyBooking(dayIndex: number, hour: number): Booking | null {
        // dayIndex: 0=Senin, 1=Selasa, ..., 6=Ahad
        const dayOfWeek = dayIndex + 1;
        return this.weeklyBookings.find(b =>
            b.roomId === this.roomId &&
            b.dayOfWeek === dayOfWeek &&
            hour >= b.startHour &&
            hour < b.endHour
        ) || null;
    }

    isFirstSlotOfWeeklyBooking(dayIndex: number, hour: number): boolean {
        const booking = this.getWeeklyBooking(dayIndex, hour);
        return booking ? booking.startHour === hour : false;
    }

    getWeeklyBookingRowSpan(booking: Booking): number {
        return booking.endHour - booking.startHour;
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File terlalu besar! Maksimal 10MB');
                input.value = '';
                return;
            }

            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg', 'image/png', 'image/jpg'];

            if (!allowedTypes.includes(file.type)) {
                alert('Format file tidak diperbolehkan! Gunakan PDF, DOC, atau gambar');
                input.value = '';
                return;
            }

            this.formData.dokumenPendukung = file;
            this.uploadedFileName = file.name;
        }
    }

    removeFile(): void {
        this.formData.dokumenPendukung = null;
        this.uploadedFileName = '';
    }

    validateForm(): boolean {
        const errors: string[] = [];

        // Validate Penanggung Jawab
        if (!this.formData.namaPenanggungJawab.trim()) {
            errors.push('Nama Penanggung Jawab wajib diisi');
        }

        if (!this.formData.noWhatsapp.trim()) {
            errors.push('Nomor WhatsApp wajib diisi');
        }

        // Validate Detail Acara
        if (!this.formData.namaAcara.trim()) {
            errors.push('Nama Acara wajib diisi');
        }

        if (!this.formData.jenisAcara) {
            errors.push('Jenis Acara wajib dipilih');
        }

        if (!this.formData.jumlahPeserta || this.formData.jumlahPeserta <= 0) {
            errors.push('Jumlah Peserta wajib diisi');
        }

        if (this.selectedRoom && this.formData.jumlahPeserta &&
            this.formData.jumlahPeserta > this.selectedRoom.capacity) {
            errors.push(`Jumlah peserta melebihi kapasitas ruangan (${this.selectedRoom.capacity} orang)`);
        }

        // Validate Waktu Acara
        if (!this.formData.tanggalAcara) {
            errors.push('Tanggal Acara wajib diisi');
        }

        if (!this.formData.jamMulai) {
            errors.push('Jam Mulai wajib diisi');
        }

        if (!this.formData.jamSelesai) {
            errors.push('Jam Selesai wajib diisi');
        }

        if (this.formData.jamMulai && this.formData.jamSelesai &&
            this.formData.jamMulai >= this.formData.jamSelesai) {
            errors.push('Jam Selesai harus lebih besar dari Jam Mulai');
        }

        if (errors.length > 0) {
            alert('Terdapat kesalahan:\n\n' + errors.join('\n'));
            return false;
        }

        return true;
    }

    // Modal state
    showConfirmModal: boolean = false;
    tarifPerJam: number = 100000; // Rp 100.000/jam

    get durasiJam(): number {
        if (!this.formData.jamMulai || !this.formData.jamSelesai) return 1;
        const start = parseInt(this.formData.jamMulai.split(':')[0]);
        const end = parseInt(this.formData.jamSelesai.split(':')[0]);
        return Math.max(1, end - start);
    }

    get totalPembayaran(): number {
        return this.tarifPerJam * this.durasiJam;
    }

    formatRupiah(amount: number): string {
        return 'Rp' + amount.toLocaleString('id-ID');
    }

    onSubmit(): void {
        if (!this.validateForm()) {
            return;
        }
        // Show confirmation modal instead of alert
        this.showConfirmModal = true;
    }

    onConfirmSubmit(): void {
        console.log('Form submitted:', this.formData);
        this.showConfirmModal = false;
        alert('Pengajuan peminjaman berhasil dikirim!');

        // Navigate back to scheduler
        this.router.navigate(['/peminjaman']);
    }

    onCancelConfirm(): void {
        this.showConfirmModal = false;
    }

    onBatal(): void {
        if (confirm('Batalkan pengisian form?')) {
            this.router.navigate(['/peminjaman']);
        }
    }
}
