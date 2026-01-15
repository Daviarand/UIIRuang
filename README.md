# UII Ruang - Frontend

Project frontend untuk sistem peminjaman ruang menggunakan Angular 17.

## Prasyarat
- Node.js (v18 atau lebih baru)
- Angular CLI v17 (`npm install -g @angular/cli`)

## Cara Menjalankan

1.  **Install Dependencies**
    Masuk ke folder project dan jalankan perintah:
    ```bash
    npm install
    ```

2.  **Jalankan Server Development**
    ```bash
    npm start
    ```
    atau
    ```bash
    ng serve
    ```

3.  **Buka Aplikasi**
    Buka browser dan akses: [http://localhost:4200](http://localhost:4200)

## Fitur Role Switching (Simulasi)

Project ini memiliki fitur simulasi ganti multi-role tanpa login ulang.
Klik **Icon Profil** di pojok kanan atas header untuk mengganti role:

*   **Mahasiswa** (Default)
    *   Hanya bisa melihat Daftar Gedung & Ketersediaan Ruang.
    *   Tidak bisa melakukan booking (klik slot jadwal dinonaktifkan).
    *   Menu Sidebar terbatas.

*   **Tendik/Dosen**
    *   Akses penuh ke Form Peminjaman.
    *   Bisa klik slot kosong di jadwal untuk booking.
    *   Menu "Kelola Peminjaman" aktif.

*   **Admin Verifikator**
    *   Akses ke modul khusus Verifikator.
    *   Bisa memverifikasi (Terima/Tolak) pengajuan peminjaman.

## Struktur Project
*   `src/app/pages/peminjaman`: Modul utama (Daftar Gedung, Jadwal, Form).
*   `src/app/pages/kelola-peminjaman`: Modul pengelola (List Peminjaman, Detail, Pembayaran).
*   `src/app/pages/verifikator`: Modul admin verifikasi.
*   `src/assets/styles`: Global styles & SCSS styling.
