import { Component, OnInit } from '@angular/core';

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
    selectedGedung: string = 'Gedung GBPH Prabuningrat';
    selectedLantai: string = '';
    selectedRuang: string = '';
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

    // Rooms data
    rooms: Room[] = [
        { id: 1, name: 'Studio PMB', floor: 1, capacity: 30 },
        { id: 2, name: 'R. Bahagia', floor: 1, capacity: 40 },
        { id: 3, name: 'Erasmus', floor: 2, capacity: 35 },
        { id: 4, name: 'R. Sidang VIP', floor: 3, capacity: 50 },
        { id: 5, name: 'R. Sidang Utara', floor: 3, capacity: 45 }
    ];

    // Bookings data (dummy)
    bookings: Booking[] = [
        {
            roomId: 2,
            startHour: 8,
            endHour: 10,
            eventType: 'Rapat',
            unit: 'Fakultas Teknik',
            status: 'verified'
        },
        {
            roomId: 3,
            startHour: 8,
            endHour: 10,
            eventType: 'Rapat',
            unit: 'Himpunan',
            status: 'pending'
        }
    ];

    ngOnInit(): void {
        this.initializeTimeSlots();
        this.setTodayDate();
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
        // Reset filters when gedung changes
        this.selectedLantai = '';
        this.selectedRuang = '';
    }

    onSearch(): void {
        console.log('Search with filters:', {
            gedung: this.selectedGedung,
            lantai: this.selectedLantai,
            ruang: this.selectedRuang,
            date: this.selectedDate,
            capacity: this.capacityFilter
        });
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
        const booking = this.getBookingForCell(room.id, hour);
        if (!booking) {
            console.log('Book room:', room.name, 'at', hour + ':00');
            // Navigate to booking form
        } else {
            console.log('View booking details:', booking);
        }
    }
}
