import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private sidebarOpen = false;
  sidebarOpen$ = new BehaviorSubject<boolean>(this.sidebarOpen);

  // Role Management: 'tendik' | 'mahasiswa' | 'admin'
  private currentUserRole = 'mahasiswa';
  currentUserRole$ = new BehaviorSubject<string>(this.currentUserRole);

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpen$.next(this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.sidebarOpen$.next(this.sidebarOpen);
  }

  setRole(role: string): void {
    this.currentUserRole = role;
    this.currentUserRole$.next(this.currentUserRole);
  }

  getRole(): string {
    return this.currentUserRole;
  }
}
