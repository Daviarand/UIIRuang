import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../../shared/services/layout.service';

interface MenuItem {
    label: string;
    icon: string;
    route: string;
    active?: boolean;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isOpen = false;
    isAdminMode = false;

    // Default menu (User mode)
    userMenuItems: MenuItem[] = [
        { label: 'Peminjaman', icon: 'calendar', route: '/peminjaman', active: false },
        { label: 'Kelola peminjaman', icon: 'users', route: '/kelola-peminjaman', active: false }
    ];

    // Admin menu (Verifikator mode)
    adminMenuItems: MenuItem[] = [
        { label: 'Daftar peminjaman', icon: 'calendar', route: '/verifikator', active: false }
    ];

    currentRole: string = 'tendik';

    get menuItems(): MenuItem[] {
        if (this.currentRole === 'admin') {
            return this.adminMenuItems;
        } else if (this.currentRole === 'mahasiswa') {
            // Mahasiswa only sees Peminjaman (Daftar Gedung & Jadwal)
            return this.userMenuItems.filter(item => item.route === '/peminjaman');
        } else {
            // Tendik/Dosen sees all user menu items
            return this.userMenuItems;
        }
    }

    constructor(
        private layoutService: LayoutService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.layoutService.sidebarOpen$.subscribe(open => {
            this.isOpen = open;
        });

        this.layoutService.currentUserRole$.subscribe(role => {
            this.currentRole = role;
            // Force change detection or just let the getter handle it
        });

        // Check initial route
        this.checkRoute(this.router.url);

        // Listen for route changes
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.checkRoute(event.urlAfterRedirects);
        });
    }

    checkRoute(url: string): void {
        // Mode is largely determined by the LayoutService role now,
        // but we can keep this for URL-based sync if needed
        // this.isAdminMode = url.startsWith('/verifikator');
    }

    closeSidebar(): void {
        this.layoutService.closeSidebar();
    }
}
