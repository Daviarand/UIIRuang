import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Gedung {
    id: number;
    nama: string;
    gambar: string;
    lokasi: string;
    jumlahLantai: number;
    jumlahRuangan: number;
}

@Component({
    selector: 'app-daftar-gedung',
    templateUrl: './daftar-gedung.component.html',
    styleUrls: ['./daftar-gedung.component.scss']
})
export class DaftarGedungComponent {
    viewMode: 'grid' | 'tabel' = 'grid';
    itemsPerPage: number = 10;
    searchQuery: string = '';

    constructor(private router: Router) { }

    // Dummy data gedung
    gedungList: Gedung[] = [
        {
            id: 1,
            nama: 'Gedung KH. Mas Mansyur',
            gambar: 'assets/images/gedung1.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 17
        },
        {
            id: 2,
            nama: 'Gedung Dr. Sardjito',
            gambar: 'assets/images/gedung2.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 3
        },
        {
            id: 3,
            nama: 'Gedung Ki Bagoes Hadikoesoemo',
            gambar: 'assets/images/gedung3.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 4
        },
        {
            id: 4,
            nama: 'Gedung GBPH Prabuningrat',
            gambar: 'assets/images/gedung4.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 4
        },
        {
            id: 5,
            nama: 'Gedung K.H. Wahid Hasyim',
            gambar: 'assets/images/gedung5.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 6
        },
        {
            id: 6,
            nama: 'Gedung Auditorium Prof. DR. K.H. Abdul Kahar Mudzakkir',
            gambar: 'assets/images/gedung6.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 1
        },
        {
            id: 7,
            nama: 'UII Training Ground',
            gambar: 'assets/images/gedung7.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 1
        },
        {
            id: 8,
            nama: 'Gedung Prof. Dr. Ace Partadiredja',
            gambar: 'assets/images/gedung8.jpg',
            lokasi: 'Kampus Condongcatur',
            jumlahLantai: 4,
            jumlahRuangan: 12
        },
        {
            id: 9,
            nama: 'Gedung Dr. Soekiman Wirjosandjojo',
            gambar: 'assets/images/gedung9.jpg',
            lokasi: 'Kampus Terpadu, Jl. Kaliurang',
            jumlahLantai: 4,
            jumlahRuangan: 12
        }
    ];

    get filteredGedung(): Gedung[] {
        if (!this.searchQuery) {
            return this.gedungList;
        }
        return this.gedungList.filter(g =>
            g.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            g.lokasi.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    get totalData(): number {
        return this.gedungList.length;
    }

    setViewMode(mode: 'grid' | 'tabel'): void {
        this.viewMode = mode;
    }

    onSearch(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchQuery = input.value;
    }

    navigateToRuangan(gedung: Gedung): void {
        // Navigate to jadwal ruangan
        this.router.navigate(['/peminjaman/jadwal', gedung.id]);
    }
}
