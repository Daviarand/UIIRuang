import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../shared/services/layout.service';

interface TimeSlot {
    time: string;
    hour: number;
}

interface Room {
    id: number;
    name: string;
    floor: number;
    capacity: number;
}

interface Booking {
    roomId: number;
    startHour: number;
    endHour: number;
    eventType: string;
    unit: string;
    status: 'verified' | 'pending';
}

@Component({
    selector: 'app-jadwal-ruang',
    templateUrl: './jadwal-ruang.component.html',
    styleUrls: ['./jadwal-ruang.component.scss']
})
export class JadwalRuangComponent implements OnInit {
    // Filter values
    selectedGedung: string = 'Gedung KH. Mas Mansyur';
    selectedLantai: string = 'Semua lantai';
    selectedRuang: string = 'Semua ruang';
    selectedDate: string = '';
    capacityFilter: number | null = null;

    // Options for dropdowns
    gedungList: string[] = [
        'Gedung KH. Mas Mansyur',
        'Gedung Dr. Sardjito',
        'Gedung Ki Bagoes Hadikoesoemo',
        'Gedung GBPH Prabuningrat',
        'Gedung K.H. Wahid Hasyim'
    ];

    lantaiList: string[] = ['Semua lantai', 'Lantai 1', 'Lantai 2', 'Lantai 3', 'Lantai 4'];
    ruangList: string[] = ['Semua ruang'];

    // Time slots (07:00 - 22:00)
    timeSlots: TimeSlot[] = [];

    // Rooms data per gedung
    gedungRoomMap: { [key: string]: Room[] } = {
        'Gedung KH. Mas Mansyur': [
            { id: 1, name: 'Ruang Lecture A', floor: 1, capacity: 50 },
            { id: 2, name: 'Ruang Lecture B', floor: 1, capacity: 45 },
            { id: 3, name: 'Lab Komputer 1', floor: 2, capacity: 40 },
            { id: 4, name: 'Lab Komputer 2', floor: 2, capacity: 40 },
            { id: 5, name: 'Ruang Seminar', floor: 3, capacity: 100 },
            { id: 6, name: 'Ruang Rapat Dekan', floor: 3, capacity: 30 }
        ],
        'Gedung Dr. Sardjito': [
            { id: 7, name: 'Kelas 101', floor: 1, capacity: 35 },
            { id: 8, name: 'Kelas 102', floor: 1, capacity: 35 },
            { id: 9, name: 'Kelas 201', floor: 2, capacity: 40 },
            { id: 10, name: 'Kelas 202', floor: 2, capacity: 40 },
            { id: 11, name: 'Ruang Multimedia', floor: 3, capacity: 60 }
        ],
        'Gedung GBPH Prabuningrat': [
            { id: 12, name: 'Auditorium Utama', floor: 1, capacity: 200 },
            { id: 13, name: 'Meeting Room A', floor: 2, capacity: 25 },
            { id: 14, name: 'Meeting Room B', floor: 2, capacity: 25 },
            { id: 15, name: 'Executive Lounge', floor: 3, capacity: 50 }
        ],
        // Default rooms untuk gedung lainnya
        'default': [
            { id: 1, name: 'Studio PMB', floor: 1, capacity: 30 },
            { id: 2, name: 'R. Bahagia', floor: 1, capacity: 40 },
            { id: 3, name: 'Erasmus', floor: 2, capacity: 35 },
            { id: 4, name: 'R. Sidang VIP', floor: 3, capacity: 50 },
            { id: 5, name: 'R. Sidang Utara', floor: 3, capacity: 45 }
        ]
    };

    allRooms: Room[] = [];

    // Bookings data (dummy) - untuk Gedung KH. Mas Mansyur
    bookings: Booking[] = [
        // Ruang Lecture A (id: 1)
        { roomId: 1, startHour: 8, endHour: 11, eventType: 'Kuliah', unit: 'Teknik Sipil', status: 'verified' },

        // Ruang Lecture B (id: 2)
        { roomId: 2, startHour: 15, endHour: 18, eventType: 'Kuliah', unit: 'Teknik Sipil', status: 'verified' },

        // Lab Komputer 1 (id: 3)
        { roomId: 3, startHour: 12, endHour: 14, eventType: 'Praktikum', unit: 'Teknik Informatika', status: 'verified' },

        // Ruang Seminar (id: 5) - utama
        { roomId: 5, startHour: 8, endHour: 10, eventType: 'Techtalk BSI UII', unit: 'Badan Sistem Informasi', status: 'verified' },
        { roomId: 5, startHour: 13, endHour: 16, eventType: 'Rapat', unit: 'Badan Sistem Informasi', status: 'pending' },

        // Ruang Rapat Dekan (id: 6)
        { roomId: 6, startHour: 10, endHour: 13, eventType: 'Rapat Pimpinan', unit: 'Dekanat FTSP', status: 'verified' }
    ];




    // Role state
    currentRole: string = 'tendik';

    constructor(
        private router: Router,
        private layoutService: LayoutService // Inject LayoutService
    ) { }

    ngOnInit(): void {
        this.layoutService.currentUserRole$.subscribe(role => {
            this.currentRole = role;
        });

        this.initializeTimeSlots();
        this.setTodayDate();
        this.loadRoomsForGedung();
        this.updateRuangList();
        this.onSearch(); // Initialize displayedRooms
    }

    initializeTimeSlots(): void {
        for (let hour = 7; hour <= 22; hour++) {
            this.timeSlots.push({
                time: `${hour.toString().padStart(2, '0')}.00 WIB`,
                hour: hour
            });
        }
    }

    setTodayDate(): void {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.selectedDate = `${year}-${month}-${day}`;
    }

    onGedungChange(): void {
        // Reset filters and load new rooms when gedung changes
        this.selectedLantai = 'Semua lantai';
        this.selectedRuang = 'Semua ruang';
        this.loadRoomsForGedung();
        this.updateRuangList();
    }

    loadRoomsForGedung(): void {
        // Load rooms based on selected gedung
        if (this.gedungRoomMap[this.selectedGedung]) {
            this.allRooms = this.gedungRoomMap[this.selectedGedung];
        } else {
            this.allRooms = this.gedungRoomMap['default'];
        }
    }

    onLantaiChange(): void {
        // Reset ruang filter when lantai changes
        this.selectedRuang = 'Semua ruang';
        this.updateRuangList();
    }

    updateRuangList(): void {
        // Update ruang dropdown based on selected lantai
        let rooms = this.allRooms;

        if (this.selectedLantai && this.selectedLantai !== 'Semua lantai') {
            // Extract lantai number from "Lantai X"
            const lantaiNum = parseInt(this.selectedLantai.replace('Lantai ', ''));
            rooms = rooms.filter(r => r.floor === lantaiNum);
        }

        this.ruangList = ['Semua ruang', ...rooms.map(r => r.name)];
    }

    // Rooms currently displayed in the table
    displayedRooms: Room[] = [];

    onSearch(): void {
        console.log('Search triggered');

        let filtered = [...this.allRooms];

        // Filter by Lantai
        if (this.selectedLantai && this.selectedLantai !== 'Semua lantai') {
            const lantaiNum = parseInt(this.selectedLantai.replace('Lantai ', ''));
            filtered = filtered.filter(r => r.floor === lantaiNum);
        }

        // Filter by Ruang
        if (this.selectedRuang && this.selectedRuang !== 'Semua ruang') {
            filtered = filtered.filter(r => r.name === this.selectedRuang);
        }

        this.displayedRooms = filtered;
    }

    getBookingForCell(roomId: number, hour: number): Booking | null {
        return this.bookings.find(
            b => b.roomId === roomId && hour >= b.startHour && hour < b.endHour
        ) || null;
    }

    isFirstSlotOfBooking(roomId: number, hour: number): boolean {
        const booking = this.getBookingForCell(roomId, hour);
        return booking ? booking.startHour === hour : false;
    }

    getBookingRowSpan(booking: Booking): number {
        return booking.endHour - booking.startHour;
    }

    onCellClick(room: Room, hour: number): void {
        // If Mahasiswa, prevent click/booking
        if (this.currentRole === 'mahasiswa') {
            return;
        }

        const booking = this.getBookingForCell(room.id, hour);
        if (!booking) {
            // Navigate to form peminjaman
            this.router.navigate(['/peminjaman/form', room.id, hour]);
        } else {
            console.log('View booking details:', booking);
        }
    }
}
