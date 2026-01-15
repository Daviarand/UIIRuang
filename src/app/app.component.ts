import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbService, Breadcrumb } from './shared/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'uii-ruang';

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    // Force redirect from root to peminjaman
    if (this.router.url === '/') {
      this.router.navigate(['/peminjaman']);
    }
    this.updateBreadcrumbs(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateBreadcrumbs(event.urlAfterRedirects);
    });
  }

  updateBreadcrumbs(url: string): void {
    // Base breadcrumb
    let breadcrumbs: Breadcrumb[] = [
      { label: 'UIIRuang', url: '/peminjaman', isActive: false }
    ];

    // Kelola Peminjaman Routes
    if (url.includes('/kelola-peminjaman/pembayaran')) {
      breadcrumbs.push(
        { label: 'Kelola peminjaman', url: '/kelola-peminjaman', isActive: false },
        { label: 'Konfirmasi pembayaran', url: '', isActive: true }
      );
    } else if (url.includes('/kelola-peminjaman/detail')) {
      breadcrumbs.push(
        { label: 'Kelola peminjaman', url: '/kelola-peminjaman', isActive: false },
        { label: 'Detail peminjaman', url: '', isActive: true }
      );
    } else if (url.includes('/kelola-peminjaman/edit')) {
      breadcrumbs.push(
        { label: 'Kelola peminjaman', url: '/kelola-peminjaman', isActive: false },
        { label: 'Ubah peminjaman', url: '', isActive: true }
      );
    } else if (url.includes('/kelola-peminjaman')) {
      breadcrumbs.push(
        { label: 'Kelola peminjaman', url: '', isActive: true }
      );
    }
    // Verifikator Routes (Admin)
    else if (url.includes('/verifikator/detail')) {
      breadcrumbs.push(
        { label: 'Daftar peminjaman', url: '/verifikator', isActive: false },
        { label: 'Detail peminjaman', url: '', isActive: true }
      );
    }
    else if (url.includes('/verifikator/verifikasi')) {
      breadcrumbs.push(
        { label: 'Daftar peminjaman', url: '/verifikator', isActive: false },
        { label: 'Verifikasi peminjaman', url: '', isActive: true }
      );
    }
    else if (url.includes('/verifikator')) {
      breadcrumbs.push(
        { label: 'Daftar peminjaman', url: '', isActive: true }
      );
    }
    // Peminjaman Routes
    else if (url.includes('/peminjaman/jadwal')) {
      breadcrumbs.push(
        { label: 'Peminjaman', url: '/peminjaman', isActive: false },
        { label: 'Ketersediaan ruang', url: '', isActive: true }
      );
    } else if (url.includes('/peminjaman/form')) {
      breadcrumbs.push(
        { label: 'Peminjaman', url: '/peminjaman', isActive: false },
        { label: 'Ketersediaan ruang', url: '/peminjaman/jadwal/1', isActive: false },
        { label: 'Pinjam ruang', url: '', isActive: true }
      );
    } else if (url.includes('/peminjaman')) {
      breadcrumbs.push(
        { label: 'Peminjaman', url: '', isActive: true }
      );
    }

    this.breadcrumbService.setBreadcrumbs(breadcrumbs);
  }
}
