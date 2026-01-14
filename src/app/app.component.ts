import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'uii-ruang';
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateBreadcrumbs(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateBreadcrumbs(event.urlAfterRedirects);
    });
  }

  updateBreadcrumbs(url: string): void {
    // Base breadcrumb
    this.breadcrumbs = [
      { label: 'UIIRuang', url: '/peminjaman', isActive: false }
    ];

    if (url.includes('/peminjaman/jadwal')) {
      // Halaman scheduler/ketersediaan ruang
      this.breadcrumbs.push(
        { label: 'Peminjaman', url: '/peminjaman', isActive: false },
        { label: 'Ketersediaan ruang', url: '', isActive: true }
      );
    } else if (url.includes('/peminjaman/form')) {
      // Halaman form peminjaman
      this.breadcrumbs.push(
        { label: 'Peminjaman', url: '/peminjaman', isActive: false },
        { label: 'Ketersediaan ruang', url: '/peminjaman/jadwal/1', isActive: false },
        { label: 'Pinjam ruang', url: '', isActive: true }
      );
    } else if (url.includes('/peminjaman')) {
      // Halaman daftar gedung
      this.breadcrumbs.push(
        { label: 'Peminjaman', url: '', isActive: true }
      );
    }
  }
}
