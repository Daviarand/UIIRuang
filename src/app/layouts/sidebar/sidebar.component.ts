import { Component } from '@angular/core';

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
export class SidebarComponent {
    menuItems: MenuItem[] = [
        { label: 'Peminjaman', icon: 'calendar', route: '/peminjaman', active: true },
        { label: 'Kelola peminjaman', icon: 'users', route: '/kelola-peminjaman' }
    ];
}
