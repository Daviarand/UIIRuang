import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { BreadcrumbService, Breadcrumb } from '../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  isDropdownOpen: boolean = false;
  currentRole: string = 'tendik';

  constructor(
    privatelayoutService: LayoutService, // Typo fixed below
    private layoutService: LayoutService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    // Subscribe to role changes
    this.layoutService.currentUserRole$.subscribe(role => {
      this.currentRole = role;
    });
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectRole(role: string): void {
    this.layoutService.setRole(role);
    this.isDropdownOpen = false;

    // Navigate based on role
    if (role === 'admin') {
      this.router.navigate(['/verifikator']);
    } else {
      // Create logic to navigate to relevant pages
      // For now, go home/daftar-gedung
      this.router.navigate(['/peminjaman/daftar-gedung']);
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
